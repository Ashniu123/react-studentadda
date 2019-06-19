import fixtures from '../fixtures/fixtures';
import axios from 'axios';

export const LOGOUT = 'LOGOUT';
export const LOGIN_REQUEST = 'LOGIN_REQUEST',
  LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const MESSAGE = 'MESSAGE';

export const authMessage = (message) => ({
  type: MESSAGE,
  message
});

export const loginSuccess = (token) => ({
  type: LOGIN_SUCCESS,
  token
});

export const loginRequest = () => ({
  type: LOGIN_REQUEST
});

// TODO: implement if token is valid by adding another route on server
export const startLoginOnAppStartup = () => (dispatch) => {
  const token = localStorage.getItem('token') || sessionStorage.getItem('token');
  if (token) {
    dispatch(loginSuccess(token));
  }
};

export const startLogin = (loginObj) => {
  const { email, password, rememberMe } = loginObj;
  delete loginObj.rememberMe;
  return (dispatch) => {
    dispatch(loginRequest());
    const queryString = ` query {
			login (
				email: "${email}",
				password: "${password}"
			)
		}`;
    return axios
      .post(`${fixtures.SERVER_URI}/user`, { query: queryString })
      .then((result) => {
        const payload = result.data.data.login;
        if (result.data.data.login.success) {
          if (rememberMe) {
            localStorage.setItem('token', payload.token);
            localStorage.setItem('name', JSON.stringify(payload.name));
          }
          sessionStorage.setItem('token', payload.token);
          sessionStorage.setItem('name', JSON.stringify(payload.name));
          dispatch(loginSuccess(payload.token));
        } else {
          dispatch(authMessage(payload.message));
        }
      })
      .catch((err) => {
        console.log(err);
        dispatch(authMessage(err.message));
      });
  };
};

export const logoutRequest = () => ({
  type: LOGOUT
});

export const startLogout = () => (dispatch) => {
  dispatch(logoutRequest());
  localStorage.removeItem('token');
  localStorage.removeItem('name');
  sessionStorage.removeItem('token');
  sessionStorage.removeItem('name');
};
