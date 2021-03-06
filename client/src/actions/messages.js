import messagesApi from "../api/messagesApi";
import devConsole from "../devConsole";

import {
  SET_UPLINK_MESSAGES,
  SET_COUNT_OF_UPLINK_MESSAGES,
  RESET_ALL_MESSAGES,
  SET_SENT_DOWNLINK_MESSAGES,
  SET_SCHEDULED_DOWNLINK_MESSAGES,
  SET_COUNT_OF_SENT_DOWNLINK_MESSAGES,
  SET_COUNT_OF_SCHEDULED_DOWNLINK_MESSAGES,
} from "./types";

export const getUplinkMessages = ({
  order,
  rowsPerPage,
  page,
  column,
}) => async (dispatch) => {
  try {
    const res = await messagesApi.getUplinkMessages({
      order,
      rowsPerPage,
      page,
      column,
    });

    dispatch({
      type: SET_UPLINK_MESSAGES,
      payload: res.data,
    });
  } catch (err) {
    devConsole.log(err);
  }
};

export const getCountOfUplinkMessages = () => async (dispatch) => {
  try {
    const res = await messagesApi.getCountOfUplinkMessages();

    dispatch({
      type: SET_COUNT_OF_UPLINK_MESSAGES,
      payload: res.data.count,
    });
  } catch (err) {
    devConsole.log(err);
  }
};

export const getDownlinkMessages = ({
  order,
  rowsPerPage,
  page,
  column,
  sent,
}) => async (dispatch) => {
  try {
    const res = await messagesApi.getDownlinkMessages({
      order,
      rowsPerPage,
      page,
      column,
      sent,
    });

    if (sent === true) {
      dispatch({
        type: SET_SENT_DOWNLINK_MESSAGES,
        payload: res.data,
      });
    } else {
      dispatch({
        type: SET_SCHEDULED_DOWNLINK_MESSAGES,
        payload: res.data,
      });
    }
  } catch (err) {
    devConsole.log(err);
  }
};

export const getCountOfDownlinkMessages = (sent) => async (dispatch) => {
  try {
    let res;

    if (sent) {
      res = await messagesApi.getCountOfSentDownlinkMessages();
      dispatch({
        type: SET_COUNT_OF_SENT_DOWNLINK_MESSAGES,
        payload: res.data.count,
      });
    } else {
      res = await messagesApi.getCountOfScheduledDownlinkMessages();
      dispatch({
        type: SET_COUNT_OF_SCHEDULED_DOWNLINK_MESSAGES,
        payload: res.data.count,
      });
    }
  } catch (err) {
    devConsole.log(err);
  }
};

export const cleanAllMessages = () => async (dispatch) => {
  dispatch({
    type: RESET_ALL_MESSAGES,
  });
};
