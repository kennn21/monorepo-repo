import { AnyAction } from 'redux';

export interface User {
  uid: string;
  email: string;
  name?: string;
  age?: number;
  idToken?: string;
}

export interface AuthState {
  user: User | null;
  lastUpdated: number;
}

export enum AuthActionTypes {
  LOGIN = 'LOGIN',
  LOGOUT = 'LOGOUT',
}

interface LoginAction extends AnyAction {
  type: AuthActionTypes.LOGIN;
  payload: User;
}

interface LogoutAction extends AnyAction {
  type: AuthActionTypes.LOGOUT;
}

export type AuthActions = LoginAction | LogoutAction;
