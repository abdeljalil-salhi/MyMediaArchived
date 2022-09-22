/*********************
 USER RESOLVER
 - register()
 - login()
 - forgotPassword()
 - changePassword()
 - getAllUsers()
 - getUser()
 - getProfile()
 - getFriends()
 - updateUser()
 - deleteUser()
 - followUser()
 - addCloseFriend()
 - removeCloseFriend()
 - updateTags()
 - updateSocials()
 **********************/

import argon2 from "argon2";
import {
  Arg,
  Ctx,
  FieldResolver,
  Mutation,
  Query,
  Resolver,
  Root,
  UseMiddleware,
} from "type-graphql";
import { v4 } from "uuid";

import { MyContext } from "../types";
import { User, UserModel } from "../models/User.model";
import { UserResponse, UsersResponse } from "./res/user.res";
import { RegisterInput } from "../models/inputs/Register.input";
import { registerValidation } from "../validations/register.validation";
import { updateUserValidation } from "../validations/updateUser.validation";
import { signJWT } from "../authentication/signJwt";
import { isValidID } from "../utils/isValidID";
import { isAuth } from "../middlewares/isAuth";
import {
  UpdateSocialsInput,
  UpdateTagsInput,
  UpdateUserInput,
} from "../models/inputs/UpdateUser.input";
import { UserArchive, UserArchiveModel } from "../models/User.archive.model";
import { DeleteUserResponse } from "./res/delete.res";
import { TokenResponse } from "./res/token.res";
import { ForgotPasswordTokenModel } from "../models/ForgotPasswordToken.model";
import { sendEmail } from "../utils/sendEmail";
import { resetPasswordHTML } from "../utils/assets/resetPasswordHTML";
import { unhandledError, unauthorizedError } from "./errors.resolvers";

@Resolver(User)
export class UserResolver {
  @FieldResolver(() => [User])
  public followersObj(@Root() user: User, @Ctx() context: MyContext) {
    return context.userLoader.loadMany(user.followers as string[]);
  }

  @FieldResolver(() => [User])
  public followingObj(@Root() user: User, @Ctx() context: MyContext) {
    return context.userLoader.loadMany(user.following as string[]);
  }

  @FieldResolver(() => [User])
  public closeObj(@Root() user: User, @Ctx() context: MyContext) {
    return context.userLoader.loadMany(user.close as string[]);
  }

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

      let user = await UserModel.create(input);

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

      const token = signJWT(user);

      user = user.toObject();
      user.accessToken = token;

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

  @Mutation(() => TokenResponse)
  async forgotPassword(@Arg("email") email: string): Promise<TokenResponse> {
    try {
      const user = await UserModel.findOne({ email });

      if (!user)
        return {
          errors: [
            {
              field: "user",
              message: "User not found",
            },
          ],
          token: null,
        };

      const token = v4();

      let tokenCreated = await ForgotPasswordTokenModel.create({
        user: user._id,
        token,
      });

      sendEmail(email, resetPasswordHTML(token));

      tokenCreated = tokenCreated.toObject();
      tokenCreated.userObj = user;

      return {
        errors: [],
        token: tokenCreated,
      };
    } catch (err) {
      return {
        errors: unhandledError(err),
        token: null,
      };
    }
  }

