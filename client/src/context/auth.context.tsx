import { createContext, FC, ReactNode, useReducer } from "react";

import AuthReducer from "./reducers/auth.reducer";
import { IAuth } from "./types/auth.types";
import { authInitialState } from "./initialStates/auth.initialState";

interface AuthContextProps {
  children: ReactNode;
}

const INITIAL_STATE: IAuth = authInitialState;

export const AuthContext = createContext<IAuth>(INITIAL_STATE);

export const AuthContextProvider: FC<AuthContextProps> = ({ children }) => {
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
