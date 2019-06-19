import fixtures from '../fixtures/fixtures';
import axios from 'axios';

export const REGISTER_REQUEST = 'REGISTER_REQUEST',
  REGISTER_SUCCESS = 'REGISTER_SUCCESS',
  REGISTER_MESSAGE = 'REGISTER_MESSAGE';

export const registerSuccess = () => ({
  type: REGISTER_SUCCESS
});

export const registerMessage = (message) => ({
  type: REGISTER_MESSAGE,
  message
});

export const registerRequest = () => ({
  type: REGISTER_REQUEST
});

export const startRegister = (registerObj) => (dispatch) => {
  dispatch(registerRequest());
  const { name, email, password } = registerObj;
  const queryString = ` mutation {
		register (
			name: { firstName: "${name.firstName}", lastName: "${name.lastName}" },
			email: "${email}",
			password: "${password}"
		)
	}`;
  axios
    .post(`${fixtures.SERVER_URI}/user`, { query: queryString })
    .then((result) => {
      const payload = result.data.data.register;
      if (payload.status) {
        dispatch(registerSuccess());
        dispatch(registerMessage('Registeration Successful!'));
      } else {
        console.log(payload.data);
        dispatch(registerMessage(payload.message));
      }
    })
    .catch((err) => {
      console.log('error');
      console.log(err);
      dispatch(registerMessage(err.message));
    });
};
