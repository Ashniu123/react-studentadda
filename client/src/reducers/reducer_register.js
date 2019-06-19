import { REGISTER_REQUEST, REGISTER_SUCCESS, REGISTER_MESSAGE } from '../actions/register';

const defaultRegisterState = { isRegistering: false };

export default (state = defaultRegisterState, action) => {
  switch (action.type) {
    case REGISTER_REQUEST:
      return {
        ...state,
        isRegistering: true
      };
    case REGISTER_SUCCESS:
      return {
        ...state,
        isRegistering: false
      };
    case REGISTER_MESSAGE:
      return {
        ...state,
        isRegistering: false,
        message: action.message
      };
    default:
      return state;
  }
};
