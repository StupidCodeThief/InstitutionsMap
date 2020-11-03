import axios from "axios";

import {
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOG_OUT,
  ACCOUNT_UPDATED,
  USER_INFO_LOADED,
  USER_INFO_ERROR
} from "./types";

import { showNotification } from "../utils/notifications/notification";

export const loadUser = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/user/get-user");

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

export const getUserById = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/user/get-user/${id}`);

    dispatch({
      type: USER_INFO_LOADED,
      payload: res.data
    });
  } catch (error) {
    dispatch({
      type: USER_INFO_ERROR
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

    showNotification("Succesfully registered!", "success");

    dispatch(loadUser());
  } catch (error) {
    const errors = error.response.data;

    showNotification(errors.message, "warning");

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

    showNotification(errors.message, "warning");

    dispatch({
      type: LOGIN_FAILURE
    });
  }
};

export const getRecoveryPasswordLink = async (email) => {
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

    showNotification(errors.data, "warning");
  }
};

export const resetPassword = async (password, token) => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  const body = JSON.stringify(password);

  try {
    await axios.post(`/api/auth/password/reset?token=${token}`, body, config);

    showNotification("Password changed!", "success");
  } catch (error) {
    console.log(error);
    const errors = error.response.data;

    showNotification(errors.message, "warning");
  }
};

export const addLoginType = (userData, type) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  let url = "";

  switch (type) {
    case "google":
      url = "/api/auth/user/addGoogle";
      break;
    case "facebook":
      url = "/api/auth/user/addFacebook";
      break;
    default:
      url = "/api/auth/user/addEmail";
      break;
  }

  const body = JSON.stringify(userData);

  try {
    await axios.post(url, body, config);

    dispatch({
      type: ACCOUNT_UPDATED
    });

    showNotification(`Your ${type} account successfully added!`, "success");

    dispatch(loadUser());
  } catch (error) {
    const errors = error.response.data;

    showNotification(errors.message, "warning");
  }
};

export const logout = () => async (dispatch) => {
  try {
    await axios.get("/api/auth/logout");

    showNotification("Logout", "success");

    dispatch({
      type: LOG_OUT
    });
  } catch (error) {
    const errors = error.response.data;

    showNotification(errors.message, "warning");
  }
};
