import appApi from "./index";
import devConsole from "../devConsole";

import { DEVICE } from "../services/URLs";

export default {
  getDevices(payload) {
    devConsole.log("Sending request to get devices from server..");
    return appApi.post(DEVICE, payload);
  },
  getCountOfDevices() {
    devConsole.log("Sending request to get count of devices from server..");
    return appApi.get(DEVICE);
  },
  getDeviceDetail(payload) {
    devConsole.log("Sending request to get detail of device from server..");
    return appApi.post(`${DEVICE}/detail`, payload);
  },
  getUplinkMessages(payload) {
    devConsole.log(
      "Sending request to get uplink messages for device from server.."
    );
    return appApi.post(`${DEVICE}/uplinkMessages`, payload);
  },
  getCountOfUplinkMessages(payload) {
    devConsole.log(
      "Sending request to get count of uplink messages for device from server.."
    );
    return appApi.post(`${DEVICE}/uplinkMessages/count`, payload);
  },
  getCountOfDownlinkMessages(payload) {
    devConsole.log(
      "Sending request to get count of sent/scheduled downlink messages for device from server.."
    );
    return appApi.post(`${DEVICE}/downlinkMessages/count`, payload);
  },
  getDownlinkMessages(payload) {
    devConsole.log(
      "Sending request to get scheduled/sent downlink messages for device from server.."
    );
    return appApi.post(`${DEVICE}/downlinkMessages`, payload);
  },
};
