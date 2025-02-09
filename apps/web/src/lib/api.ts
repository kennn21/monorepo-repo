import axios from 'axios';

// Create an Axios instance
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const attachIdToken = (idToken: string) => {
  // Add a request interceptor (optional, e.g., for authentication)
  const interceptor = api.interceptors.request.use(
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
  api.interceptors.request.eject(interceptor);
};

// Add a response interceptor (optional, for global error handling)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  },
);

export default api;
