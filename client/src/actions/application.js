import applicationApi from "../api/applicationApi";
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
  SELECT_RESULT,
} from "./types";

export const getApplications = ({ order, rowsPerPage, page, column }) => async (
  dispatch
) => {
  try {
    const res = await applicationApi.getApplications({
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

export const getCountOfApplications = () => async (dispatch) => {
  try {
    const res = await applicationApi.getCountOfApplications();

    dispatch({
      type: SET_COUNT_RESULTS,
      payload: res.data.count,
    });
  } catch (err) {
    devConsole.log(err);
  }
};
