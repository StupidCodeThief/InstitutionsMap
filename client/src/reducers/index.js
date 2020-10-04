import { combineReducers } from "redux";

import auth from "./auth";
import places from "./places";
import uiTheme from "./uiTheme"

export default combineReducers({
  auth,
  places,
  uiTheme
});
