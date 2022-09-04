import { GetProfile } from "../../generated/types/GetProfile";

// Types for getProfileSlice.ts
export interface IGetProfileState {
  profile: GetProfile["getProfile"] | null;
}
