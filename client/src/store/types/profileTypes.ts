import { IUser } from "./global/userTypes";

export type IProfileState = IUser | null;

export interface IProfileAction {
  type: string;
  payload: IProfileState;
}
