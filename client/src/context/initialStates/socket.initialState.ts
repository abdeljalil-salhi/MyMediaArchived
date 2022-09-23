import { SocketAction } from "../reducers/socket.reducer";
import { ISocket } from "../types/socket.types";

export const socketInitialState: ISocket = {
  ws: null,
  users: [],
  dispatch: (_: SocketAction) => {},
};
