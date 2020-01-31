import { combineReducers } from "redux";

import AuthReducer from "./reducer_auth";
import RegisterReducer from "./reducer_register";
import CalendarReducer from "./reducer_calendar";
import NotesReducer from "./reducer_notes";

const rootReducer = combineReducers({
  auth: AuthReducer,
  register: RegisterReducer,
  calendar: CalendarReducer,
  notes: NotesReducer
});

export default rootReducer;
