import { combineReducers } from "redux";
import auth from "./auth";
import { LOGOUT } from "../actions/auth";
import { initialState } from "../reducers/auth";

const appReducer = combineReducers({
  auth,
});

export default function rootReducer(state, action) {
  if (action.type === LOGOUT) {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    const auth = { ...initialState, loading: false };
    state = { auth };
  }
  return appReducer(state, action);
}