  @Mutation(() => UserResponse)
  async changePassword(
    @Arg("token") token: string,
    @Arg("userId") userId: string,
    @Arg("newPassword") newPassword: string,
    @Ctx() context: MyContext
  ): Promise<UserResponse> {
    if (!isValidID(userId))
      return {
        errors: [
          {
            field: "id",
            message: "Invalid ID",
          },
        ],
        user: null,
      };

    try {
      const errors = updateUserValidation({
        password: newPassword,
      });
      if (errors)
        return {
          errors,
          user: null,
        };

      const tokenStored = await ForgotPasswordTokenModel.findOne({ token });

      if (!tokenStored)
        return {
          errors: [
            {
              field: "token",
              message: "Token expired",
            },
          ],
          user: null,
        };

      let user;
      if (userId == tokenStored.user) {
        user = await UserModel.findOneAndUpdate(
          { _id: tokenStored.user },
          {
            $set: {
              password: await argon2.hash(newPassword),
            },
          },
          { returnDocument: "after" }
        );

        if (!user)
          return {
            errors: [
              {
                field: "token",
                message: "Invalid token",
              },
            ],
            user: null,
          };
      } else
        return {
          errors: [
            {
              field: "user",
              message: "Invalid user",
            },
          ],
        };

      await ForgotPasswordTokenModel.deleteOne({ _id: tokenStored._id });

      const accessToken = signJWT(user);

      user = user.toObject();
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

  @Query(() => UsersResponse)
  public async getSuggestions(): Promise<UsersResponse> {
    try {
      const users = await UserModel.aggregate([
        {
          $sample: {
            size: 30,
          },
        },
        {
          $group: {
            _id: "$_id",
            result: { $push: "$$ROOT" },
          },
        },
        {
          $replaceRoot: {
            newRoot: { $first: "$result" },
          },
        },
      ]);
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

  @Query(() => UserResponse)
  public async getUser(@Arg("userId") userId: string): Promise<UserResponse> {
    if (!isValidID(userId))
      return {
        errors: [
          {
            field: "id",
            message: "Invalid ID",
          },
        ],
        user: null,
      };

    try {
      const user = await UserModel.findById(userId);

      if (!user)
        return {
          errors: [
            {
              field: "user",
              message: "User not found",
            },
          ],
          user: null,
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

  @Query(() => UserResponse)
  public async getProfile(
    @Arg("username") username: string
  ): Promise<UserResponse> {
    try {
      const user = await UserModel.findOne({ username });

      if (!user) {
        return {
          errors: [
            {
              field: "user",
              message: "User not found",
            },
          ],
          user: null,
        };
      }

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

  @Query(() => UserResponse)
  public async getFriends(
    @Arg("userId") userId: string
  ): Promise<UserResponse> {
    if (!isValidID(userId))
      return {
        errors: [
          {
            field: "id",
            message: "Invalid ID",
          },
        ],
        user: null,
      };

    try {
      const user = await UserModel.findById(userId);

      if (!user) {
        return {
          errors: [
            {
              field: "user",
              message: "User not found",
            },
          ],
          user: null,
        };
      }

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

  @Mutation(() => UserResponse)
  @UseMiddleware(isAuth)
  public async updateUser(
    @Arg("userId") userId: string,
    @Arg("accessToken") accessToken: string,
    @Arg("input") input: UpdateUserInput,
    @Ctx() context: MyContext
  ): Promise<UserResponse> {
    if (!isValidID(userId))
      return {
        errors: [
          {
            field: "id",
            message: "Invalid ID",
          },
        ],
        user: null,
      };

    if (context.user.id === userId || context.user.isAdmin) {
      try {
        const errors = updateUserValidation(input);
        if (errors)
          return {
            errors,
            user: null,
          };

        if (input.password) input.password = await argon2.hash(input.password);

        let user = await UserModel.findOneAndUpdate(
          { _id: userId },
          { $set: input },
          {
            new: true,
            upsert: true,
            setDefaultsOnInsert: true,
            returnDocument: "after",
          }
        );

        if (!user)
          return {
            errors: [
              {
                field: "user",
                message: "User not found",
              },
            ],
          };

        user = user.toObject();
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
    } else
      return {
        errors: unauthorizedError(),
        user: null,
      };
  }

  @Mutation(() => DeleteUserResponse)
  @UseMiddleware(isAuth)
  public async deleteUser(
    @Arg("userId") userId: string,
    @Ctx() context: MyContext
  ): Promise<DeleteUserResponse> {
    if (!isValidID(userId))
      return {
        errors: [
          {
            field: "id",
            message: "Invalid ID",
          },
        ],
        info: null,
      };

    if (context.user.id === userId || context.user.isAdmin) {
      try {
        let user: User | null = await UserModel.findByIdAndDelete(
          userId
        ).lean();

        if (!user) {
          return {
            errors: [
              {
                field: "user",
                message: "User not found",
              },
            ],
            info: null,
            deleted: null,
          };
        }

        let archivedUser: UserArchive = user as User;

        // Keep the original ID of the user in 'userId' field
        archivedUser.userId = archivedUser._id;

        delete archivedUser.__v;
        delete archivedUser._id;

        if (archivedUser.hasOwnProperty("createdAt"))
          delete archivedUser.createdAt;
        if (archivedUser.hasOwnProperty("updatedAt"))
          delete archivedUser.updatedAt;
        if (archivedUser.hasOwnProperty("password"))
          delete archivedUser.password;

        const deletedUser: UserArchive = await UserArchiveModel.create(
          archivedUser
        );

        return {
          errors: [],
          info: `User ${userId} deleted`,
          deleted: deletedUser,
        };
      } catch (err) {
        return {
          errors: unhandledError(err),
          info: null,
          deleted: null,
        };
      }
    } else
      return {
        errors: unauthorizedError(),
        info: null,
        deleted: null,
      };
  }

  @Mutation(() => UserResponse)
  @UseMiddleware(isAuth)
  public async followUser(
    @Arg("userId") userId: string,
    @Arg("userIdToFollow") userIdToFollow: string,
    @Ctx() context: MyContext
  ): Promise<UserResponse> {
    if (!isValidID(userId) || !isValidID(userIdToFollow))
      return {
        errors: [
          {
            field: "id",
            message: "Invalid ID",
          },
        ],
        user: null,
      };

    try {
      if (context.user.id === userId || context.user.isAdmin) {
        if (userId === userIdToFollow)
          return {
            errors: [
              {
                field: "following",
                message: "Cannot follow yourself",
              },
            ],
            user: null,
          };

        const user = await UserModel.findOneAndUpdate(
          { _id: userId },
          {
            $addToSet: {
              following: userIdToFollow,
            },
          },
          { returnDocument: "after" }
        );

        if (!user)
          return {
            errors: [
              {
                field: "following",
                message: `Failed to follow ${userIdToFollow}`,
              },
            ],
            user: null,
          };

        const followed = await UserModel.findOneAndUpdate(
          { _id: userIdToFollow },
          {
            $addToSet: {
              followers: userId,
            },
          },
          { returnDocument: "after" }
        );

        if (!followed)
          return {
            errors: [
              {
                field: "followed",
                message: `Failed to follow ${userIdToFollow}`,
              },
            ],
            user: null,
          };

        return {
          errors: [],
          user,
        };
      } else
        return {
          errors: unauthorizedError(),
          user: null,
        };
    } catch (err) {
      return {
        errors: unhandledError(err),
        user: null,
      };
    }
  }

  @Mutation(() => UserResponse)
  @UseMiddleware(isAuth)
  public async unfollowUser(
    @Arg("userId") userId: string,
    @Arg("userIdToUnfollow") userIdToUnfollow: string,
    @Ctx() context: MyContext
  ): Promise<UserResponse> {
    if (!isValidID(userId) || !isValidID(userIdToUnfollow))
      return {
        errors: [
          {
            field: "id",
            message: "Invalid ID",
          },
        ],
        user: null,
      };

    try {
      if (context.user.id === userId || context.user.isAdmin) {
        if (userId === userIdToUnfollow)
          return {
            errors: [
              {
                field: "unfollowing",
                message: "Cannot unfollow yourself",
              },
            ],
            user: null,
          };

        const user = await UserModel.findOneAndUpdate(
          { _id: userId },
          {
            $pull: {
              following: userIdToUnfollow,
            },
          },
          { returnDocument: "after" }
        );

        if (!user)
          return {
            errors: [
              {
                field: "unfollowing",
                message: `Failed to unfollow ${userIdToUnfollow}`,
              },
            ],
            user: null,
          };

        const unfollowed = await UserModel.findOneAndUpdate(
          { _id: userIdToUnfollow },
          {
            $pull: {
              followers: userId,
            },
          },
          { returnDocument: "after" }
        );

        if (!unfollowed)
          return {
            errors: [
              {
                field: "unfollowed",
                message: `Failed to unfollow ${userIdToUnfollow}`,
              },
            ],
            user: null,
          };

        return {
          errors: [],
          user,
        };
      } else
        return {
          errors: unauthorizedError(),
          user: null,
        };
    } catch (err) {
      return {
        errors: unhandledError(err),
        user: null,
      };
    }
  }

  @Mutation(() => UserResponse)
  @UseMiddleware(isAuth)
  public async addCloseFriend(
    @Arg("userId") userId: string,
    @Arg("userIdToAdd") userIdToAdd: string,
    @Ctx() context: MyContext
  ): Promise<UserResponse> {
    if (!isValidID(userId) || !isValidID(userIdToAdd))
      return {
        errors: [
          {
            field: "id",
            message: "Invalid ID",
          },
        ],
        user: null,
      };

    try {
      if (context.user.id === userId || context.user.isAdmin) {
        if (userId === userIdToAdd)
          return {
            errors: [
              {
                field: "closeFriend",
                message: "Cannot add yourself",
              },
            ],
            user: null,
          };

        const user = await UserModel.findOneAndUpdate(
          { _id: userId },
          {
            $addToSet: {
              close: userIdToAdd,
            },
          },
          { returnDocument: "after" }
        );

        if (!user)
          return {
            errors: [
              {
                field: "closeFriend",
                message: `Failed to add ${userIdToAdd}`,
              },
            ],
            user: null,
          };

        return {
          errors: [],
          user,
        };
      } else
        return {
          errors: unauthorizedError(),
          user: null,
        };
    } catch (err) {
      return {
        errors: unhandledError(err),
        user: null,
      };
    }
  }

  @Mutation(() => UserResponse)
  @UseMiddleware(isAuth)
  public async removeCloseFriend(
    @Arg("userId") userId: string,
    @Arg("userIdToRemove") userIdToRemove: string,
    @Ctx() context: MyContext
  ): Promise<UserResponse> {
    if (!isValidID(userId) || !isValidID(userIdToRemove))
      return {
        errors: [
          {
            field: "id",
            message: "Invalid ID",
          },
        ],
        user: null,
      };

    try {
      if (context.user.id === userId || context.user.isAdmin) {
        if (userId === userIdToRemove)
          return {
            errors: [
              {
                field: "closeFriend",
                message: "Cannot remove yourself",
              },
            ],
            user: null,
          };

        const user = await UserModel.findOneAndUpdate(
          { _id: userId },
          {
            $pull: {
              close: userIdToRemove,
            },
          },
          { returnDocument: "after" }
        );

        if (!user)
          return {
            errors: [
              {
                field: "closeFriend",
                message: `Failed to remove ${userIdToRemove}`,
              },
            ],
            user: null,
          };

        return {
          errors: [],
          user,
        };
      } else
        return {
          errors: unauthorizedError(),
          user: null,
        };
    } catch (err) {
      return {
        errors: unhandledError(err),
        user: null,
      };
    }
  }

  @Mutation(() => UserResponse)
  @UseMiddleware(isAuth)
  public async updateTags(
    @Arg("input") input: UpdateTagsInput,
    @Ctx() context: MyContext
  ): Promise<UserResponse> {
    if (!isValidID(input.userId))
      return {
        errors: [
          {
            field: "id",
            message: "Invalid ID",
          },
        ],
        user: null,
      };

    try {
      if (context.user.id === input.userId || context.user.isAdmin) {
        const user = await UserModel.findOneAndUpdate(
          { _id: input.userId },
          {
            $set: {
              tags: input.tags,
            },
          },
          { returnDocument: "after" }
        );

        if (!user)
          return {
            errors: [
              {
                field: "tags",
                message: `Failed to add tags for ${input.userId}`,
              },
            ],
            user: null,
          };

        return {
          errors: [],
          user,
        };
      } else
        return {
          errors: unauthorizedError(),
          user: null,
        };
    } catch (err) {
      return {
        errors: unhandledError(err),
        user: null,
      };
    }
  }

  @Mutation(() => UserResponse)
  @UseMiddleware(isAuth)
  public async updateSocials(
    @Arg("input") input: UpdateSocialsInput,
    @Ctx() context: MyContext
  ): Promise<UserResponse> {
    if (!isValidID(input.userId))
      return {
        errors: [
          {
            field: "id",
            message: "Invalid ID",
          },
        ],
        user: null,
      };

    try {
      if (context.user.id === input.userId || context.user.isAdmin) {
        const user = await UserModel.findOneAndUpdate(
          { _id: input.userId },
          {
            $set: {
              socials: input.socials,
            },
          },
          { returnDocument: "after" }
        );

        if (!user)
          return {
            errors: [
              {
                field: "socials",
                message: `Failed to add socials for ${input.userId}`,
              },
            ],
            user: null,
          };

        return {
          errors: [],
          user,
        };
      } else
        return {
          errors: unauthorizedError(),
          user: null,
        };
    } catch (err) {
      return {
        errors: unhandledError(err),
        user: null,
      };
    }
  }
}
