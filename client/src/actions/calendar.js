import fixtures from '../fixtures/fixtures';
import axios from 'axios';

export const FETCH_EVENTS = 'FETCH_EVENTS',
  FETCH_SUCCESS = 'FETCH_SUCCESS';
export const ADD_EVENT = 'ADD_EVENT',
  ADD_SUCCESS = 'ADD_SUCCESS';
export const EDIT_EVENT = 'EDIT_EVENT',
  EDIT_SUCCESS = 'EDIT_SUCCESS';
export const REMOVE_EVENT = 'REMOVE_EVENT',
  REMOVE_SUCCESS = 'REMOVE_SUCCESS';
export const ERROR_EVENT = 'ERROR_EVENT';

const TIMEOUT = 5000;

export const errorEvents = () => ({
  type: ERROR_EVENT
});

export const fetchSuccess = (events) => ({
  type: FETCH_SUCCESS,
  events
});

export const fetchEvents = () => ({
  type: FETCH_EVENTS
});

export const startEventsFetch = () => {
  return (dispatch, getState) => {
    dispatch(fetchEvents());
    return new Promise((resolve, reject) => {
      const queryString = `query {
				eventAll  {
					_id,
					title,
					start,
					end,
					description,
					dow
				}
			}`;
      axios
        .post(
          `${fixtures.SERVER_URI}/event`,
          { query: queryString, token: getState().auth.token },
          { timeout: TIMEOUT }
        )
        .then((result) => {
          const events = result.data.data.eventAll.map((event) => {
            event.id = event._id;
            delete event._id;
            return event;
          });
          console.log('events:', events);
          if (events) {
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
  type: ADD_EVENT
});

export const addSuccess = (eventObj) => ({
  type: ADD_SUCCESS,
  eventObj
});

export const startAddEvent = (eventObj) => (dispatch, getState) => {
  dispatch(addEvent());
  return new Promise((resolve, reject) => {
    eventObj.start = new Date(eventObj.start).toISOString();
    eventObj.end = new Date(eventObj.end).toISOString();
    const queryString = `mutation {
			createOneEvent ( record: {
				title: "${eventObj.title}",
				description: "${eventObj.description}",
				start: "${eventObj.start}",
				end: "${eventObj.end}",
				dow: [${eventObj.dow}]
			})
		}`;
    axios
      .post(
        `${fixtures.SERVER_URI}/event`,
        { query: queryString, token: getState().auth.token },
        { timeout: TIMEOUT }
      )
      .then((result) => {
        console.log(result);
        eventObj.id = result.data.data.createOneEvent._id;
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
  type: EDIT_EVENT
});

export const editSuccess = (eventObj) => ({
  type: EDIT_SUCCESS,
  eventObj
});

export const startEditEvent = (eventObj) => (dispatch, getState) => {
  dispatch(editEvent());
  return new Promise((resolve, reject) => {
    eventObj.start = new Date(eventObj.start).toISOString();
    eventObj.end = new Date(eventObj.end).toISOString();
    const queryString = `mutation {
			updateOneEvent ( record: {
				title: "${eventObj.title}",
				description: "${eventObj.description}",
				start: "${eventObj.start}",
				end: "${eventObj.end}",
				dow: [${eventObj.dow}]
			}, filter: { _id: "${eventObj.id}" })
		}`;
    axios
      .post(
        `${fixtures.SERVER_URI}/event`,
        { query: queryString, token: getState().auth.token },
        { timeout: TIMEOUT }
      )
      .then((result) => {
        console.log(result);
        result = result.data.data.updateOneEvent;
        if (result.success) {
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
  type: REMOVE_EVENT
});

export const removeSuccess = (id) => ({
  type: REMOVE_SUCCESS,
  id
});

export const startRemoveEvent = (id) => (dispatch, getState) => {
  dispatch(removeEvent());
  return new Promise((resolve, reject) => {
    const queryString = `mutation {
			removeOneEvent ( _id: "${id}" )
		}`;
    axios
      .post(
        `${fixtures.SERVER_URI}/event`,
        { query: queryString, token: getState().auth.token },
        { timeout: TIMEOUT }
      )
      .then((result) => {
        console.log(result);
        result = result.data.data.removeOneEvent;
        if (result.success) {
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
