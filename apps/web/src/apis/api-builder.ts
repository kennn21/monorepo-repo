import axios, { AxiosRequestConfig } from 'axios';
import { omit } from 'lodash';

const isEmulator = process.env.NEXT_PUBLIC_USE_FIREBASE_EMULATOR === 'true';
const apiBaseURL = isEmulator
  ? `http://127.0.0.1:5001/${process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID}/us-central1/` // Local Firebase Emulator URL
  : process.env.NEXT_PUBLIC_BASE_API_URL; // Production Firebase

// Create an Axios instance
export const axiosInstance = axios.create({
  baseURL: apiBaseURL || 'http://localhost:8080',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const attachIdToken = (idToken: string) => {
  // Add a request interceptor (optional, e.g., for authentication)
  const interceptor = axiosInstance.interceptors.request.use(
    async (config) => {
      const token = idToken;

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error),
  );

  return interceptor;
};

export const detachIdToken = (interceptor: number) => {
  axiosInstance.interceptors.request.eject(interceptor);
};

// Add a response interceptor (optional, for global error handling)
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  },
);

type ApiMethods = 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE';

type IsApiParam<Part> = Part extends `:${infer ParamName}` ? ParamName : never;

type FilteredParts<Path> = Path extends `${infer Part}/${infer Rest}`
  ? IsApiParam<Part> | FilteredParts<Rest>
  : IsApiParam<Path>;

type ApiParams<Path> =
  | Record<FilteredParts<Path>, string | number | boolean>
  | Record<string, string | number | boolean>;

type ApiCallerPayload<ApiUrlTemplate, ReqData = unknown> = {
  params?: ApiParams<ApiUrlTemplate>;
  data?: ReqData;
};

export default class ApiBuilder<ApiUrlTemplate extends string> {
  private urlParamKeys: FilteredParts<ApiUrlTemplate>[];

  constructor(
    private readonly method: ApiMethods,
    private readonly urlTemplate: ApiUrlTemplate,
  ) {
    this.urlParamKeys = urlTemplate
      .split('/')
      .reduce(
        (keys, part) =>
          part.startsWith(':')
            ? keys.concat(part.slice(1) as FilteredParts<ApiUrlTemplate>)
            : keys,
        [] as FilteredParts<ApiUrlTemplate>[],
      );
  }

  buildURL(
    params: ApiParams<ApiUrlTemplate> = {},
    options = { basePath: false },
  ) {
    const path = this.urlParamKeys.reduce(
      (acc, paramKey) =>
        acc.replace(`:${paramKey}`, params[paramKey].toString()),
      this.urlTemplate as string,
    );

    return options.basePath ? `${axiosInstance.getUri()}${path}` : path;
  }

  async call<ResData = unknown, ReqData = unknown>(
    payload: ApiCallerPayload<ApiUrlTemplate, ReqData> = {},
    options: AxiosRequestConfig = {},
  ) {
    const { data } = await axiosInstance<ResData>({
      ...options,
      params: omit(payload.params, this.urlParamKeys),
      url: this.buildURL(payload.params),
      method: this.method,
      data: payload.data,
    });

    return data;
  }

  async callSSR<ResData = unknown, ReqData = unknown>(
    { tenantId, token }: { tenantId: string; token: string },
    payload: ApiCallerPayload<ApiUrlTemplate, ReqData> = {},
  ) {
    const options: AxiosRequestConfig = {
      headers: {
        'Accept-Encoding': 'gzip,deflate,compress',
        'x-tenant-id': tenantId,
        Authorization: `Bearer ${token}`,
      },
    };

    return this.call<ResData, ReqData>(payload, options);
  }
}
