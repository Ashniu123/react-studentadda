import {
  FETCH_NOTE,
  FETCH_NOTE_SUCCESS,
  FETCH_SETS,
  FETCH_SETS_SUCCESS,
  ADD_NOTE,
  ADD_NOTE_SUCCESS,
  ADD_SET,
  ADD_SET_SUCCESS,
  EDIT_NOTE,
  EDIT_NOTE_SUCCESS,
  EDIT_SET,
  EDIT_SET_SUCCESS,
  REMOVE_NOTE,
  REMOVE_NOTE_SUCCESS,
  REMOVE_SET,
  REMOVE_SET_SUCCESS,
  ERROR_NOTE,
} from "../actions/note";

const defaultNoteState = { isFetching: false, sets: [] };

export default (state = defaultNoteState, action) => {
  switch (action.type) {
    case FETCH_SETS: {
      return {
        ...state,
        isFetching: true,
      };
    }
    case FETCH_SETS_SUCCESS: {
      return {
        ...state,
        sets: action.sets.map((set) => {
          set.notes = [];
          return set;
        }),
        isFetching: false,
      };
    }
    case FETCH_NOTE: {
      return state;
    }
    case FETCH_NOTE_SUCCESS: {
      state.sets.map((set) => {
        if (action.note.note && set.id === action.note.id) {
          set.notes[action.note.pageno] = action.note.note;
        }
        return set;
      });
      console.log(state.sets);
      return {
        ...state,
        isFetching: false,
      };
    }
    case ADD_SET: {
      return state;
    }
    case ADD_SET_SUCCESS: {
      const setsUpdate = JSON.parse(JSON.stringify(state.sets));
      setsUpdate.push(action.set);
      console.log(setsUpdate);
      return {
        ...state,
        sets: setsUpdate,
        isFetching: false,
      };
    }
    case ADD_NOTE: {
      return state;
    }
    case ADD_NOTE_SUCCESS: {
      console.log(state.sets);
      state.sets.map((set) => {
        if (action.note.note && set.id === action.note.id) {
          set.notes[action.note.pageno] = action.note.note;
        }
        return set;
      });
      console.log(state.sets);
      return {
        ...state,
        isFetching: false,
      };
    }
    case EDIT_SET: {
      return state;
    }
    case EDIT_SET_SUCCESS: {
      let newSets = JSON.parse(JSON.stringify(state.sets));
      newSets = newSets.map((set) => {
        if (set.id === action.set.id) {
          set.title = action.set.title;
          set.description = action.set.description;
          set.color = action.set.color;
        }
        return set;
      });
      return {
        ...state,
        sets: newSets,
        isFetching: false,
      };
    }
    case EDIT_NOTE: {
      return state;
    }
    case EDIT_NOTE_SUCCESS: {
      return {
        ...state,
        isFetching: false,
      };
    }
    case REMOVE_SET: {
      return state;
    }
    case REMOVE_SET_SUCCESS: {
      let newSets = JSON.parse(JSON.stringify(state.sets));
      newSets = newSets.filter((set) => set.id !== action.id);
      return {
        ...state,
        sets: newSets,
        isFetching: false,
      };
    }
    case REMOVE_NOTE: {
      return state;
    }
    case REMOVE_NOTE_SUCCESS: {
      const newSets = state.sets.filter((set) => {
        if (set.id === action.note.id) {
          set.notes.splice(action.note.pageno, 1);
        }
        return set;
      });
      return {
        ...state,
        sets: newSets,
        isFetching: false,
      };
    }
    case ERROR_NOTE: {
      return {
        ...state,
        isFetching: false,
      };
    }
    default:
      return state;
  }
};
