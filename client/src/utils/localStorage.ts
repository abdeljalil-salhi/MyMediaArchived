import { isEmpty } from "./isEmpty";
import { ILocalStorageUser } from "./interfaces/IUser";
import { ILocalStorageGPS } from "./interfaces/IGPS";

export const updateLocalStorage = (
  element: string,
  data: ILocalStorageUser | ILocalStorageGPS
) => {
  // Check if the data in the local storage exists
  // If it does, remove it
  if (!isEmpty(localStorage.getItem(element))) localStorage.removeItem(element);
  // Add the data to the local storage
  localStorage.setItem(element, JSON.stringify(data));
};
