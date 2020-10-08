import { UI_THEME_CHANGED } from "../actions/types";

const initialState = {
  darckTheme: false
};

export default function (state = initialState, action) {
  const { type } = action;
  switch (type) {
    case UI_THEME_CHANGED:
      localStorage.setItem("darckTheme", !state.darckTheme);
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
