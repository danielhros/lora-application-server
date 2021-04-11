import gatewayApi from "../api/gatewayApi";
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

export const getGateways = ({ order, rowsPerPage, page, column }) => async (
  dispatch
) => {
  try {
    const res = await gatewayApi.getGateways({
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

export const getCountOfGateways = () => async (dispatch) => {
  try {
    const res = await gatewayApi.getCountOfGateways();

    dispatch({
      type: SET_COUNT_RESULTS,
      payload: res.data.count,
    });
  } catch (err) {
    devConsole.log(err);
  }
};

export const setRowsPerPage = (rowsPerPage) => (dispatch) => {
  dispatch({
    type: SET_ROWS_PER_PAGE_RESULT,
    payload: rowsPerPage,
  });
};

export const cleanGateways = () => (dispatch) => {
  dispatch({
    type: RESET_RESULTS,
  });
};

export const selectGateway = (index) => (dispatch, getState) => {
  const { gateway } = getState();
  dispatch({
    type: SELECT_RESULT,
    payload: gateway.gateways[index],
  });
};

export const resetSelected = () => (dispatch) => {
  dispatch({
    type: RESET_SELECTED_RESULT,
  });
};

export const getGatewayDetail = ({ id }) => async (dispatch) => {
  try {
    const payload = { devId: parseInt(id) };

    const { data } = await gatewayApi.getGatewayDetail(payload);

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
  gatewayId,
}) => async (dispatch, getState) => {
  const { id } = getState().result.selected;

  try {
    const res = await gatewayApi.getUplinkMessages({
      order,
      rowsPerPage,
      page,
      column,
      gatewayId: id,
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
    const res = await gatewayApi.getCountOfUplinkMessages({
      gatewayId: id,
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
    const res = await gatewayApi.getCountOfDownlinkMessages({
      gatewayId: id,
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
    const res = await gatewayApi.getDownlinkMessages({
      order,
      rowsPerPage,
      page,
      column,
      sent,
      gatewayId: id,
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
