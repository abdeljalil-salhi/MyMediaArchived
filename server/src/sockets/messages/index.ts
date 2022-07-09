import { Server, Socket } from "socket.io";

import { addUser, removeUser } from "./functions";

// Initialize the list of users
let users: any[] = [];

export const messagesHandler = (
  socket: Socket,
  io: Server<any, any, any, any>
) => {
  // Connected - Add the user to the list of users
  socket.on("addUser", (userId: string): void => {
    addUser({ userId, socketId: socket.id, users });
    io.emit("getUsers", users);
  });

  // Disconnected - Remove the user from the list of users
  socket.on("disconnect", (): void => {
    removeUser({ socketId: socket.id, users });
    io.emit("getUsers", users);
  });
};
