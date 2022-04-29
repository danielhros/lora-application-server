/**
 * URLs used for requests to the server.
 */
export const BASE_URL = process.env.REACT_APP_BASE_URL;
export const API = "/api";
export const TOKEN = `${API}/auth/token`;
export const LOGIN = `${API}/auth`;
export const LOGOUT = `${API}/auth/logout`;
export const CREDENTIALS = `${API}/auth/updateCredentials`;
export const GATEWAY = `${API}/gateway`;
export const APPLICATION = `${API}/application`;
export const DEVICE = `${API}/device`;
export const MESSAGES = `${API}/messages`;
export const DASHBOARD = `${API}/dashboard`;
export const CHART = `${API}/chart`;
export const PDR = `${API}/pdr`;

export const CHART_MESSAGES = `${API}/messages/chart-data`;
export const ALL_MESSAGES = `${API}/messages/all-messages`;
export const MESSAGE_DETAIL = `${API}/messages/detail`;

