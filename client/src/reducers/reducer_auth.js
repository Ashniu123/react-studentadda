import { LOGIN_REQUEST, LOGIN_SUCCESS, MESSAGE, LOGOUT } from "../actions/auth";

const defaultAuthState = { isLogging: false };

export default (state = defaultAuthState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        isLogging: true
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLogging: false,
        token: action.token
      };
    case LOGOUT:
      return defaultAuthState;
    case MESSAGE:
      return {
        ...state,
        isLogging: false,
        message: action.message
      };
    default:
      return state;
  }
};
