import { UI_THEME_CHANGED } from "./types";

import { notification } from "antd";

export const uiTheme = () => async (dispatch) => {
  dispatch({ type: UI_THEME_CHANGED });

  console.log(typeof localStorage.getItem("darckTheme"));

  notification.success({ message: "Theme changed" });
};
