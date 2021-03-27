import appApi from "./index";
import devConsole from "../devConsole";

import { GATEWAY } from "../services/URLs";

export default {
  getGateways(payload) {
    devConsole.log("Sending request to get gateways from server..");
    return appApi.get(GATEWAY, payload);
  },
};
