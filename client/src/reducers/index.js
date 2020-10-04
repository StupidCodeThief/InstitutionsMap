import { combineReducers } from "redux";

import auth from "./auth";
import places from "./places";

export default combineReducers({
  auth,
  places
});
