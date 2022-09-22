import { Server, Socket } from "socket.io";

import {
  ClientToServerEvents,
  IGetUserParams,
  InterServerEvents,
  ServerToClientEvents,
  SocketData,
  SocketUser,
} from "../types";
import { ISendMessageParams } from "./interfaces";

export const messagesHandler = (
  socket: Socket,
  io: Server<
    ClientToServerEvents,
    ServerToClientEvents,
    InterServerEvents,
    SocketData
  >,
  users: SocketUser[]
) => {
  // Get a user from the list of users
  const getUser = ({ userId }: IGetUserParams): SocketUser | undefined => {
    return users.find((user) => user.userId === userId);
  };

  const sendMessage = ({
    senderId,
    receiverId,
    text,
    deleted,
  }: ISendMessageParams): void => {
    const sender = getUser({ userId: senderId });
    const receiver = getUser({ userId: receiverId });

    if (sender && receiver) {
      io.to(receiver.socketId).emit("get-message", {
        senderId,
        text,
        deleted,
      });
    }
  };

  // Send/Get message
  socket.on("send-message", sendMessage);
};
