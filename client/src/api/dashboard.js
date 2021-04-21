import appApi from "./index";
import devConsole from "../devConsole";

import { DASHBOARD } from "../services/URLs";

export default {
  getTop() {
    devConsole.log(
      "Sending request to get top & most used values of all messages from server.."
    );
    return appApi.get(`${DASHBOARD}/top`);
  },
  getMarkers() {
    devConsole.log(
      "Sending request to get geo of first gateways from server.."
    );
    return appApi.get(`${DASHBOARD}/map`);
  },
};
