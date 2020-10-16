import axios from "axios";

import {
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOG_OUT,
  ACCOUNT_UPDATED
} from "./types";

import { notification } from "antd";

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

    notification.success({ message: "Registration was successful" });

    dispatch(loadUser());
  } catch (error) {
    const errors = error.response.data;

    notification.warning({ message: errors.message });

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

    notification.warning({ message: errors.message });

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

    notification.warning({ message: errors.data });
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

    notification.success({ message: "Password changed!" });
  } catch (error) {
    console.log(error);
    const errors = error.response.data;

    notification.warning({ message: errors.message });
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

    notification.success({ message: `You ${type} account successfully added!` });

    dispatch(loadUser());
  } catch (error) {
    const errors = error.response.data;

    notification.warning({ message: errors.message });
  }
};

export const logout = () => async (dispatch) => {
  try {
    await axios.get("/api/auth/logout");

    notification.warning({ message: "Logout" });

    dispatch({
      type: LOG_OUT
    });
  } catch (error) {
    const errors = error.response.data;

    notification.warning({ message: errors.message });
  }
};
