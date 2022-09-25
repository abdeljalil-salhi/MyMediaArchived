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
  ISocket,
} from "./types/socket.types";
import { AuthContext } from "./auth.context";
import { isEmpty } from "../utils/isEmpty";
import { setUsers } from "./actions/socket.actions";
import { socketInitialState } from "./initialStates/socket.initialState";

interface SocketContextProps {
  children: ReactNode;
}

const INITIAL_STATE: ISocket = socketInitialState;

export const ws: Socket<ServerToClientEvents, ClientToServerEvents> = io(WS, {
  // Use WebSocket first, if available
  transports: ["websocket", "polling"],
  // Upgrade from HTTP to WebSocket
  upgrade: true,
  // Path to socket.io server
  path: "/socket.io/",
  // Add a timestamp to every request
  timestampRequests: true,
  // Connect automatically after initialization
  autoConnect: true,
});

ws.on("connect_error", () => {
  // If websocket transport is not supported,
  // revert to classic polling
  // HTTP long-polling: successive HTTP requests (POST for writing, GET for reading)
  ws.io.opts.transports = ["polling", "websocket"];
});

export const SocketContext = createContext<ISocket>(INITIAL_STATE);

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
