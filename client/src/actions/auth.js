import axios from "axios";

import { setAlert } from "./alert";
import {
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOG_OUT
} from "./types";

export const loadUser = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/auth/login");

    dispatch({
      type: USER_LOADED,
      payload: res.data
    });
  } catch (error) {
    dispatch({
      type: AUTH_ERROR
    });
  }
};

export const register = ({ name, email, password }) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  const body = JSON.stringify({ name, email, password });

  try {
    const res = await axios.post("/api/auth/register", body, config);

    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data
    });

    dispatch(loadUser());
  } catch (error) {
    const errors = error.response.data.errors;

    if (errors) {
      errors.forEach((error) => {
        dispatch(setAlert(error.msg, "danger"));
      });
    }

    dispatch({
      type: REGISTER_FAILURE
    });
  }
};

export const login = (userCredential, type) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  let url = "";

  switch (type) {
    case "google":
      url = "/api/auth/google";
      break;
    case "facebook":
      url = "/api/auth/facebook";
      break;
    default:
      url = "/api/auth/login";
      break;
  }

  const body = JSON.stringify(userCredential);

  try {
    const res = await axios.post(url, body, config);

    dispatch({
      type: LOGIN_SUCCESS
    });

    console.log(res.data);
    dispatch(loadUser());
  } catch (error) {
    console.log(error);
    const errors = error.response.data.errors;

    if (errors) {
      errors.forEach((error) => {
        dispatch(setAlert(error.msg, "danger"));
      });
    }

    dispatch({
      type: LOGIN_FAILURE
    });
  }
};

export const logout = () => (dispatch) => {
  dispatch({
    type: LOG_OUT
  });
};
