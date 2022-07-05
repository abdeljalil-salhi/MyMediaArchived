import { MiddlewareFn } from "type-graphql";

import { MyContext } from "../types";
import { verifyToken } from "../authentication/verifyToken";

export const isAuth: MiddlewareFn<MyContext> = (
  { context },
  next: () => any
): any => {
  if (context.authentication) {
    const token = context.authentication.split(" ")[1];

    try {
      verifyToken(context, token);
    } catch (err) {
      return {
        errors: [
          {
            field: "token",
            message: "Token not valid",
          },
        ],
      };
    }

    return next();
  } else {
    return {
      errors: [
        {
          field: "authentication",
          message: "Not authenticated",
        },
      ],
    };
  }
};
