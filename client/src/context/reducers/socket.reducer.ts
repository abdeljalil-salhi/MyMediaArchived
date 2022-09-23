import { SET_USERS } from "../constants/socket.constants";
import { SocketUser } from "../types/socket.types";

type SocketState = Record<string, any>;
export type SocketAction = {
  type: string;
  payload?: SocketUser[];
};

const SocketReducer = (
  state: SocketState,
  action: SocketAction
): SocketState => {
  switch (action.type) {
    case SET_USERS:
      return {
        users: action.payload,
      };
    default:
      return {
        ...state,
      };
  }
};

export default SocketReducer;
