import socketIO from "socket.io-client";
import { createContext, FC } from "react";

import { PC } from "../globals";

interface SocketContextProps {
  children: any;
}

export const SocketContext = createContext<null | any>(null);

const ws = socketIO(PC);

export const SocketContextProvider: FC<SocketContextProps> = ({ children }) => {
  return (
    <SocketContext.Provider value={{ ws }}>{children}</SocketContext.Provider>
  );
};
