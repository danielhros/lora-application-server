import { AUTH_ERROR, USER_LOADED } from "../actions/auth";

export const initialState = {
  isAuthenticated: false,
  loading: true,
  user: null,
};

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: payload,
      };
    case AUTH_ERROR:
      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");
      return {
        ...initialState,
        isAuthenticated: false,
        loading: false,
        user: null,
      };
    default:
      return state;
  }
};
