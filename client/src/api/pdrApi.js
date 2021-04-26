import appApi from "./index";
import devConsole from "../devConsole";

import { PDR } from "../services/URLs";

export default {
  getPDRAllMessages() {
    devConsole.log("Sending request to get pdr of all messages from server..");
    return appApi.get(`${PDR}/allMessages`);
  },
  getPDRApplication(payload) {
    devConsole.log(
      "Sending request to get pdr of concrete application from server.."
    );
    return appApi.post(`${PDR}/application`, payload);
  },
};
