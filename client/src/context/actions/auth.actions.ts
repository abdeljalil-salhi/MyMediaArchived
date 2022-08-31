import {
  LOGIN_START,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  REGISTER_START,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  LOGOUT,
  UPDATE_USER_START,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAILURE,
} from "../constants/auth.constants";

export const loginStart = () => ({
  type: LOGIN_START,
});

export const loginSuccess = (user: any) => ({
  type: LOGIN_SUCCESS,
  payload: user,
});

export const loginFailure = () => ({
  type: LOGIN_FAILURE,
});

export const registerStart = () => ({
  type: REGISTER_START,
});

export const registerSuccess = (user: any) => ({
  type: REGISTER_SUCCESS,
  payload: user,
});

export const registerFailure = () => ({
  type: REGISTER_FAILURE,
});

export const logout = () => ({
  type: LOGOUT,
});

export const updateUserStart = () => ({
  type: UPDATE_USER_START,
});

export const updateUserSuccess = (user: any) => ({
  type: UPDATE_USER_SUCCESS,
  payload: user,
});

export const updateUserFailure = () => ({
  type: UPDATE_USER_FAILURE,
});
