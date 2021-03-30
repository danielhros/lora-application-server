import gatewayApi from "../api/gatewayApi";
import devConsole from "../devConsole";

export const SET_GATEWAYS = "GET_GATEWAYS";
export const SET_COUNT_GATEWAYS = "SET_COUNT_GATEWAYS";

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
