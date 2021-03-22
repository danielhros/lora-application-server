import axios from "axios";
import { BASE_URL, TOKEN } from "../services/URLs";
import { LOGOUT } from "../actions/auth";
import devConsole from "../devConsole";

/**
 * @type {?object} store of redux-store instance
 */
let store = null;

/**
 * Create a new instance of axios with a custom config.
 *
 * @constant {object}
 */
export const appApi = axios.create({
  baseURL: BASE_URL,
});

/**
 * Set default timeout for axios.
 */
appApi.defaults.timeout = parseInt(process.env.REACT_APP_TIMEOUT);

/**
 * Get defaults headers used for every request.
 *
 * @function getDefaultHeaders
 * @returns {object} default headers
 */
export const getDefaultHeaders = () => {
  return {
    Accept: "application/json",
    "Content-Type": "application/json",
  };
};

/**
 * Prepare headers for request.
 *
 * Add default headers.
 *
 * If `accessToken` is stored in localStorage, add Bearer header to axios headers.
 *
 * Other headers are then added via parameter `headers`.
 *
 * @function getHeadersFormat
 * @param {object} [headers={}] specific headers for request
 * @returns {object} headers for request
 */
export const getHeadersFormat = (headers = {}) => {
  let _headers = {
    ...getDefaultHeaders(),
    ...headers,
  };

  const accessToken = localStorage.getItem("accessToken");
  if (accessToken) {
    _headers = {
      Authorization: `Bearer ${accessToken}`,
      ..._headers,
    };
  }
  return _headers;
};

/**
 * If previous request caught error, this function is called afterward.
 *
 * Function check if error status is 401 (UNAUTHORIZED request)
 * This respond is send by server when `accessToken` is expired.
 *
 * If error status is 401, try to get new token from server using `refreshToken`.
 *
 *  - refreshToken is valid: new tokens are received and callback is called.
 *  - refreshToken is not valid: Error 401 is received again. Immediately, logout user
 *    from app.
 *
 * If error status isn't equal to 401, throw an exception.
 *
 * @async
 * @function handleError
 * @param {object} err error from server
 * @param {requestCallback} callback request
 * @throws {object} err from param
 * @returns {object} response from server
 */
export const handleError = async (err, callback) => {
  if (err.response && err.response.status === 401) {
    try {
      devConsole.log(
        "User is UNAUTHORIZED! Refreshing access token with refreshToken"
      );

      const refreshToken = localStorage.getItem("refreshToken");

      const _payload = {
        refreshToken,
        headers: {
          ...getDefaultHeaders(),
        },
      };

      devConsole.log("Getting new accessToken from server");

      const res = await appApi.post(TOKEN, _payload);
      localStorage.setItem("accessToken", res.data.accessToken);
      return await callback();
    } catch (e) {
      // Check if refresh_token is expired as well
      if (e.response && e.response.status === 401) {
        devConsole.log(
          "Both tokens (accessToken, refreshToken) expired. Automatic logout."
        );
        store.dispatch({
          type: LOGOUT,
        });
      } else {
        devConsole.log("Something went wrong with refreshing token");
      }
      throw e;
    }
  }
  throw err;
};

/**
 * Callback for sending request to the server.
 *
 * @callback requestCallback
 */

/**
 * Call callback given as argument.
 *
 * If error is caught, call then handleError function.
 *
 * @param {requestCallback} _request request
 * @returns {object} response from server
 */
export const request = async (_request) => {
  try {
    return await _request();
  } catch (err) {
    return handleError(err, _request);
  }
};

/**
 * Module for handling requests to the server.
 *
 * @module onboardApi
 */
export default {
  /**
   * Post requests with handling error response.
   *
   * @function post
   * @param {string} url url where request will be send
   * @param {object} [payload={}] data to send
   * @param {object} [headers={}] headers of header
   * @returns {object} response from server
   */
  post(url, payload = {}, headers = {}) {
    const _post = () =>
      appApi({
        method: "post",
        url,
        data: payload,
        headers: { ...getHeadersFormat(headers) },
      });
    return request(_post);
  },

  /**
   * Get requests with handling error response.
   *
   * @function get
   * @param {string} url url where request will be send
   * @param {object} [headers={}] headers of header
   * @returns {object} response from server
   */
  get(url, headers = {}) {
    const _get = () =>
      appApi({
        method: "get",
        url,
        headers: { ...getHeadersFormat(headers) },
      });
    return request(_get);
  },

  /**
   * Get requests without handling error response.
   *
   * @function _post
   * @param {string} url url where request will be send
   * @param {object} [payload={}] data to be send
   * @param {object} [headers={}] headers of header
   * @returns {object} response from server
   */
  _post(url, payload = {}, headers = {}) {
    return appApi.post(url, {
      ...payload,
      headers: { ...getHeadersFormat(headers) },
    });
  },

  /**
   * Get requests without handling error response.
   *
   * @function _get
   * @param {string} url url where request will be send
   * @param {object} [headers={}] headers of header
   * @returns {object} response from server
   */
  _get(url, headers = {}) {
    return appApi.get(url, {
      headers: { ...getHeadersFormat(headers) },
    });
  },

  /**
   * Setup store to access dispatch functions.
   *
   * @param {object} _store store of redux-store instance
   * @returns {undefined}
   */
  setupStore(_store) {
    store = _store;
  },
};
