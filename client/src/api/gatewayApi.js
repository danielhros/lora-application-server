import appApi from "./index";
import devConsole from "../devConsole";

import { GATEWAY } from "../services/URLs";

export default {
  getGateways(payload) {
    devConsole.log("Sending request to get gateways from server..");
    return appApi.post(GATEWAY, payload);
  },
  getCountOfGateways() {
    devConsole.log("Sending request to get count of gateways from server..");
    return appApi.get(GATEWAY);
  },
  getGatewayDetail(payload) {
    devConsole.log("Sending request to get detail of gateway from server..");
    return appApi.post(`${GATEWAY}/detail`, payload);
  },
  getUplinkMessages(payload) {
    devConsole.log(
      "Sending request to get uplink messages for gateway from server.."
    );
    return appApi.post(`${GATEWAY}/uplinkMessages`, payload);
  },
  getCountOfUplinkMessages(payload) {
    devConsole.log(
      "Sending request to get count of uplink messages for gateway from server.."
    );
    return appApi.post(`${GATEWAY}/uplinkMessages/count`, payload);
  },
};
