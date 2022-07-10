import {
  IAddUserParams,
  IGetUserParams,
  IRemoveUserParams,
  TUser,
} from "./interfaces";

// Add a new user to the list of users
export const addUser = ({ userId, socketId, users }: IAddUserParams): void => {
  !users.some((user) => user.userId === userId) &&
    users.push({ userId, socketId });
};

// Remove a user from the list of users
export const removeUser = ({ socketId, users }: IRemoveUserParams): void => {
  users = users.filter((user) => user.socketId !== socketId);
};

// Get a user from the list of users
export const getUser = ({
  userId,
  users,
}: IGetUserParams): TUser | undefined => {
  return users.find((user) => user.userId === userId);
};
