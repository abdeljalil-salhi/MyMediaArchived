import {
  GetProfile,
  GetProfile_getProfile,
} from "../../generated/types/GetProfile";
import { Login, Login_login } from "../../generated/types/Login";
import { Register, Register_register } from "../../generated/types/Register";
import {
  UpdateUser,
  UpdateUser_updateUser,
} from "../../generated/types/UpdateUser";

export type TProfile =
  | GetProfile_getProfile
  | UpdateUser_updateUser
  | Login_login
  | Register_register;

export interface IProfileState {
  data:
    | GetProfile["getProfile"]
    | UpdateUser["updateUser"]
    | Login["login"]
    | Register["register"]
    | null;
}

export interface IProfileAction {
  type: string;
  payload: TProfile;
}
