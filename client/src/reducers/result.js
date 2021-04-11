import {
  SET_RESULTS,
  SET_COUNT_RESULTS,
  SET_ROWS_PER_PAGE_RESULT,
  RESET_RESULTS,
  SELECT_RESULT,
  RESET_SELECTED_RESULT,
} from "../actions/types";

const initialState = {
  results: [],
  countOfResults: null,
  rowsPerPage: 5,
  selected: null, // null = nothing was selected, undefined = recourse not found
};

export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case SET_RESULTS:
      return {
        ...state,
        results: payload,
      };
    case SET_COUNT_RESULTS:
      return {
        ...state,
        countOfResults: payload,
      };
    case SET_ROWS_PER_PAGE_RESULT:
      return {
        ...state,
        rowsPerPage: payload,
      };
    case RESET_RESULTS:
      return {
        ...state,
        results: [],
        countOfResults: null,
      };
    case SELECT_RESULT:
      return {
        ...state,
        selected: payload,
      };
    case RESET_SELECTED_RESULT:
      return {
        ...state,
        selected: null,
      };
    default:
      return state;
  }
};
