import { Request, Response } from "express";
import { Session, SessionData } from "express-session";

import { userLoader } from "./dataloaders/user.loader";

export type MyContext = {
  req: Request & {
    session: Session &
      Partial<SessionData> & {
        userId: string;
      };
  };
  res: Response;
  authentication: string;
  user: MyUserContext;
  userLoader: ReturnType<typeof userLoader>;
};

export type MyUserContext = {
  id: string;
  isAdmin: boolean;
  isSeller: boolean;
};
