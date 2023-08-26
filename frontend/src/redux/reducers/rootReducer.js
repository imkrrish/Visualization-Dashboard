// ** Redux Imports
import { combineReducers } from "redux";

// ** Reducers Imports
import dashboard from "./dashboard";

const rootReducer = combineReducers({
  dashboard,
});

export default rootReducer;
