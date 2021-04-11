import deviceApi from "../api/deviceApi";
import devConsole from "../devConsole";

import {
  SET_UPLINK_MESSAGES,
  SET_COUNT_OF_UPLINK_MESSAGES,
  SET_SENT_DOWNLINK_MESSAGES,
  SET_SCHEDULED_DOWNLINK_MESSAGES,
  SET_COUNT_OF_SENT_DOWNLINK_MESSAGES,
  SET_COUNT_OF_SCHEDULED_DOWNLINK_MESSAGES,
  SET_RESULTS,
  SET_COUNT_RESULTS,
  SET_ROWS_PER_PAGE_RESULT,
  RESET_RESULTS,
  SELECT_RESULT,
  RESET_SELECTED_RESULT,
} from "./types";

export const getDEVICE = ({ order, rowsPerPage, page, column }) => async (
  dispatch
) => {
  try {
    const res = await deviceApi.getDevices({
      order,
      rowsPerPage,
      page,
      column,
    });

    dispatch({
      type: SET_RESULTS,
      payload: res.data,
    });
  } catch (err) {
    devConsole.log(err);
  }
};

export const getCountOfDevices = () => async (dispatch) => {
  try {
    const res = await devConsole.getCountOfDevices();

    dispatch({
      type: SET_COUNT_RESULTS,
      payload: res.data.count,
    });
  } catch (err) {
    devConsole.log(err);
  }
};
