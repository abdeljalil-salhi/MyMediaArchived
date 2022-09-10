import {
  GetProfile,
  GetProfile_getProfile,
} from "../../generated/types/GetProfile";
import {
  UpdateUser,
  UpdateUser_updateUser,
} from "../../generated/types/UpdateUser";

export type TProfile = GetProfile_getProfile | UpdateUser_updateUser;

export interface IProfileState {
  data: GetProfile["getProfile"] | UpdateUser["updateUser"] | null;
}

export interface IProfileAction {
  type: string;
  payload: TProfile;
}
