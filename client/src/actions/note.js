import axios from "axios";
import fixtures from "../fixtures/fixtures";

export const FETCH_SETS = "FETCH_SETS";
export const FETCH_SETS_SUCCESS = "FETCH_SETS_SUCCESS";
export const FETCH_NOTE = "FETCH_NOTE";
export const FETCH_NOTE_SUCCESS = "FETCH_NOTE_SUCCESS";
export const ADD_SET = "ADD_SET";
export const ADD_SET_SUCCESS = "ADD_SET_SUCCESS";
export const ADD_NOTE = "ADD_NOTE";
export const ADD_NOTE_SUCCESS = "ADD_NOTE_SUCCESS";
export const EDIT_SET = "EDIT_SET";
export const EDIT_SET_SUCCESS = "EDIT_SET_SUCCESS";
export const EDIT_NOTE = "EDIT_NOTE";
export const EDIT_NOTE_SUCCESS = "EDIT_NOTE_SUCCESS";
export const REMOVE_SET = "REMOVE_SET";
export const REMOVE_SET_SUCCESS = "REMOVE_SET_SUCCESS";
export const REMOVE_NOTE = "REMOVE_NOTE";
export const REMOVE_NOTE_SUCCESS = "REMOVE_NOTE_SUCCESS";
export const ERROR_NOTE = "ERROR_NOTE";

const TIMEOUT = 5000;

export const errorNote = () => ({
  type: ERROR_NOTE,
});

export const fetchSets = () => ({
  type: FETCH_SETS,
});

export const fetchSetsSuccess = (sets) => ({
  type: FETCH_SETS_SUCCESS,
  sets,
});

export const startSetsFetch = () => {
  return (dispatch, getState) => {
    dispatch(fetchSets());
    return new Promise((resolve, reject) => {
      axios
        .get(`${fixtures.SERVER_URI}/sets`, {
          headers: { "x-access-token": getState().auth.token },
          timeout: TIMEOUT,
        })
        .then(({ data }) => {
          console.log(data);
          const { success, payload } = data;
          if (success) {
            const sets = payload.sets.map((note) => {
              note.id = note._id;
              delete note._id;
              return note;
            });
            dispatch(fetchSetsSuccess(sets));
            resolve();
          } else {
            dispatch(errorNote());
            reject();
          }
        })
        .catch((err) => {
          console.log(err);
          dispatch(errorNote());
          reject();
        });
    });
  };
};

export const addSetSuccess = (set) => ({
  type: ADD_SET_SUCCESS,
  set,
});

export const addSet = () => ({
  type: ADD_SET,
});

export const startAddSet = (setObj) => {
  return (dispatch, getState) => {
    dispatch(addSet());
    return new Promise((resolve, reject) => {
      axios
        .post(
          `${fixtures.SERVER_URI}/sets`,
          { ...setObj, token: getState().auth.token },
          { timeout: TIMEOUT },
        )
        .then(({ data }) => {
          console.log(setObj);
          const { success, payload } = data;
          if (success) {
            setObj.id = payload.id;
            console.log("sets:", setObj);
            dispatch(addSetSuccess(setObj));
            resolve();
          } else {
            dispatch(errorNote());
            reject();
          }
        })
        .catch((err) => {
          console.log(err);
          dispatch(errorNote());
          reject();
        });
    });
  };
};

export const editSetSuccess = (set) => ({
  type: EDIT_SET_SUCCESS,
  set,
});

export const editSet = () => ({
  type: EDIT_SET,
});

export const startEditSet = (setObj) => {
  return (dispatch, getState) => {
    dispatch(editSet());
    return new Promise((resolve, reject) => {
      axios
        .put(
          `${fixtures.SERVER_URI}/sets`,
          { ...setObj, token: getState().auth.token },
          { timeout: TIMEOUT },
        )
        .then((result) => {
          console.log(result);
          result = result.data.data.updateOneSet;
          if (result && result.success) {
            dispatch(editSetSuccess(setObj));
            resolve();
          } else {
            dispatch(errorNote());
            reject();
          }
        })
        .catch((err) => {
          console.log(err);
          dispatch(errorNote());
          reject();
        });
    });
  };
};

