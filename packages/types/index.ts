export interface User {
  id: string;
  name: string;
  email: string;
}

export interface AuthState {
  user: User | null;
}

export enum AuthActionTypes {
  LOGIN = 'LOGIN',
  LOGOUT = 'LOGOUT',
}

interface LoginAction {
  type: AuthActionTypes.LOGIN;
  payload: User;
}

interface LogoutAction {
  type: AuthActionTypes.LOGOUT;
}

export type AuthActions = LoginAction | LogoutAction;
