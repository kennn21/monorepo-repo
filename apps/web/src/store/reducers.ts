import { AuthState, AuthActions, AuthActionTypes } from 'types';

const initialState: AuthState = {
  user: null,
};

export const authReducer = (
  state = initialState,
  action: AuthActions,
): AuthState => {
  switch (action.type) {
    case AuthActionTypes.LOGIN:
      return { ...state, user: action.payload };
    case AuthActionTypes.LOGOUT:
      return { ...state, user: null };
    default:
      return state;
  }
};
