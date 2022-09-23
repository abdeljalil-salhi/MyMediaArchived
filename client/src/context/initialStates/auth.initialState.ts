import { USER } from "../../globals";
import { ILocalStorageUser } from "../../utils/interfaces/IUser";
import { getLocalStorage } from "../../utils/localStorage";
import { AuthAction } from "../reducers/auth.reducer";
import { IAuth } from "../types/auth.types";

export const authInitialState: IAuth = {
  user: (getLocalStorage(USER) as ILocalStorageUser) || null,
  isFetching: false,
  error: false,
  dispatch: (_: AuthAction) => {},
};
