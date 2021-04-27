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
  getCountOfDownlinkMessages(payload) {
    devConsole.log(
      "Sending request to get count of sent/scheduled downlink messages for gateway from server.."
    );
    return appApi.post(`${GATEWAY}/downlinkMessages/count`, payload);
  },
  getDownlinkMessages(payload) {
    devConsole.log(
      "Sending request to get scheduled/sent downlink messages for gateway from server.."
    );
    return appApi.post(`${GATEWAY}/downlinkMessages`, payload);
  },
  sendSetap(payload) {
    devConsole.log("Sending SETAP message to server..");
    return appApi.post(`${GATEWAY}/setap`, payload);
  },
  downloadSetap(payload) {
    devConsole.log("Downloading SETAP message from server..");
    return appApi.post(`${GATEWAY}/download`, payload);
  },
  getCircles(payload) {
    devConsole.log("Get circles for gateways from server..");
    return appApi.post(`${GATEWAY}/getRadius`, payload);
  },
};
