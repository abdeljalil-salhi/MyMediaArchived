import jwt from "jsonwebtoken";

import { privateKey } from "./keys";
import { MyContext, MyUserContext } from "../types";

export const verifyToken = (
  context: MyContext,
  token: string,
  options?: jwt.SignOptions | undefined
): void => {
  const results = jwt.verify(token, privateKey, {
    ...(options && options),
    algorithms: ["RS256"],
  });
  if (results) context.user = results as MyUserContext;
};
