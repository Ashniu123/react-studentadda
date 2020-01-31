import axios from "axios";
import fixtures from "../fixtures/fixtures";

export const LOGOUT = "LOGOUT";
export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const MESSAGE = "MESSAGE";

export const authMessage = (message) => ({
  type: MESSAGE,
  message,
});

export const loginSuccess = (token) => ({
  type: LOGIN_SUCCESS,
  token,
});

export const loginRequest = () => ({
  type: LOGIN_REQUEST,
});

// TODO: implement if token is valid by adding another route on server
export const startLoginOnAppStartup = () => (dispatch) => {
  const token = localStorage.getItem("token") || sessionStorage.getItem("token");
  if (token) {
    dispatch(loginSuccess(token));
  }
};

export const startLogin = (loginObj) => {
  const { rememberMe } = loginObj;
  // email and password checks here
  delete loginObj.rememberMe;
  return (dispatch) => {
    dispatch(loginRequest());
    return axios
      .post(`${fixtures.SERVER_URI}/login`, { ...loginObj })
      .then(({ data }) => {
        const { success, message, payload } = data;
        if (success) {
          if (rememberMe) {
            localStorage.setItem("token", payload.token);
            localStorage.setItem("name", JSON.stringify(payload.name));
          }
          sessionStorage.setItem("token", payload.token);
          sessionStorage.setItem("name", JSON.stringify(payload.name));
          dispatch(loginSuccess(payload.token));
        } else {
          console.log("message", message);
          dispatch(authMessage(message));
        }
      })
      .catch((err) => {
        console.log(err);
        dispatch(authMessage(err.message));
      });
  };
};

export const logoutRequest = () => ({
  type: LOGOUT,
});

export const startLogout = () => (dispatch) => {
  dispatch(logoutRequest());
  localStorage.removeItem("token");
  localStorage.removeItem("name");
  sessionStorage.removeItem("token");
  sessionStorage.removeItem("name");
};
