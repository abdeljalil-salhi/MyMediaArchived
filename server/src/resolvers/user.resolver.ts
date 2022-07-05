/*********************
 USER RESOLVER
 - register()
 - login()
 - getAllUsers()
 **********************/

import argon2 from "argon2";
import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";

import { MyContext } from "../types";
import { User, UserModel } from "../models/User.model";
import { UserResponse, UsersResponse } from "./res/user.res";
import { RegisterInput } from "../models/inputs/Register.input";
import { registerValidation } from "../validations/register.validation";
import { signJWT } from "../authentication/signJwt";

const unhandledError = (err: Error) => {
  return [
    {
      field: "error",
      message: `Please report this to the support: ${err}`,
    },
  ];
};

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
          errors: unhandledError(err),
          user: null,
        };
      }
    }
  }

  @Mutation(() => UserResponse)
  public async login(
    @Arg("usernameOrEmail") usernameOrEmail: string,
    @Arg("password") password: string,
    @Ctx() context: MyContext
  ): Promise<UserResponse> {
    try {
      const user = await UserModel.findOne(
        usernameOrEmail.includes("@")
          ? { email: usernameOrEmail }
          : { username: usernameOrEmail }
      ).lean();

      if (!user)
        return {
          errors: [
            {
              field: "usernameOrEmail",
              message: "Username or email don't exist",
            },
          ],
          user: null,
        };

      const valid = await argon2.verify(user.password, password);

      if (!valid)
        return {
          errors: [
            {
              field: "password",
              message: "Incorrect password",
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

      return {
        errors: [],
        user,
      };
    } catch (err) {
      return {
        errors: unhandledError(err),
        user: null,
      };
    }
  }

  @Query(() => UsersResponse)
  public async getAllUsers(): Promise<UsersResponse> {
    try {
      const users = await UserModel.find({});
      return {
        errors: [],
        users,
      };
    } catch (err) {
      return {
        errors: unhandledError(err),
        users: [],
      };
    }
  }
}
