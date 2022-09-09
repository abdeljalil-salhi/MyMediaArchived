import {
  GetProfile,
  GetProfile_getProfile,
} from "../../generated/types/GetProfile";

export type TProfile = GetProfile_getProfile;

export interface IProfileState {
  data: GetProfile["getProfile"] | null;
}

export interface IProfileAction {
  type: string;
  payload: TProfile;
}
