import { AuthActions, AuthActionTypes, User } from 'types';

export const login = (user: User): AuthActions => ({
  type: AuthActionTypes.LOGIN,
  payload: user,
});

export const logout = (): AuthActions => ({
  type: AuthActionTypes.LOGOUT,
});
