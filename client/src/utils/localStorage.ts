import { isEmpty } from "./isEmpty";
import { ILocalStorageUser } from "./interfaces/IUser";
import { ILocalStorageGPS } from "./interfaces/IGPS";
import { ILocalStoragePreferences } from "./interfaces/IPreferences";

type ILocalStorage =
  | ILocalStorageUser
  | ILocalStorageGPS
  | ILocalStoragePreferences;

export const updateLocalStorage = (element: string, data: ILocalStorage) => {
  // Check if the data in the local storage exists
  // If it does, remove it
  if (!isEmpty(localStorage.getItem(element))) localStorage.removeItem(element);
  // Add the data to the local storage
  localStorage.setItem(element, JSON.stringify(data));
};

export const getLocalStorage = (element: string) => {
  // Check if the data in the local storage exists
  // If it does, return it
  if (!isEmpty(localStorage.getItem(element)))
    return JSON.parse(localStorage.getItem(element) as string) as ILocalStorage;
  // If it doesn't, return null
  return null;
};
