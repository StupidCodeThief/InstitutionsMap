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

export const register = (userCredential) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  const body = JSON.stringify(userCredential);

  try {
    await axios.post("/api/auth/register", body, config);

    dispatch({
      type: REGISTER_SUCCESS
    });

    dispatch(loadUser());
  } catch (error) {
    const errors = error.response.data;

    if (errors) {
      dispatch(setAlert(errors.message, "error"));
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
    await axios.post(url, body, config);

    dispatch({
      type: LOGIN_SUCCESS
    });

    dispatch(loadUser());
  } catch (error) {
    const errors = error.response.data;

    if (errors) {
      dispatch(setAlert(errors.message, "error"));
    }

    dispatch({
      type: LOGIN_FAILURE
    });
  }
};

export const getRecoveryPasswordLink = (email) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  const body = JSON.stringify(email);

  try {
    await axios.post("/api/auth/password", body, config);
  } catch (error) {
    const errors = error.response.data;

    if (errors) {
      dispatch(setAlert(errors.message, "error"));
    }
  }
};

export const resetPassword = (password, token) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  const body = JSON.stringify(password);

  try {
   await axios.post(`/api/auth//password/reset?token=${token}`, body, config);

    dispatch(setAlert("Success", "success"));
  } catch (error) {
    console.log(error)
    const errors = error.response.data;

    if (errors) {
      dispatch(setAlert(errors.data || errors.message, "error"));
    }
  }
};

export const logout = () => (dispatch) => {
  dispatch({
    type: LOG_OUT
  });
};
