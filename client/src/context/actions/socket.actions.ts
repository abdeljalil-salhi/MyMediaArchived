import { SET_USERS } from "../constants/socket.constants";
import { SocketUser } from "../types/socket.types";

export const setUsers = (users: SocketUser[]) => ({
  type: SET_USERS,
  payload: users,
});
