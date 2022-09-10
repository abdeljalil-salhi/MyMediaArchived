import { USER } from "../globals";
import { isEmpty } from "./isEmpty";

export interface ILocalStorageUser {
  _id: string;
  username: string;
  accessToken: string | null;
}

export const updateLocalStorageUser = (user: ILocalStorageUser) => {
  // Check if the user in the local storage exists
  // If it does, remove it
  if (!isEmpty(localStorage.getItem(USER))) {
    localStorage.removeItem(USER);
  }
  // Add the user to the local storage
  localStorage.setItem(USER, JSON.stringify(user));
};
