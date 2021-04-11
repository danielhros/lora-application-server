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
  SELECT_RESULT,
} from "./types";

export const getDevices = ({ order, rowsPerPage, page, column }) => async (
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
    const res = await deviceApi.getCountOfDevices();

    dispatch({
      type: SET_COUNT_RESULTS,
      payload: res.data.count,
    });
  } catch (err) {
    devConsole.log(err);
  }
};

export const getDeviceDetail = ({ id }) => async (dispatch) => {
  try {
    const payload = { devId: parseInt(id) };

    const { data } = await deviceApi.getDeviceDetail(payload);

    dispatch({
      type: SELECT_RESULT,
      payload: data[0] || undefined,
    });
  } catch (err) {
    dispatch({
      type: SELECT_RESULT,
      payload: undefined,
    });
    devConsole.log(err);
  }
};

export const getUplinkMessages = ({
  order,
  rowsPerPage,
  page,
  column,
}) => async (dispatch, getState) => {
  const { id } = getState().result.selected;

  try {
    const res = await deviceApi.getUplinkMessages({
      order,
      rowsPerPage,
      page,
      column,
      deviceId: id,
    });

    dispatch({
      type: SET_UPLINK_MESSAGES,
      payload: res.data,
    });
  } catch (err) {
    devConsole.log(err);
  }
};

export const getCountOfUplinkMessages = () => async (dispatch, getState) => {
  const { id } = getState().result.selected;

  try {
    const res = await deviceApi.getCountOfUplinkMessages({
      deviceId: id,
    });

    dispatch({
      type: SET_COUNT_OF_UPLINK_MESSAGES,
      payload: res.data.count,
    });
  } catch (err) {
    devConsole.log(err);
  }
};

export const getCountOfDownlinkMessages = (sent) => async (
  dispatch,
  getState
) => {
  const { id } = getState().result.selected;
  try {
    const res = await deviceApi.getCountOfDownlinkMessages({
      deviceId: id,
      sent,
    });
    if (sent) {
      dispatch({
        type: SET_COUNT_OF_SENT_DOWNLINK_MESSAGES,
        payload: res.data.count,
      });
    } else {
      dispatch({
        type: SET_COUNT_OF_SCHEDULED_DOWNLINK_MESSAGES,
        payload: res.data.count,
      });
    }
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
}) => async (dispatch, getState) => {
  const { id } = getState().result.selected;
  try {
    const res = await deviceApi.getDownlinkMessages({
      order,
      rowsPerPage,
      page,
      column,
      sent,
      deviceId: id,
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
