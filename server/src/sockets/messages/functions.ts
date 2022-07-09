import { IAddUserParams, IRemoveUserParams } from "./interfaces";

// Add a new user to the list of users
export const addUser = ({ userId, socketId, users }: IAddUserParams) => {
  !users.some((user) => user.userId === userId) &&
    users.push({ userId, socketId });
};

// Remove a user from the list of users
export const removeUser = ({ socketId, users }: IRemoveUserParams) => {
  users = users.filter((user) => user.socketId !== socketId);
};
