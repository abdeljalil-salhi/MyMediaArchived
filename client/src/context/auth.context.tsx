import { createContext, FC, ReactNode, useReducer } from "react";

import { USER } from "../globals";
import AuthReducer from "./reducers/auth.reducer";

interface RoomContextProps {
  children: ReactNode;
}

const INITIAL_STATE: any = {
  user: JSON.parse(localStorage.getItem(USER) as string) || null,
  isFetching: false,
  error: false,
};

export const AuthContext = createContext<null | any>(INITIAL_STATE);

export const AuthContextProvider: FC<RoomContextProps> = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
