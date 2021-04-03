import gatewayApi from "../api/gatewayApi";
import devConsole from "../devConsole";

export const SET_GATEWAYS = "GET_GATEWAYS";
export const SET_COUNT_GATEWAYS = "SET_COUNT_GATEWAYS";
export const SET_ROWS_PER_PAGE = "SET_ROWS_PER_PAGE";
export const RESET_GATEWAYS = "RESET_GATEWAYS";
export const SELECT_GATEWAY = "SELECT_GATEWAY";
export const RESET_SELECTED_GATEWAY = "RESET_SELECTED_GATEWAY";

// Load User
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
      type: SET_GATEWAYS,
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
      type: SET_COUNT_GATEWAYS,
      payload: res.data.count,
    });
  } catch (err) {
    devConsole.log(err);
  }
};

export const setRowsPerPage = (rowsPerPage) => (dispatch) => {
  dispatch({
    type: SET_ROWS_PER_PAGE,
    payload: rowsPerPage,
  });
};

export const cleanGateways = () => (dispatch) => {
  dispatch({
    type: RESET_GATEWAYS,
  });
};

export const selectGateway = (index) => (dispatch, getState) => {
  const { gateway } = getState();
  dispatch({
    type: SELECT_GATEWAY,
    payload: gateway.gateways[index],
  });
};

export const resetSelected = () => (dispatch) => {
  dispatch({
    type: RESET_SELECTED_GATEWAY,
  });
};

export const getGatewayDetail = ({ id }) => async (dispatch) => {
  console.log("som tu");
  try {
    const payload = { devId: parseInt(id) };

    const { data } = await gatewayApi.getGatewayDetail(payload);

    dispatch({
      type: SELECT_GATEWAY,
      payload: data[0] || undefined,
    });
  } catch (err) {
    devConsole.log(err);
  }
};
