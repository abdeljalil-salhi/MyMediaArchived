import { SET_USERS } from "../constants/socket.constants";
import { SocketUser } from "../types/socket.types";

type SocketState = Record<string, any>;
type SocketAction = {
  type: string;
  payload: SocketUser[];
};

const SocketReducer = (state: SocketState, action: SocketAction) => {
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
