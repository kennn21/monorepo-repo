export interface AuthState {
  user: string | null;
}

export enum AuthActionTypes {
  LOGIN = 'LOGIN',
  LOGOUT = 'LOGOUT',
}

interface LoginAction {
  type: AuthActionTypes.LOGIN;
  payload: string;
}

interface LogoutAction {
  type: AuthActionTypes.LOGOUT;
}

export type AuthActions = LoginAction | LogoutAction;
