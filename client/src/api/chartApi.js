import appApi from "./index";
import devConsole from "../devConsole";

import { CHART } from "../services/URLs";

export default {
  getAllMessages() {
    devConsole.log(
      "Get count of all uplink and downlink messages from server.."
    );
    return appApi.get(`${CHART}/allMessages`);
  },
  getApplication(payload) {
    devConsole.log(
      "Get count of all uplink and downlink messages for specific application from server.."
    );
    return appApi.post(`${CHART}/application`, payload);
  },
  getDevice(payload) {
    devConsole.log(
      "Get count of all uplink and downlink messages for specific device from server.."
    );
    return appApi.post(`${CHART}/device`, payload);
  },
  getDeviceMessageRatio(payload) {
    devConsole.log(
      "Get ratio of messages type for specific device from server.."
    );
    return appApi.post(`${CHART}/deviceMessageRatio`, payload);
  },
};
