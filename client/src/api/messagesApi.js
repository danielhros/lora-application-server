import appApi from "./index";
import devConsole from "../devConsole";

import { MESSAGES } from "../services/URLs";

export default {
  getUplinkMessages(payload) {
    devConsole.log("Sending request to get uplink messages from server..");
    return appApi.post(`${MESSAGES}/uplink`, payload);
  },
  getCountOfGateways() {
    devConsole.log(
      "Sending request to get count of uplink messages from server.."
    );
    return appApi.get(`${MESSAGES}/uplink`);
  },
  getDownlinkMessages(payload) {
    devConsole.log(
      "Sending request to get scheduled/sent downlink messages from server.."
    );
    return appApi.post(`${MESSAGES}/downlink`, payload);
  },

  getCountOfSentDownlinkMessages() {
    devConsole.log(
      "Sending request to get count of sent downlink messages from server.."
    );
    return appApi.get(`${MESSAGES}/downlink/sent`);
  },
  getCountOfScheduledDownlinkMessages() {
    devConsole.log(
      "Sending request to get count of scheduled downlink messages from server.."
    );
    return appApi.get(`${MESSAGES}/downlink/scheduled`);
  },
};
