import { ILocalStorageUser } from "../../utils/interfaces/IUser";
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

type AuthState = Record<string, any>;
export type AuthAction = {
  type: string;
  payload?: ILocalStorageUser;
};

const AuthReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case LOGIN_START:
      return {
        user: null,
        isFetching: true,
        error: false,
      };
    case LOGIN_SUCCESS:
      return {
        user: action.payload,
        isFetching: false,
        error: false,
      };
    case LOGIN_FAILURE:
      return {
        user: null,
        isFetching: false,
        error: true,
      };
    case REGISTER_START:
      return {
        user: null,
        isFetching: true,
        error: false,
      };
    case REGISTER_SUCCESS:
      return {
        user: action.payload,
        isFetching: false,
        error: false,
      };
    case REGISTER_FAILURE:
      return {
        user: null,
        isFetching: false,
        error: true,
      };
    case LOGOUT:
      return {
        user: null,
        isFetching: false,
        error: false,
      };
    case UPDATE_USER_START:
      return {
        user: null,
        isFetching: true,
        error: false,
      };
    case UPDATE_USER_SUCCESS:
      return {
        user: action.payload,
        isFetching: false,
        error: false,
      };
    case UPDATE_USER_FAILURE:
      return {
        user: null,
        isFetching: false,
        error: true,
      };
    default:
      return {
        ...state,
      };
  }
};

export default AuthReducer;
