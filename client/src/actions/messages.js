import messagesApi from "../api/messagesApi";
import devConsole from "../devConsole";

export const SET_UPLINK_MESSAGES = "SET_UPLINK_MESSAGES";
export const SET_UPLINK_ROWS_MESSAGES_PER_PAGE =
  "SET_UPLINK_ROWS_MESSAGES_PER_PAGE";
export const SET_COUNT_OF_UPLINK_MESSAGES = "SET_COUNT_OF_UPLINK_MESSAGES";
export const RESET_ALL_MESSAGES = "RESET_ALL_MESSAGES";

// Load User
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
    const res = await messagesApi.getCountOfGateways();

    dispatch({
      type: SET_COUNT_OF_UPLINK_MESSAGES,
      payload: res.data.count,
    });
  } catch (err) {
    devConsole.log(err);
  }
};

export const cleanAllMessages = () => async (dispatch) => {
  dispatch({
    type: RESET_ALL_MESSAGES,
  });
};
