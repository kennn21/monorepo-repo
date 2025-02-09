import { AuthState, AuthActions, AuthActionTypes } from 'types';

const initialState: AuthState = {
  user: null,
  lastUpdated: Date.now(), // Add a timestamp field
};

export const authReducer = (
  state = initialState,
  action: AuthActions,
): AuthState => {
  switch (action.type) {
    case AuthActionTypes.LOGIN:
      return { ...state, user: action.payload, lastUpdated: Date.now() }; // Ensure new reference
    case AuthActionTypes.LOGOUT:
      return { ...state, user: null, lastUpdated: Date.now() };
    default:
      return state;
  }
};
