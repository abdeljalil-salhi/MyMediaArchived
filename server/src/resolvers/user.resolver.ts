/*********************
 USER RESOLVER
 - register()
 **********************/

import { Arg, Ctx, Mutation, Resolver } from "type-graphql";

import { MyContext } from "../types";
import { User, UserModel } from "../models/User.model";
import { UserResponse } from "./res/user.res";
import { RegisterInput } from "../models/inputs/Register.input";
import { registerValidation } from "../validations/register.validation";
import { signJWT } from "../authentication/signJwt";

@Resolver(User)
export class UserResolver {
  @Mutation(() => UserResponse)
  public async register(
    @Arg("input") input: RegisterInput,
    @Ctx() context: MyContext
  ): Promise<UserResponse> {
    try {
      const errors = registerValidation(input);
      if (errors)
        return {
          errors,
          user: null,
        };

      const user = await UserModel.create(input);

      if (!user)
        return {
          errors: [
            {
              field: "user",
              message: "User cannot be registered",
            },
          ],
          user: null,
        };

      const accessToken = signJWT(user);

      user.accessToken = accessToken;

      context.user = {
        id: user._id,
        isAdmin: user.isAdmin,
        isSeller: user.isSeller,
      };

      context.req.session.userId = user._id;

      return {
        errors: [],
        user,
      };
    } catch (err) {
      if (err.message.includes("duplicate")) {
        return {
          errors: [
            {
              field: "usernameOrEmail",
              message: "Username or email already exist",
            },
          ],
          user: null,
        };
      } else {
        return {
          errors: [
            {
              field: "error",
              message: `Please report this to the support: ${err}`,
            },
          ],
          user: null,
        };
      }
    }
  }
}
