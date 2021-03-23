import authApi from "../api/authApi";
import devConsole from "../devConsole";

import history from "../history";

export const USER_LOADED = "USER_LOADED";
export const AUTH_ERROR = "AUTH_ERROR";
export const LOGOUT = "LOGOUT";
export const UPDATE_CREDENTIALS_LOADING = "UPDATE_CREDENTIALS_LOADING";
export const UPDATE_CREDENTIALS_SUCCESS = "UPDATE_CREDENTIALS_SUCCESS";
export const UPDATE_CREDENTIALS_FAIL = "UPDATE_CREDENTIALS_FAIL";
export const UPDATE_CREDENTIALS_ERRORS = "UPDATE_CREDENTIALS_ERRORS";
export const RESET_UPDATE_CREDENTIALS = "RESET_UPDATE_CREDENTIALS";

export const SIGN_IN_LOADING = "SIGN_IN_LOADING";
export const SIGN_IN_SUCCESS = "SIGN_IN_SUCCESS";
export const SIGN_IN_FAIL = "SIGN_IN_FAIL";
export const SIGN_IN_ERRORS = "SIGN_IN_ERRORS";
export const RESET_SIGN_IN = "RESET_SIGN_IN";

// Load User
export const loadUser = () => async (dispatch) => {
  if (localStorage.accessToken) {
    try {
      const res = await authApi.getUser();

      dispatch({
        type: USER_LOADED,
        payload: res.data,
      });
    } catch (err) {
      // TODO: call notification
      dispatch({
        type: SIGN_IN_FAIL,
      });
    }
  } else {
    // TODO: call notification
    dispatch({
      type: SIGN_IN_FAIL,
    });
  }
};

export const login = ({ userName, password }) => async (dispatch) => {
  dispatch({
    type: SIGN_IN_LOADING,
  });

  try {
    const res = await authApi.getAuthTokens({ username: userName, password });
    localStorage.setItem("accessToken", res.data.accessToken);
    localStorage.setItem("refreshToken", res.data.refreshToken);
    dispatch(loadUser());
  } catch (err) {
    if (
      err.response.data.errors != null &&
      err.response.data.errors.length >= 0
    ) {
      dispatch({
        type: SIGN_IN_ERRORS,
        payload: err.response.data.errors,
      });
    } else {
      // TODO: call notification
      dispatch({
        type: SIGN_IN_FAIL,
      });
    }
  }
};

export const logout = () => async (dispatch) => {
  const refreshToken = localStorage.refreshToken;

  if (!refreshToken) {
    return dispatch({
      type: LOGOUT,
    });
  }

  try {
    await authApi.removeRefreshToken({ refreshToken });

    dispatch({
      type: LOGOUT,
    });
  } catch (error) {
    devConsole.log(error);
  }
};

export const changeCredentials = (formData) => async (dispatch) => {
  const {
    userName: newUsername,
    currentPassword: oldPassword,
    newPassword,
  } = formData;

  dispatch({
    type: UPDATE_CREDENTIALS_LOADING,
  });

  try {
    await authApi.changeCredentials({ newUsername, oldPassword, newPassword });
    dispatch({
      type: UPDATE_CREDENTIALS_SUCCESS,
      payload: newUsername,
    });
    history.push("/");
  } catch (err) {
    if (
      err.response.data.errors != null &&
      err.response.data.errors.length >= 0
    ) {
      dispatch({
        type: UPDATE_CREDENTIALS_ERRORS,
        payload: err.response.data.errors,
      });
    } else {
      // TODO: call notification
      dispatch({
        type: UPDATE_CREDENTIALS_FAIL,
      });
    }
  }
};

export const resetUpdateCredentials = () => (dispatch) => {
  dispatch({
    type: RESET_UPDATE_CREDENTIALS,
  });
};

export const resetSignIn = () => (dispatch) => {
  dispatch({
    type: RESET_SIGN_IN,
  });
};
