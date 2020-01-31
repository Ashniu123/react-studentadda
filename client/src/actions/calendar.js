import axios from "axios";
import fixtures from "../fixtures/fixtures";

export const FETCH_EVENTS = "FETCH_EVENTS";
export const FETCH_SUCCESS = "FETCH_SUCCESS";
export const ADD_EVENT = "ADD_EVENT";
export const ADD_SUCCESS = "ADD_SUCCESS";
export const EDIT_EVENT = "EDIT_EVENT";
export const EDIT_SUCCESS = "EDIT_SUCCESS";
export const REMOVE_EVENT = "REMOVE_EVENT";
export const REMOVE_SUCCESS = "REMOVE_SUCCESS";
export const ERROR_EVENT = "ERROR_EVENT";

const TIMEOUT = 5000;

export const errorEvents = () => ({
  type: ERROR_EVENT,
});

export const fetchSuccess = (events) => ({
  type: FETCH_SUCCESS,
  events,
});

export const fetchEvents = () => ({
  type: FETCH_EVENTS,
});

export const startEventsFetch = () => {
  return (dispatch, getState) => {
    dispatch(fetchEvents());
    return new Promise((resolve, reject) => {
      axios
        .get(`${fixtures.SERVER_URI}/events`, {
          timeout: TIMEOUT,
          headers: { "x-access-token": getState().auth.token },
        })
        .then(({ data }) => {
          const { success, payload } = data;
          if (success) {
            const events = payload.events.map((event) => {
              event.id = event._id;
              delete event._id;
              return event;
            });
            dispatch(fetchSuccess(events));
            resolve();
          } else {
            dispatch(errorEvents());
            reject();
          }
        })
        .catch((err) => {
          console.log(err);
          dispatch(errorEvents());
          reject();
        });
    });
  };
};

export const addEvent = () => ({
  type: ADD_EVENT,
});

export const addSuccess = (eventObj) => ({
  type: ADD_SUCCESS,
  eventObj,
});

export const startAddEvent = (eventObj) => (dispatch, getState) => {
  dispatch(addEvent());
  return new Promise((resolve, reject) => {
    eventObj.start = new Date(eventObj.start).toISOString();
    eventObj.end = new Date(eventObj.end).toISOString();
    console.log(eventObj);
    axios
      .post(
        `${fixtures.SERVER_URI}/events`,
        { ...eventObj, token: getState().auth.token },
        { timeout: TIMEOUT },
      )
      .then(({ data }) => {
        console.log(data);
        eventObj.id = data.payload.id;
        dispatch(addSuccess(eventObj));
        resolve();
      })
      .catch((err) => {
        console.log(err);
        dispatch(errorEvents());
        reject();
      });
  });
};

export const editEvent = () => ({
  type: EDIT_EVENT,
});

export const editSuccess = (eventObj) => ({
  type: EDIT_SUCCESS,
  eventObj,
});

export const startEditEvent = (eventObj) => (dispatch, getState) => {
  dispatch(editEvent());
  return new Promise((resolve, reject) => {
    eventObj.start = new Date(eventObj.start).toISOString();
    eventObj.end = new Date(eventObj.end).toISOString();
    console.log(eventObj);
    axios
      .put(
        `${fixtures.SERVER_URI}/events`,
        { ...eventObj, token: getState().auth.token },
        { timeout: TIMEOUT },
      )
      .then(({ data }) => {
        console.log(data);
        if (data.success) {
          dispatch(editSuccess(eventObj));
        } else {
          dispatch(errorEvents());
          reject();
        }
        resolve();
      })
      .catch((err) => {
        console.log(err);
        dispatch(errorEvents());
        reject();
      });
  });
};

export const removeEvent = () => ({
  type: REMOVE_EVENT,
});

export const removeSuccess = (id) => ({
  type: REMOVE_SUCCESS,
  id,
});

export const startRemoveEvent = (id) => (dispatch, getState) => {
  dispatch(removeEvent());
  return new Promise((resolve, reject) => {
    axios
      .delete(
        `${fixtures.SERVER_URI}/events/${id}`,
        { headers: { "x-access-token": getState().auth.token } },
        { timeout: TIMEOUT },
      )
      .then(({ data }) => {
        console.log(data);
        if (data.success) {
          dispatch(removeSuccess(id));
        } else {
          dispatch(errorEvents());
          reject();
        }
        resolve();
      })
      .catch((err) => {
        console.log(err);
        dispatch(errorEvents());
        reject();
      });
  });
};
