import appApi from "./index";
import devConsole from "../devConsole";

import { CHART } from "../services/URLs";

export default {
  getAllMessages(payload) {
    devConsole.log("Get count of all uplink and downlink messages server..");
    return appApi.get(`${CHART}/allMessages`, payload);
  },
};
