import { Server as HttpServer } from "http";
import { Server, Socket } from "socket.io";

import logger from "../utils/logger";
import { CLIENT_URL, PORT } from "../constants";
import { messagesHandler } from "./messages";

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

    // Socket.io Websocket protocol events
    io.on("connection", (socket: Socket) => {
      messagesHandler(socket, io);
    });
  } catch (err) {
    logger.error(`[!] FAILED >> WebSockets >> ${PORT}/http >> ${err}`);
  }
};
