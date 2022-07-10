import { Server as HttpServer } from "http";
import { Server, Socket } from "socket.io";

import logger from "../utils/logger";
import { CLIENT_URL, PORT } from "../constants";
import { messagesHandler } from "./messages";
import { addUser, removeUser } from "./functions";

export const connectToSocketsServer = (server: HttpServer) => {
  try {
    // Socket.io Websocket protocol
    const io: Server<any, any, any, any> = new Server(server, {
      cors: {
        origin: CLIENT_URL,
        methods: ["GET", "POST"],
      },
    });

    // Websocket connection established
    logger.info(`[+] CONNECTED >> WebSockets >> ${PORT}/http`);

    // Initialize the list of users
    let users: any[] = [];

    // Socket.io Websocket protocol events
    io.on("connection", (socket: Socket) => {
      // Connected - Add the user to the list of users
      socket.on("addUser", (userId: string): void => {
        addUser({ userId, socketId: socket.id, users });
        io.emit("getUsers", users);
      });

      // Messages - Handle the messages events
      messagesHandler(socket, io, users);

      // Disconnected - Remove the user from the list of users
      socket.on("disconnect", (): void => {
        removeUser({ socketId: socket.id, users });
        io.emit("getUsers", users);
      });
    });
  } catch (err) {
    logger.error(`[!] FAILED >> WebSockets >> ${PORT}/http >> ${err}`);
  }
};
