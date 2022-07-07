/*********************
 USER RESOLVER
 - register()
 - login()
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

import { MyContext } from "../types";
import { User, UserModel } from "../models/User.model";
import {
  FollowResponse,
  UnfollowResponse,
  UserResponse,
  UsersResponse,
} from "./res/user.res";
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

const unhandledError = (err: Error) => {
  return [
    {
      field: "error",
      message: `Please report this error to the support: ${err}`,
    },
  ];
};

const unauthorizedError = () => {
  return [
    {
      field: "authorization",
      message: "Not authorized",
    },
  ];
};

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
            message: "invalid id",
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

        if (input.password) {
          input.password = await argon2.hash(input.password);
        }

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

        if (!user) {
          return {
            errors: [
              {
                field: "user",
                message: "User not found",
              },
            ],
          };
        }

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

  @Mutation(() => FollowResponse)
  @UseMiddleware(isAuth)
  async followUser(
    @Arg("userId") userId: string,
    @Arg("userIdToFollow") userIdToFollow: string,
    @Ctx() context: MyContext
  ): Promise<FollowResponse> {
    if (!isValidID(userId) || !isValidID(userIdToFollow))
      return {
        errors: [
          {
            field: "id",
            message: "Invalid ID",
          },
        ],
        following: null,
        followed: null,
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
            following: null,
            followed: null,
          };

        const following = await UserModel.findOneAndUpdate(
          { _id: userId },
          {
            $addToSet: {
              following: userIdToFollow,
            },
          },
          { returnDocument: "after" }
        );

        if (!following)
          return {
            errors: [
              {
                field: "following",
                message: `Failed to follow ${userIdToFollow}`,
              },
            ],
            following: null,
            followed: null,
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
            following: null,
            followed: null,
          };

        return {
          errors: [],
          following,
          followed,
        };
      } else
        return {
          errors: unauthorizedError(),
          following: null,
          followed: null,
        };
    } catch (err) {
      return {
        errors: unhandledError(err),
        following: null,
        followed: null,
      };
    }
  }

  @Mutation(() => UnfollowResponse)
  @UseMiddleware(isAuth)
  async unfollowUser(
    @Arg("userId") userId: string,
    @Arg("userIdToUnfollow") userIdToUnfollow: string,
    @Ctx() context: MyContext
  ): Promise<UnfollowResponse> {
    if (!isValidID(userId) || !isValidID(userIdToUnfollow))
      return {
        errors: [
          {
            field: "id",
            message: "Invalid ID",
          },
        ],
        unfollowing: null,
        unfollowed: null,
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
            unfollowing: null,
            unfollowed: null,
          };

        const unfollowing = await UserModel.findOneAndUpdate(
          { _id: userId },
          {
            $pull: {
              following: userIdToUnfollow,
            },
          },
          { returnDocument: "after" }
        );

        if (!unfollowing)
          return {
            errors: [
              {
                field: "unfollowing",
                message: `Failed to unfollow ${userIdToUnfollow}`,
              },
            ],
            unfollowing: null,
            unfollowed: null,
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
            unfollowing: null,
            unfollowed: null,
          };

        return {
          errors: [],
          unfollowing,
          unfollowed,
        };
      } else
        return {
          errors: unauthorizedError(),
          unfollowing: null,
          unfollowed: null,
        };
    } catch (err) {
      return {
        errors: unhandledError(err),
        unfollowing: null,
        unfollowed: null,
      };
    }
  }

  @Mutation(() => UserResponse)
  @UseMiddleware(isAuth)
  async addCloseFriend(
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
  async removeCloseFriend(
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
  async updateTags(
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
  async updateSocials(
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
