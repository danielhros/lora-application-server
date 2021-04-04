import appApi from "./index";
import devConsole from "../devConsole";

import { MESSAGES } from "../services/URLs";

export default {
  getUplinkMessages(payload) {
    devConsole.log("Sending request to get uplink messages from server..");
    return appApi.post(`${MESSAGES}/uplink`, payload);
  },
  getCountOfGateways(payload) {
    devConsole.log(
      "Sending request to get count of uplink messages from server.."
    );
    return appApi.get(`${MESSAGES}/uplink`);
  },
};
