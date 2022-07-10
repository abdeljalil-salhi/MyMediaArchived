import { Server, Socket } from "socket.io";

import { getUser } from "../functions";
import { TUser } from "../interfaces";
import { ISendMessageParams } from "./interfaces";

export const messagesHandler = (
  socket: Socket,
  io: Server<any, any, any, any>,
  users: TUser[]
) => {
  const sendMessage = ({
    senderId,
    receiverId,
    text,
    deleted,
  }: ISendMessageParams): void => {
    const sender = getUser({ userId: senderId, users });
    const receiver = getUser({ userId: receiverId, users });
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
