import { io, Socket } from "socket.io-client";
import {
  FC,
  createContext,
  useEffect,
  useContext,
  ReactNode,
  useReducer,
} from "react";

import { WS } from "../globals";
import SocketReducer from "./reducers/socket.reducer";
import {
  ServerToClientEvents,
  ClientToServerEvents,
  SocketUser,
} from "./types/socket.types";
import { AuthContext } from "./auth.context";
import { isEmpty } from "../utils/isEmpty";
import { setUsers } from "./actions/socket.actions";

interface SocketContextProps {
  children: ReactNode;
}

const INITIAL_STATE: any = {
  users: [],
};

const ws: Socket<ServerToClientEvents, ClientToServerEvents> = io(WS);

export const SocketContext = createContext<null | any>(INITIAL_STATE);

export const SocketContextProvider: FC<SocketContextProps> = ({ children }) => {
  const [state, dispatch] = useReducer(SocketReducer, INITIAL_STATE);

  // The selector to get user informations from the context (ContextAPI)
  const { user } = useContext(AuthContext);

  useEffect(() => {
    ws.on("get-users", (users: SocketUser[]) => {
      dispatch(setUsers(users));
    });
  }, []);

  // When the user is logged in, we add him to the list of connected users
  useEffect(() => {
    if (!isEmpty(user)) ws.emit("add-user", user._id);
  }, [user]);

  return (
    <SocketContext.Provider
      value={{
        ws,
        users: state.users,
        dispatch,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};
