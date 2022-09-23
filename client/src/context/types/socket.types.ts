import { Dispatch } from "react";
import { Socket } from "socket.io-client";

import { SocketAction } from "../reducers/socket.reducer";

// Interfaces for the sockets events
export interface ServerToClientEvents {
  "get-users": (users: SocketUser[]) => void;
  "get-message": (message: {
    senderId: string;
    text: string;
    deleted: boolean;
  }) => void;
}

export interface ClientToServerEvents {
  "add-user": (userId: string) => void;
  "send-message": (message: {
    senderId: string;
    receiverId: string;
    text: string;
    deleted: boolean;
  }) => void;
}

export interface InterServerEvents {
  ping: () => void;
}

// Interfaces for the sockets data
export interface SocketData {
  sessionId: string;
}
export interface SocketUser {
  userId: string;
  socketId: string;
}

// Interfaces for the functions
export interface IAddUserParams {
  userId: string;
  socketId: string;
}

export interface IRemoveUserParams {
  socketId: string;
}

export interface IGetUserParams {
  userId: string;
}

// Interfaces for the contextAPI
export interface ISocket {
  // Socket.io client instance
  ws: Socket<ServerToClientEvents, ClientToServerEvents> | null;
  // List of users connected to the socket server (including the current user)
  users: SocketUser[];
  // Dispatch function to update the state
  dispatch: Dispatch<SocketAction>;
}
