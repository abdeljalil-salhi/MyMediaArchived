import { Server as HttpServer } from "http";
import { Server, Socket } from "socket.io";

import logger from "../utils/logger";
import { CLIENT_URL, PORT } from "../constants";
import { messagesHandler } from "./messages";
import {
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData,
  SocketUser,
} from "./types";
import { IAddUserParams, IRemoveUserParams } from "./types";

export const connectToSocketsServer = (server: HttpServer) => {
  try {
    // Socket.io Websocket protocol
    const io = new Server<
      ClientToServerEvents,
      ServerToClientEvents,
      InterServerEvents,
      SocketData
    >(server, {
      cors: {
        origin: CLIENT_URL,
        methods: ["GET", "POST"],
      },
    });

    // Websocket connection established
    logger.info(`[+] CONNECTED >> WebSockets >> ${PORT}/http`);

    // Initialize the list of users
    let users: SocketUser[] = [];

    // Add a new user to the list of users
    const addUser = ({ userId, socketId }: IAddUserParams): void => {
      !users.some((user) => user.userId === userId) &&
        users.push({ userId, socketId });
    };

    // Remove a user from the list of users
    const removeUser = ({ socketId }: IRemoveUserParams): void => {
      users = users.filter((user) => user.socketId !== socketId);
    };

    // Socket.io Websocket protocol events
    io.on("connection", (socket: Socket) => {
      // Connected - Add the user to the list of users
      socket.on("add-user", (userId) => {
        addUser({ userId, socketId: socket.id });
        io.emit("get-users", users);
      });

      // Messages - Handle the messages events
      messagesHandler(socket, io, users);

      // Disconnected - Remove the user from the list of users
      socket.on("disconnect", () => {
        removeUser({ socketId: socket.id });
        io.emit("get-users", users);
      });
    });
  } catch (err: unknown) {
    logger.error(`[!] FAILED >> WebSockets >> ${PORT}/http >> ${err}`);
  }
};
