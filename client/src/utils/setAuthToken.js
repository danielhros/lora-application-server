import axios from "axios";

export const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }
};

export const setBaseUrl = () => {
  axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;
};
