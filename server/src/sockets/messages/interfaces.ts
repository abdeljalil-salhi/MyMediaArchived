export interface IAddUserParams {
  userId: string;
  socketId: string;
  users: any[];
}

export interface IRemoveUserParams {
  socketId: string;
  users: any[];
}

export interface IGetUserParams {
  userId: string;
  users: any[];
}
