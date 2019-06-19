import {
  FETCH_EVENTS,
  FETCH_SUCCESS,
  ADD_EVENT,
  ADD_SUCCESS,
  EDIT_EVENT,
  EDIT_SUCCESS,
  REMOVE_EVENT,
  REMOVE_SUCCESS,
  ERROR_EVENT
} from '../actions/calendar';

const defaultCalendarState = { isFetching: false, events: [] };

export default (state = defaultCalendarState, action) => {
  switch (action.type) {
    case FETCH_EVENTS:
      return {
        ...state,
        isFetching: true
      };
    case FETCH_SUCCESS:
      return {
        ...state,
        isFetching: false,
        events: action.events
      };
    case ADD_EVENT: {
      return state;
    }
    case ADD_SUCCESS: {
      const events = state.events.concat(action.eventObj);
      console.log(events);
      return {
        ...state,
        events
      };
    }
    case EDIT_EVENT: {
      return state;
    }
    case EDIT_SUCCESS: {
      const events = state.events.map((event) => {
        if (event.id === action.eventObj.id) {
          return action.eventObj;
        }
        return event;
      });
      return {
        ...state,
        events
      };
    }
    case REMOVE_EVENT: {
      return state;
    }
    case REMOVE_SUCCESS: {
      const events = state.events.filter((event) => event.id !== action.id);
      return {
        ...state,
        events
      };
    }
    case ERROR_EVENT: {
      return {
        ...state,
        isFetching: false
      };
    }
    default:
      return state;
  }
};
