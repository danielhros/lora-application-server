import {
  USER_LOADED,
  UPDATE_CREDENTIALS_SUCCESS,
  UPDATE_CREDENTIALS_FAIL,
  UPDATE_CREDENTIALS_ERRORS,
  UPDATE_CREDENTIALS_LOADING,
  RESET_UPDATE_CREDENTIALS,
  SIGN_IN_FAIL,
  SIGN_IN_ERRORS,
  SIGN_IN_LOADING,
  RESET_SIGN_IN,
} from "../actions/auth";

export const initialState = {
  isAuthenticated: false,
  loading: true,
  user: null,
  updateCredentialsLoading: false,
  updateCredentialsErrors: [],
  signInLoading: false,
  signInErrors: [],
};

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
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
        updateCredentialsErrors: [],
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
    case SIGN_IN_LOADING:
      return {
        ...state,
        signInLoading: true,
      };
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: payload,
        signInLoading: false,
        signInErrors: [],
      };
    case SIGN_IN_FAIL:
      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");
      return {
        ...initialState,
        isAuthenticated: false,
        loading: false,
      };
    case SIGN_IN_ERRORS:
      return {
        ...state,
        signInLoading: false,
        signInErrors: payload,
      };
    case RESET_SIGN_IN:
      return {
        ...state,
        signInLoading: false,
        signInErrors: [],
      };
    default:
      return state;
  }
};
