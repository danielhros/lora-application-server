import { SET_GATEWAYS } from "../actions/gateway";

const initialState = {
  gateways: [],
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
    default:
      return state;
  }
};
