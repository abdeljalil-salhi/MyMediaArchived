import socketIO from "socket.io-client";
import { createContext, FC, useContext, useEffect } from "react";

import { PC } from "../globals";
import { AuthContext } from "./auth.context";

interface SocketContextProps {
  children: any;
}

export const SocketContext = createContext<null | any>(null);

const ws = socketIO(PC);

export const SocketContextProvider: FC<SocketContextProps> = ({ children }) => {
  const { user } = useContext(AuthContext);

  useEffect(() => {
    ws.emit("add-user", user._id);
  }, [user._id]);

  return (
    <SocketContext.Provider value={{ ws }}>{children}</SocketContext.Provider>
  );
};
