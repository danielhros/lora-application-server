import gatewayApi from "../api/gatewayApi";
import devConsole from "../devConsole";

export const SET_GATEWAYS = "GET_GATEWAYS";

// Load User
export const getGateways = () => async (dispatch) => {
  try {
    const res = await gatewayApi.getGateways({});

    dispatch({
      type: SET_GATEWAYS,
      payload: res.data,
    });
  } catch (err) {
    devConsole.log(err);
  }
};
