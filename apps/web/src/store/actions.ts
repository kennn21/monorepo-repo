import { AuthActions, AuthActionTypes } from 'types';

export const login = (user: string): AuthActions => ({
  type: AuthActionTypes.LOGIN,
  payload: user,
});

export const logout = (): AuthActions => ({
  type: AuthActionTypes.LOGOUT,
});
