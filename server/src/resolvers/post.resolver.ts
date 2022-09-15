/*********************
 POST RESOLVER
 - createPost()
 - getAllPosts()
 - getPost()
 - getTimelinePosts()
 - getUserPosts()
 - updatePost()
 - deletePost()
 - reactPost()
 - unreactPost()
 **********************/

import {
  Arg,
  Ctx,
  FieldResolver,
  Int,
  Mutation,
  Query,
  Resolver,
  Root,
  UseMiddleware,
} from "type-graphql";
import { createWriteStream, promises } from "fs";
import { v4 } from "uuid";

// @ts-ignore
import GraphQLUpload from "graphql-upload/GraphQLUpload.js";
/* @ts-ignore */
import Upload from "graphql-upload/Upload.js";

import { MyContext } from "../types";
import { User, UserModel } from "../models/User.model";
import { Post, PostModel } from "../models/Post.model";
import { PostArchive, PostArchiveModel } from "../models/Post.archive.model";
import { PostReact, PostReactModel } from "../models/PostReact.model";
import { isAuth } from "../middlewares/isAuth";
import {
  PaginatedPostsResponse,
  PostResponse,
  PostsResponse,
} from "./res/post.res";
import { DeletePostResponse } from "./res/delete.res";
import { CreatePostInput, ReactInput } from "../models/inputs/CreatePost.input";
import { UpdatePostInput } from "../models/inputs/UpdatePost.input";
import { isValidID } from "../utils/isValidID";
import { unauthorizedError, unhandledError } from "./errors.resolvers";

@Resolver(Post)
export class PostResolver {
  @FieldResolver(() => String)
  public textSnippet(@Root() post: Post) {
    if (post.text) return post.text.slice(0, 50);
    return null;
  }

  @FieldResolver(() => User)
  public userObj(@Root() post: Post, @Ctx() context: MyContext) {
    return context.userLoader.load(post.user?.toString());
  }

  @FieldResolver(() => [PostReact])
  public reactsObj(@Root() post: Post, @Ctx() context: MyContext) {
    return context.postReactLoader.loadMany(post.reacts as string[]);
  }

  @Mutation(() => PostResponse)
  @UseMiddleware(isAuth)
  public async createPost(
    @Ctx() context: MyContext,
    @Arg("input") input: CreatePostInput,
    @Arg("isMedia") isMedia: boolean,
    @Arg("file", () => GraphQLUpload, { nullable: true })
    file: Upload
  ): Promise<PostResponse> {
    if (!isValidID(input.user))
      return {
        errors: [
          {
            field: "id",
            message: "Invalid ID",
          },
        ],
        post: null,
      };

    if (context.user.id === input.user || context.user.isAdmin) {
      if (isMedia) {
        let fileName: string;
        let folder: string = `${__dirname}/../../uploads/post/${context.user.id}`;

        const mimetype = file.mimetype;
        const createReadStream = () => file.createReadStream();

        if (
          mimetype.indexOf("image") === -1 &&
          mimetype != "video/mp4" &&
          mimetype != "application/zip" &&
          mimetype != "application/x-7z-compressed" &&
          mimetype != "application/vnd.rar" &&
          mimetype != "application/pdf" &&
          mimetype != "text/plain"
        )
          return {
            errors: [
              {
                field: "file",
                message: "Invalid file format",
              },
            ],
          };

        if (mimetype == "video/mp4") fileName = `${v4()}.mp4`;
        else if (mimetype == "image/gif") fileName = `${v4()}.gif`;
        else fileName = `${v4()}.png`;

        try {
          await promises.access(folder);
        } catch (_: any) {
          await promises.mkdir(folder);
        }

        input.picture =
          mimetype.indexOf("image") !== -1
            ? `post/${context.user.id}/${fileName}`
            : "";
        input.video =
          mimetype == "video/mp4" ? `post/${context.user.id}/${fileName}` : "";
        input.file =
          mimetype == "application/zip" ||
          mimetype == "application/x-7z-compressed" ||
          mimetype == "application/vnd.rar" ||
          mimetype == "application/pdf" ||
          mimetype == "text/plain"
            ? `post/${context.user.id}/${fileName}`
            : "";

        try {
          await new Promise(async (resolve, reject) =>
            createReadStream()
              .pipe(createWriteStream(`${folder}/${fileName}`))
              .on("finish", async () => {
                resolve(true);
              })
              .on("error", (_: Error) => {
                reject(false);
              })
          );
        } catch (_: unknown) {
          return {
            errors: [
              {
                field: "file",
                message: "File not found or invalid",
              },
            ],
            post: null,
          };
        }
      }

      try {
        const post = await PostModel.create(input);

        if (!post)
          return {
            errors: [
              {
                field: "post",
                message: "Post cannot be created",
              },
            ],
            post: null,
          };

        return {
          errors: [],
          post,
        };
      } catch (err: any) {
        return {
          errors: unhandledError(err),
          post: null,
        };
      }
    } else
      return {
        errors: unauthorizedError(),
        post: null,
      };
  }

