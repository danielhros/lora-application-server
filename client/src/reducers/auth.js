import {
  AUTH_ERROR,
  USER_LOADED,
  UPDATE_CREDENTIALS_LOADING,
  UPDATE_CREDENTIALS_SUCCESS,
  UPDATE_CREDENTIALS_FAIL,
} from "../actions/auth";

export const initialState = {
  isAuthenticated: false,
  loading: true,
  user: null,
  updateCredentialsLoading: false,
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
    case UPDATE_CREDENTIALS_LOADING:
      return {
        ...state,
        updateCredentialsLoading: true,
      };
    case UPDATE_CREDENTIALS_SUCCESS:
      return {
        ...state,
        updateCredentialsLoading: false,
      };
    // TODO: show some errors
    case UPDATE_CREDENTIALS_FAIL:
      return {
        ...state,
        updateCredentialsLoading: false,
      };
    default:
      return state;
  }
};
