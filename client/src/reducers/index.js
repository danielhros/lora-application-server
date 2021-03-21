import { combineReducers } from "redux";
import auth from "./auth";
import { LOGOUT } from "../actions/auth";
import { initialState } from "../reducers/auth";

const appReducer = combineReducers({
  auth,
});

export default function rootReducer(state, action) {
  if (action.type === LOGOUT) {
    localStorage.removeItem("token");
    const auth = { ...initialState, loading: false, token: null };
    state = { auth };
  }
  return appReducer(state, action);
}
