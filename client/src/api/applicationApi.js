import appApi from "./index";
import devConsole from "../devConsole";

import { APPLICATION } from "../services/URLs";

export default {
  getApplications(payload) {
    devConsole.log("Sending request to get applications from server..");
    return appApi.post(APPLICATION, payload);
  },
  getCountOfApplications() {
    devConsole.log(
      "Sending request to get count of applications from server.."
    );
    return appApi.get(APPLICATION);
  },
  getApplicationDetail(payload) {
    devConsole.log(
      "Sending request to get detail of application from server.."
    );
    return appApi.post(`${APPLICATION}/detail`, payload);
  },
  getUplinkMessages(payload) {
    devConsole.log(
      "Sending request to get uplink messages for application from server.."
    );
    return appApi.post(`${APPLICATION}/uplinkMessages`, payload);
  },
  getCountOfUplinkMessages(payload) {
    devConsole.log(
      "Sending request to get count of uplink messages for application from server.."
    );
    return appApi.post(`${APPLICATION}/uplinkMessages/count`, payload);
  },
  getCountOfDownlinkMessages(payload) {
    devConsole.log(
      "Sending request to get count of sent/scheduled downlink messages for application from server.."
    );
    return appApi.post(`${APPLICATION}/downlinkMessages/count`, payload);
  },
  getDownlinkMessages(payload) {
    devConsole.log(
      "Sending request to get scheduled/sent downlink messages for application from server.."
    );
    return appApi.post(`${APPLICATION}/downlinkMessages`, payload);
  },
  getDevices(payload) {
    devConsole.log(
      "Sending request to get devices for application from server.."
    );
    return appApi.post(`${APPLICATION}/devices`, payload);
  },
  getCountOfDevices(payload) {
    devConsole.log(
      "Sending request to get count of devices for application from server.."
    );
    return appApi.post(`${APPLICATION}/devicesCount`, payload);
  },
  setNewApplicationName(payload) {
    devConsole.log("Sending request to set new application name..");
    return appApi.post(`${APPLICATION}/rename`, payload);
  },
};
