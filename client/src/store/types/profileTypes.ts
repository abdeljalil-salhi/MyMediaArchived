import {
  FollowUser,
  FollowUser_followUser,
} from "../../generated/types/FollowUser";
import {
  UnfollowUser,
  UnfollowUser_unfollowUser,
} from "../../generated/types/UnfollowUser";
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
import {
  UpdateTags,
  UpdateTags_updateTags,
} from "../../generated/types/UpdateTags";

// Type of the action that will be dispatched to the reducer
export type TProfile =
  | GetProfile_getProfile
  | UpdateUser_updateUser
  | UpdateTags_updateTags
  | FollowUser_followUser
  | UnfollowUser_unfollowUser
  | Login_login
  | Register_register;

// Interface of the profile state in the store
export interface IProfileState {
  data:
    | GetProfile["getProfile"]
    | UpdateUser["updateUser"]
    | UpdateTags["updateTags"]
    | FollowUser["followUser"]
    | UnfollowUser["unfollowUser"]
    | Login["login"]
    | Register["register"];
}

// Interfaces for the profile actions
export interface ISetProfileAction {
  type: string;
  payload: TProfile;
}
