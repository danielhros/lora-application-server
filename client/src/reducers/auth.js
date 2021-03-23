import {
  AUTH_ERROR,
  USER_LOADED,
  UPDATE_CREDENTIALS_LOADING,
  UPDATE_CREDENTIALS_SUCCESS,
  UPDATE_CREDENTIALS_FAIL,
  UPDATE_CREDENTIALS_ERRORS,
  RESET_UPDATE_CREDENTIALS,
} from "../actions/auth";

export const initialState = {
  isAuthenticated: false,
  loading: true,
  user: null,
  updateCredentialsLoading: false,
  updateCredentialsErrors: [],
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
        user: { ...state.user, user_name: payload },
      };
    case UPDATE_CREDENTIALS_FAIL:
      return {
        ...state,
        updateCredentialsLoading: false,
      };
    case UPDATE_CREDENTIALS_ERRORS:
      return {
        ...state,
        updateCredentialsLoading: false,
        updateCredentialsErrors: payload,
      };
    case RESET_UPDATE_CREDENTIALS:
      return {
        ...state,
        updateCredentialsLoading: false,
        updateCredentialsErrors: [],
      };
    default:
      return state;
  }
};
