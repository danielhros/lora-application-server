import {
  SET_ROWS_PER_PAGE_RESULT,
  RESET_RESULTS,
  RESET_SELECTED_RESULT,
  SELECT_RESULT,
} from "./types";

export const setRowsPerPage = (rowsPerPage) => (dispatch) => {
  dispatch({
    type: SET_ROWS_PER_PAGE_RESULT,
    payload: rowsPerPage,
  });
};

export const cleanResults = () => (dispatch) => {
  dispatch({
    type: RESET_RESULTS,
  });
};

export const resetSelectedResult = () => (dispatch) => {
  dispatch({
    type: RESET_SELECTED_RESULT,
  });
};

export const updateSelected = (updatedSelected) => (dispatch) => {
  dispatch({
    type: SELECT_RESULT,
    payload: updatedSelected,
  });
};
