import {
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  USER_LOADED,
  USERS_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOG_OUT,
  ACCOUNT_UPDATED
} from "../actions/types";

const initialState = {
  isAuthenticated: false,
  loading: true,
  user: null,
  users: []
};

export default function (state = initialState, action) {
  const { payload, type } = action;
  switch (type) {
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: payload
      };
    case USERS_LOADED:
      return {
        ...state,
        loading: false,
        users: payload
      };
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
    case ACCOUNT_UPDATED:
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false
      };
    case AUTH_ERROR:
    case REGISTER_FAILURE:
    case LOGIN_FAILURE:
    case LOG_OUT:
      return {
        ...state,
        isAuthenticated: false,
        loading: false,
        user: null
      };
    default:
      return {
        ...state
      };
  }
}
