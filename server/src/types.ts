import { Request, Response } from "express";
import { Session, SessionData } from "express-session";

export type MyContext = {
  req: Request & {
    session: Session & Partial<SessionData> & { userId: string };
  };
  res: Response;
  authentication: string;
  user: MyUserContext;
};

export type MyUserContext = {
  id: string;
  isAdmin: boolean;
  isSeller: boolean;
};
