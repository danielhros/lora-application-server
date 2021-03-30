import { SET_GATEWAYS, SET_COUNT_GATEWAYS } from "../actions/gateway";

const initialState = {
  gateways: [],
  countOfGateways: null,
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

    default:
      return state;
  }
};
