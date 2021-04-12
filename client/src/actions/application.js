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

export const getApplicationDetail = ({ id }) => async (dispatch) => {
  try {
    const payload = { applicationId: parseInt(id) };

    const { data } = await applicationApi.getApplicationDetail(payload);

    if (data[0]) {
      dispatch({
        type: SELECT_RESULT,
        payload: {
          data: data[0],
          type: "application",
        },
      });
    } else {
      dispatch({
        type: SELECT_RESULT,
        payload: {
          data: undefined,
          type: undefined,
        },
      });
    }
  } catch (err) {
    dispatch({
      type: SELECT_RESULT,
      payload: {
        data: undefined,
        type: undefined,
      },
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
  const { id } = getState().result.selected.data;
  try {
    const res = await applicationApi.getUplinkMessages({
      order,
      rowsPerPage,
      page,
      column,
      applicationId: id,
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
  const { id } = getState().result.selected.data;

  try {
    const res = await applicationApi.getCountOfUplinkMessages({
      applicationId: id,
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
  const { id } = getState().result.selected.data;
  try {
    const res = await applicationApi.getCountOfDownlinkMessages({
      applicationId: id,
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
  const { id } = getState().result.selected.data;
  try {
    const res = await applicationApi.getDownlinkMessages({
      order,
      rowsPerPage,
      page,
      column,
      sent,
      applicationId: id,
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
