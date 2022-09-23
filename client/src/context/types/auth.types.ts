import { Dispatch } from "react";

import { AuthAction } from "../reducers/auth.reducer";
import { ILocalStorageUser } from "../../utils/interfaces/IUser";

export interface IAuth {
  // User data from the local storage (if any)
  user: ILocalStorageUser;
  // If the user is being fetched from the server
  isFetching: boolean;
  // If there is an error fetching the user
  error: boolean;
  // Dispatch function to update the state
  dispatch: Dispatch<AuthAction>;
}
