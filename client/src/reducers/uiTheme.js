import { UI_THEME_CHANGED } from "../actions/types";

const initialState = {
  darckTheme: localStorage.getItem("uiTheme")
};

export default function (state = initialState, action) {
  const { payload, type } = action;
  switch (type) {
    case UI_THEME_CHANGED:
      localStorage.setItem("uiTheme", !state.darckTheme);
      return {
        ...state,
        darckTheme: !state.darckTheme
      };
    default:
      return {
        ...state
      };
  }
}
