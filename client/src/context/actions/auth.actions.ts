import {
  LOGIN_START,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  REGISTER_START,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  LOGOUT,
} from "../constants/auth.constants";

export const loginStart = () => ({
  type: LOGIN_START,
});

export const loginSuccess = (user: string | null) => ({
  type: LOGIN_SUCCESS,
  payload: user,
});

export const loginFailure = () => ({
  type: LOGIN_FAILURE,
});

export const registerStart = () => ({
  type: REGISTER_START,
});

export const registerSuccess = (user: string | null) => ({
  type: REGISTER_SUCCESS,
  payload: user,
});

export const registerFailure = () => ({
  type: REGISTER_FAILURE,
});

export const logout = () => ({
  type: LOGOUT,
});