  @Query(() => PostsResponse)
  public async getAllPosts(): Promise<PostsResponse> {
    try {
      const posts = await PostModel.find({}).sort({ createdAt: -1 });
      return {
        errors: [],
        posts,
      };
    } catch (err) {
      return {
        errors: unhandledError(err),
        posts: [],
      };
    }
  }

  @Query(() => PostResponse)
  public async getPost(@Arg("postId") postId: string): Promise<PostResponse> {
    if (!isValidID(postId))
      return {
        errors: [
          {
            field: "id",
            message: "Invalid ID",
          },
        ],
        post: null,
      };

    try {
      const post = await PostModel.findById(postId);

      if (!post)
        return {
          errors: [
            {
              field: "post",
              message: "Post not found",
            },
          ],
          post: null,
        };

      return {
        errors: [],
        post,
      };
    } catch (err) {
      return {
        errors: unhandledError(err),
        post: null,
      };
    }
  }

  @Query(() => PaginatedPostsResponse)
  @UseMiddleware(isAuth)
  public async getTimelinePosts(
    @Arg("userId") userId: string,
    @Arg("limit", () => Int) limit: number,
    @Arg("cursor", () => String, { nullable: true }) cursor: string | null,
    @Ctx() context: MyContext
  ): Promise<PaginatedPostsResponse> {
    if (!isValidID(userId))
      return {
        errors: [
          {
            field: "id",
            message: "Invalid ID",
          },
        ],
        posts: [],
        hasMore: false,
      };

    const realLimit = Math.min(50, limit);
    const hasMoreLimit = Math.min(50, limit) + 1;

    if (context.user.id === userId || context.user.isAdmin) {
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
            posts: [],
            hasMore: false,
          };
        }

        const posts = await PostModel.find(
          cursor
            ? {
                $and: [
                  {
                    user: {
                      $in: [...user.following, userId],
                    },
                  },
                  {
                    createdAt: {
                      $lt: cursor,
                    },
                  },
                ],
              }
            : {
                user: {
                  $in: [...user.following, userId],
                },
              }
        )
          .limit(hasMoreLimit)
          .sort({ createdAt: -1 });

