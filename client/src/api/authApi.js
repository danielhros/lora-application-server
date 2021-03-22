import appApi from "./index";
import devConsole from "../devConsole";
import { LOGIN, LOGOUT } from "../services/URLs";

export default {
  /**
   * Get JWT tokens from server.
   * Request payload is adjusted by `grant_type` and `lang` property.
   *
   * @function getAuthTokens
   * @param {object} payload data to send
   */
  getAuthTokens(payload) {
    devConsole.log("Sending request to get tokens from server..");
    return appApi._post(LOGIN, payload);
  },

  /**
   * Get user object from server.
   *
   * @function getUser
   */
  getUser() {
    devConsole.log("Sending request to get user object from server..");
    return appApi.get(LOGIN);
  },

  /**
   * Remove `refreshToken` from server database.
   *
   * @function removeRefreshToken
   * @param {object} payload refreshToken to send
   */
  removeRefreshToken(payload) {
    devConsole.log("Sending request to remove refreshToken from database..");
    return appApi.post(LOGOUT, payload);
  },
};