export const removeSetSuccess = (id) => ({
  type: REMOVE_SET_SUCCESS,
  id,
});

export const removeSet = () => ({
  type: REMOVE_SET,
});

export const startRemoveSet = (id) => {
  return (dispatch, getState) => {
    dispatch(removeSet());
    return new Promise((resolve, reject) => {
      const queryString = `mutation {
				removeOneSet(_id: "${id}")
			}`;
      axios
        .post(
          `${fixtures.SERVER_URI}/note`,
          { query: queryString, token: getState().auth.token },
          { timeout: TIMEOUT },
        )
        .then((result) => {
          console.log(result, id);
          result = result.data.data.removeOneSet;
          if (result && result.success) {
            dispatch(removeSetSuccess(result.setId));
            resolve();
          } else {
            dispatch(errorNote());
            reject();
          }
        })
        .catch((err) => {
          console.log(err);
          dispatch(errorNote());
          reject();
        });
    });
  };
};

export const fetchNote = () => ({
  type: FETCH_NOTE,
});

export const fetchNoteSuccess = (note) => ({
  type: FETCH_NOTE_SUCCESS,
  note,
});

export const startNoteFetch = (noteObj) => {
  return (dispatch, getState) => {
    dispatch(fetchNote());
    return new Promise((resolve, reject) => {
      axios
        .get(`${fixtures.SERVER_URI}/sets/${noteObj.id}/${noteObj.pageno}`, {
          headers: { "x-access-token": getState().auth.token },
          timeout: TIMEOUT,
        })
        .then(({ data }) => {
          const { success, payload } = data;
          if (success) {
            dispatch(fetchNoteSuccess({ ...noteObj, ...payload }));
            resolve();
          } else {
            dispatch(errorNote());
            reject();
          }
        })
        .catch((err) => {
          console.log(err);
          dispatch(errorNote());
          reject();
        });
    });
  };
};

export const addNote = () => ({
  type: ADD_NOTE,
});

export const addNoteSuccess = (note) => ({
  type: ADD_NOTE_SUCCESS,
  note,
});

export const startAddNote = (noteObj) => {
  return (dispatch, getState) => {
    dispatch(addNote());
    return new Promise((resolve, reject) => {
      axios
        .post(`${fixtures.SERVER_URI}/sets/${noteObj.id}`, noteObj, {
          timeout: TIMEOUT,
          headers: {
            "x-access-token": getState().auth.token,
          },
        })
        .then(({ data }) => {
          console.log(data);
          if (data.success) {
            dispatch(addNoteSuccess(noteObj));
            resolve();
          } else {
            dispatch(errorNote());
            reject();
          }
        })
        .catch((err) => {
          console.log(err);
          dispatch(errorNote());
          reject();
        });
    });
  };
};

export const removeNote = () => ({
  type: REMOVE_NOTE,
});

export const removeNoteSuccess = (note) => ({
  type: REMOVE_NOTE_SUCCESS,
  note,
});

export const startRemoveNote = (noteObj) => {
  return (dispatch, getState) => {
    dispatch(removeNote());
    return new Promise((resolve, reject) => {
      axios
        .delete(`${fixtures.SERVER_URI}/sets/${noteObj.id}/${noteObj.pageno}`, {
          timeout: TIMEOUT,
          headers: {
            "x-access-token": getState().auth.token,
          },
        })
        .then(({ data }) => {
          console.log(data);
          if (data.success) {
            dispatch(removeNoteSuccess(noteObj));
            resolve();
          } else {
            dispatch(errorNote());
            reject();
          }
        })
        .catch((err) => {
          console.log(err);
          dispatch(errorNote());
          reject();
        });
    });
  };
};
