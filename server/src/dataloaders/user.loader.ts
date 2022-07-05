import DataLoader from "dataloader";

import { User, UserModel } from "../models/User.model";

type BatchUser = (ids: readonly string[]) => Promise<User[]>;

const batchUsers: BatchUser = async (ids) => {
  const users: User[] = await UserModel.find({
    _id: {
      $in: ids,
    },
  });

  const userMap: Record<string, User> = {};

  users.forEach((user) => {
    userMap[user._id] = user;
  });

  const resolvedUsers: User[] = ids.map((id) => userMap[id]);

  return resolvedUsers;
};

export const userLoader = () => new DataLoader<any, User>(batchUsers);
