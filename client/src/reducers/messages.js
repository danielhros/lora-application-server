import {
  SET_UPLINK_MESSAGES,
  SET_COUNT_OF_UPLINK_MESSAGES,
  RESET_ALL_MESSAGES,
  SET_SENT_DOWNLINK_MESSAGES,
  SET_SCHEDULED_DOWNLINK_MESSAGES,
  SET_COUNT_OF_SENT_DOWNLINK_MESSAGES,
  SET_COUNT_OF_SCHEDULED_DOWNLINK_MESSAGES,
} from "../actions/messages";

const initialState = {
  uplink: {
    messages: [],
    count: null,
  },
  scheduledDownlink: {
    messages: [],
    count: null,
  },
  sentDownlink: {
    messages: [],
    count: null,
  },
};

export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case SET_UPLINK_MESSAGES:
      return {
        ...state,
        uplink: {
          ...state.uplink,
          messages: payload,
        },
      };
    case SET_SENT_DOWNLINK_MESSAGES:
      return {
        ...state,
        sentDownlink: {
          ...state.sentDownlink,
          messages: payload,
        },
      };
    case SET_SCHEDULED_DOWNLINK_MESSAGES:
      return {
        ...state,
        scheduledDownlink: {
          ...state.scheduledDownlink,
          messages: payload,
        },
      };
    case SET_COUNT_OF_UPLINK_MESSAGES:
      return {
        ...state,
        uplink: {
          ...state.uplink,
          count: payload,
        },
      };
    case SET_COUNT_OF_SENT_DOWNLINK_MESSAGES:
      return {
        ...state,
        sentDownlink: {
          ...state.sentDownlink,
          count: payload,
        },
      };
    case SET_COUNT_OF_SCHEDULED_DOWNLINK_MESSAGES:
      return {
        ...state,
        scheduledDownlink: {
          ...state.scheduledDownlink,
          count: payload,
        },
      };
    case RESET_ALL_MESSAGES:
      return {
        ...state,
        uplink: {
          messages: [],
          count: null,
        },
        scheduledDownlink: {
          messages: [],
          count: null,
        },
        sentDownlink: {
          messages: [],
          count: null,
        },
      };
    default:
      return state;
  }
};
