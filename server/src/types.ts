import { Request, Response } from "express";
import { Session, SessionData } from "express-session";

import { userLoader } from "./dataloaders/user.loader";
import { postReactLoader } from "./dataloaders/postReact.loader";

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
  postReactLoader: ReturnType<typeof postReactLoader>;
};

export type MyUserContext = {
  id: string;
  isAdmin: boolean;
  isSeller: boolean;
};
