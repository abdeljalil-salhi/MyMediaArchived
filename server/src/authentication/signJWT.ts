import jwt from "jsonwebtoken";

import { privateKey } from "./keys";
import { User } from "../models/User.model";

export const signJWT = (
  user: User,
  options?: jwt.SignOptions | undefined
): string => {
  try {
    const token = jwt.sign(
      {
        id: user._id,
        isAdmin: user.isAdmin,
        isSeller: user.isSeller,
      },
      privateKey,
      {
        ...(options && options),
        algorithm: "RS256",
      }
    );
    return token;
  } catch (err) {
    return "";
  }
};
