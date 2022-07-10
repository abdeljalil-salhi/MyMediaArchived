export interface IAddUserParams {
  userId: string;
  socketId: string;
  users: TUser[];
}

export interface IRemoveUserParams {
  socketId: string;
  users: TUser[];
}

export interface IGetUserParams {
  userId: string;
  users: TUser[];
}

export type TUser = {
  userId: string;
  socketId: string;
};
