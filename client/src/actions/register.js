import axios from "axios";
import fixtures from "../fixtures/fixtures";

export const REGISTER_REQUEST = "REGISTER_REQUEST";
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_MESSAGE = "REGISTER_MESSAGE";

export const registerSuccess = () => ({
  type: REGISTER_SUCCESS,
});

export const registerMessage = (message) => ({
  type: REGISTER_MESSAGE,
  message,
});

export const registerRequest = () => ({
  type: REGISTER_REQUEST,
});

export const startRegister = (registerObj) => (dispatch) => {
  dispatch(registerRequest());
  console.log(registerObj);
  axios
    .post(`${fixtures.SERVER_URI}/register`, { ...registerObj })
    .then(({ data }) => {
      const { status, message } = data;
      if (status) {
        dispatch(registerSuccess());
        dispatch(registerMessage("Registration Successful!"));
      } else {
        dispatch(registerMessage(message));
      }
    })
    .catch((err) => {
      console.log(err);
      dispatch(registerMessage(err.message));
    });
};
