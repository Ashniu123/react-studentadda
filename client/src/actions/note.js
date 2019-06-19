import fixtures from '../fixtures/fixtures';
import axios from 'axios';

export const FETCH_SETS = 'FETCH_SETS',
  FETCH_SETS_SUCCESS = 'FETCH_SETS_SUCCESS',
  FETCH_NOTE = 'FETCH_NOTE',
  FETCH_NOTE_SUCCESS = 'FETCH_NOTE_SUCCESS';
export const ADD_SET = 'ADD_SET',
  ADD_SET_SUCCESS = 'ADD_SET_SUCCESS',
  ADD_NOTE = 'ADD_NOTE',
  ADD_NOTE_SUCCESS = 'ADD_NOTE_SUCCESS';
export const EDIT_SET = 'EDIT_SET',
  EDIT_SET_SUCCESS = 'EDIT_SET_SUCCESS',
  EDIT_NOTE = 'EDIT_NOTE',
  EDIT_NOTE_SUCCESS = 'EDIT_NOTE_SUCCESS';
export const REMOVE_SET = 'REMOVE_SET',
  REMOVE_SET_SUCCESS = 'REMOVE_SET_SUCCESS',
  REMOVE_NOTE = 'REMOVE_NOTE',
  REMOVE_NOTE_SUCCESS = 'REMOVE_NOTE_SUCCESS';
export const ERROR_NOTE = 'ERROR_NOTE';

const TIMEOUT = 5000;

export const errorNote = () => ({
  type: ERROR_NOTE
});

export const fetchSets = () => ({
  type: FETCH_SETS
});

export const fetchSetsSuccess = (sets) => ({
  type: FETCH_SETS_SUCCESS,
  sets
});

export const startSetsFetch = () => {
  return (dispatch, getState) => {
    dispatch(fetchSets());
    return new Promise((resolve, reject) => {
      const queryString = `query {
				setsAll {
					_id,
					title,
          description,
          color,
          notes
				}
			}`;
      axios
        .post(
          `${fixtures.SERVER_URI}/note`,
          { query: queryString, token: getState().auth.token },
          { timeout: TIMEOUT }
        )
        .then((result) => {
          const sets = result.data.data.setsAll.map((note) => {
            note.id = note._id;
            delete note._id;
            return note;
          });
          console.log(sets);
          if (sets) {
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
  set
});

export const addSet = () => ({
  type: ADD_SET
});

export const startAddSet = (setObj) => {
  return (dispatch, getState) => {
    dispatch(addSet());
    return new Promise((resolve, reject) => {
      const queryString = `mutation {
				createOneSet (record: { 
					title: "${setObj.title}",
          description: "${setObj.description}",
          color: "${setObj.color}"
				})
			}`;
      axios
        .post(
          `${fixtures.SERVER_URI}/note`,
          { query: queryString, token: getState().auth.token },
          { timeout: TIMEOUT }
        )
        .then((result) => {
          console.log(result, setObj);
          result = result.data.data.createOneSet;
          if (result && result.success) {
            setObj.id = result.setId;
            console.log('sets:', setObj);
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
  set
});

export const editSet = () => ({
  type: EDIT_SET
});

export const startEditSet = (setObj) => {
  return (dispatch, getState) => {
    dispatch(editSet());
    return new Promise((resolve, reject) => {
      const queryString = `mutation {
				updateOneSet (record: { 
					title: "${setObj.title}",
          description: "${setObj.description}",
          color: "${setObj.color}"
				},
        id: "${setObj.id}")
			}`;
      axios
        .post(
          `${fixtures.SERVER_URI}/note`,
          { query: queryString, token: getState().auth.token },
          { timeout: TIMEOUT }
        )
        .then((result) => {
          console.log(result, setObj);
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
  id
});

export const removeSet = () => ({
  type: REMOVE_SET
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
          { timeout: TIMEOUT }
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
  type: FETCH_NOTE
});

export const fetchNoteSuccess = (note) => ({
  type: FETCH_NOTE,
  note
});

export const startNoteFetch = (noteObj) => {
  return (dispatch, getState) => {
    dispatch(fetchNote());
    return new Promise((resolve, reject) => {
      const queryString = `query {
				notesOne (_id: "${noteObj.id}", pageno: ${noteObj.pageno})
			}`;
      axios
        .post(
          `${fixtures.SERVER_URI}/note`,
          { query: queryString, token: getState().auth.token },
          { timeout: TIMEOUT }
        )
        .then((result) => {
          const note = result.data.data.notesOne;
          console.log(result);
          if (note) {
            dispatch(fetchNoteSuccess(note));
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
  type: ADD_NOTE
});

export const addNoteSuccess = (note) => ({
  type: ADD_NOTE_SUCCESS,
  note
});

export const startAddNote = (noteObj) => {
  return (dispatch, getState) => {
    dispatch(addNote());
    return new Promise((resolve, reject) => {
      const queryString = `mutation {
				addNote (_id: "${noteObj.id}", file: "${noteObj.file}", filename: "${noteObj.filename}")
			}`;
      axios
        .post(
          `${fixtures.SERVER_URI}/note`,
          { query: queryString, token: getState().auth.token },
          { timeout: TIMEOUT }
        )
        .then((result) => {
          const note = result.data.data.addNote;
          console.log(result);
          if (note.success) {
            noteObj.id = note._id;
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
