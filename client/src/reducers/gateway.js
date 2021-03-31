import {
  SET_GATEWAYS,
  SET_COUNT_GATEWAYS,
  SET_ROWS_PER_PAGE,
} from "../actions/gateway";

const initialState = {
  gateways: [],
  countOfGateways: null,
  rowsPerPage: 5,
  selected: null,
};

export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case SET_GATEWAYS:
      return {
        ...state,
        gateways: payload,
      };
    case SET_COUNT_GATEWAYS:
      return {
        ...state,
        countOfGateways: payload,
      };
    case SET_ROWS_PER_PAGE:
      return {
        ...state,
        rowsPerPage: payload,
      };

    default:
      return state;
  }
};
