import authApi from "../api/authApi";
import devConsole from "../devConsole";

export const USER_LOADED = "USER_LOADED";
export const AUTH_ERROR = "AUTH_ERROR";
export const LOGOUT = "LOGOUT";
export const UPDATE_CREDENTIALS_LOADING = "UPDATE_CREDENTIALS_LOADING";
export const UPDATE_CREDENTIALS_SUCCESS = "UPDATE_CREDENTIALS_SUCCESS";
export const UPDATE_CREDENTIALS_FAIL = "UPDATE_CREDENTIALS_FAIL";

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
      dispatch({
        type: AUTH_ERROR,
      });
    }
  } else {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

export const login = ({ userName, password }) => async (dispatch) => {
  try {
    const res = await authApi.getAuthTokens({ username: userName, password });
    localStorage.setItem("accessToken", res.data.accessToken);
    localStorage.setItem("refreshToken", res.data.refreshToken);
    dispatch(loadUser());
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
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
    });
  } catch (error) {
    devConsole.log(error);
    dispatch({
      type: UPDATE_CREDENTIALS_FAIL,
    });
  }
};