        return {
          errors: [],
          posts: posts.slice(0, realLimit),
          hasMore: posts.length === hasMoreLimit,
        };
      } catch (err) {
        return {
          errors: unhandledError(err),
          posts: [],
          hasMore: false,
        };
      }
    } else
      return {
        errors: unauthorizedError(),
        posts: [],
        hasMore: false,
      };
  }

  @Query(() => PaginatedPostsResponse)
  @UseMiddleware(isAuth)
  public async getUserPosts(
    @Arg("userId") userId: string,
    @Arg("limit", () => Int) limit: number,
    @Arg("cursor", () => String, { nullable: true }) cursor: string | null
  ): Promise<PaginatedPostsResponse> {
    if (!isValidID(userId))
      return {
        errors: [
          {
            field: "id",
            message: "Invalid ID",
          },
        ],
        posts: [],
        hasMore: false,
      };

    const realLimit = Math.min(50, limit);
    const hasMoreLimit = Math.min(50, limit) + 1;

    try {
      const posts = await PostModel.find(
        cursor
          ? {
              $and: [
                { user: userId },
                {
                  createdAt: {
                    $lt: cursor,
                  },
                },
              ],
            }
          : { user: userId }
      )
        .limit(hasMoreLimit)
        .sort({ createdAt: -1 });

      return {
        errors: [],
        posts: posts.slice(0, realLimit),
        hasMore: posts.length === hasMoreLimit,
      };
    } catch (err) {
      return {
        errors: unhandledError(err),
        posts: [],
        hasMore: false,
      };
    }
  }

  @Mutation(() => PostResponse)
  @UseMiddleware(isAuth)
  public async updatePost(
    @Arg("userId") userId: string,
    @Arg("postId") postId: string,
    @Arg("input") input: UpdatePostInput,
    @Ctx() context: MyContext
  ): Promise<PostResponse> {
    if (!isValidID(postId))
      return {
        errors: [
          {
            field: "id",
            message: "Invalid ID",
          },
        ],
        post: null,
      };

    if (context.user.id === userId || context.user.isAdmin) {
      try {
        input.isEdited = true;

        const post = await PostModel.findOneAndUpdate(
          { _id: postId },
          { $set: input },
          {
            new: true,
            upsert: true,
            setDefaultsOnInsert: true,
            returnDocument: "after",
          }
        );

        if (!post) {
          return {
            errors: [
              {
                field: "post",
                message: "Post not found",
              },
            ],
          };
        }

        return {
          errors: [],
          post,
        };
      } catch (err) {
        return {
          errors: unhandledError(err),
          post: null,
        };
      }
    } else
      return {
        errors: unauthorizedError(),
        post: null,
      };
  }

  @Mutation(() => DeletePostResponse)
  @UseMiddleware(isAuth)
  public async deletePost(
    @Arg("userId") userId: string,
    @Arg("postId") postId: string,
    @Ctx() context: MyContext
  ): Promise<DeletePostResponse> {
    if (!isValidID(postId))
      return {
        errors: [
          {
            field: "id",
            message: "Invalid ID",
          },
        ],
        info: null,
        deleted: null,
      };

    if (context.user.id === userId || context.user.isAdmin) {
      try {
        let post: Post | null = await PostModel.findByIdAndDelete(
          postId
        ).lean();

        if (!post) {
          return {
            errors: [
              {
                field: "post",
                message: "Post not found",
              },
            ],
            info: null,
            deleted: null,
          };
        }

        let archivedPost: PostArchive = post as Post;

        // Keep the original ID of the post in 'postId' field
        archivedPost.postId = archivedPost._id;

        delete archivedPost.__v;
        delete archivedPost._id;

        if (archivedPost.hasOwnProperty("createdAt"))
          delete archivedPost.createdAt;
        if (archivedPost.hasOwnProperty("updatedAt"))
          delete archivedPost.updatedAt;

        const deletedPost: PostArchive = await PostArchiveModel.create(
          archivedPost
        );

        return {
          errors: [],
          info: `Post ${postId} deleted`,
          deleted: deletedPost,
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

  @Mutation(() => PostResponse)
  @UseMiddleware(isAuth)
  public async reactPost(
    @Arg("userId") userId: string,
    @Arg("postId") postId: string,
    @Arg("input") input: ReactInput,
    @Ctx() context: MyContext
  ): Promise<PostResponse> {
    if (!isValidID(userId) || !isValidID(postId))
      return {
        errors: [
          {
            field: "id",
            message: "Invalid ID",
          },
        ],
        post: null,
      };

    if (context.user.id === userId || context.user.isAdmin) {
      try {
        const react = await PostReactModel.create({
          user: userId,
          postId,
          react: input.react,
        });

        if (!react)
          return {
            errors: [
              {
                field: "react",
                message: `Failed to create a react by ${userId}`,
              },
            ],
            post: null,
          };

        const post = await PostModel.findOneAndUpdate(
          { _id: postId },
          {
            $addToSet: {
              reacts: react._id,
            },
          },
          { returnDocument: "after" }
        );

        if (!post)
          return {
            errors: [
              {
                field: "react",
                message: `Failed to react to ${postId} by ${userId}`,
              },
            ],
            post: null,
          };

        return {
          errors: [],
          post,
        };
      } catch (err) {
        return {
          errors: unhandledError(err),
          post: null,
        };
      }
    } else
      return {
        errors: unauthorizedError(),
        post: null,
      };
  }

  @Mutation(() => PostResponse)
  @UseMiddleware(isAuth)
  async unreactPost(
    @Arg("userId") userId: string,
    @Arg("postId") postId: string,
    @Arg("reactId") reactId: string,
    @Ctx() context: MyContext
  ): Promise<PostResponse> {
    if (!isValidID(userId) || !isValidID(postId) || !isValidID(reactId))
      return {
        errors: [
          {
            field: "id",
            message: "Invalid ID",
          },
        ],
        post: null,
      };

    if (context.user.id === userId || context.user.isAdmin) {
      try {
        await PostReactModel.deleteOne({ _id: reactId });

        const post = await PostModel.findOneAndUpdate(
          { _id: postId },
          {
            $pull: {
              reacts: reactId,
            },
          },
          { returnDocument: "after" }
        );

        if (!post)
          return {
            errors: [
              {
                field: "unreact",
                message: `Failed to unreact ${postId} by ${userId}`,
              },
            ],
            post: null,
          };

        return {
          errors: [],
          post,
        };
      } catch (err) {
        return {
          errors: unhandledError(err),
          post: null,
        };
      }
    } else
      return {
        errors: unauthorizedError(),
        post: null,
      };
  }
}
