/*********************
 POST RESOLVER
 - createPost()
 - postMedia()
 - getAllPosts()
 **********************/

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
import { createWriteStream, promises } from "fs";

// @ts-ignore
import GraphQLUpload from "graphql-upload/GraphQLUpload.js";
/* @ts-ignore */
import Upload from "graphql-upload/Upload.js";

import { MyContext } from "../types";
import { User } from "../models/User.model";
import { Post, PostModel } from "../models/Post.model";
import { isAuth } from "../middlewares/isAuth";
import { PostResponse, PostsResponse } from "./res/post.res";
import { MediaResponse } from "./res/media.res";
import { CreatePostInput, MediaInput } from "../models/inputs/CreatePost.input";
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

  @Mutation(() => PostResponse)
  @UseMiddleware(isAuth)
  public async createPost(
    @Ctx() context: MyContext,
    @Arg("input") input: CreatePostInput,
    @Arg("file") media?: MediaInput
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
      try {
        input.picture = media
          ? media.mimetype == "image/jpg" ||
            media.mimetype == "image/png" ||
            media.mimetype == "image/jpeg" ||
            media.mimetype == "image/gif"
            ? media.path
            : ""
          : "";
        input.video = media
          ? media.mimetype == "video/mp4"
            ? media.path
            : ""
          : "";
        input.file = media
          ? media.mimetype == "application/zip" ||
            media.mimetype == "application/x-7z-compressed" ||
            media.mimetype == "application/vnd.rar" ||
            media.mimetype == "text/plain"
            ? media.path
            : ""
          : "";

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

  @Mutation(() => MediaResponse)
  @UseMiddleware(isAuth)
  public async postMedia(
    @Arg("file", () => GraphQLUpload)
    { createReadStream, mimetype }: Upload,
    @Ctx() context: MyContext
  ): Promise<MediaResponse> {
    let fileName: string;
    let folder: string = `${__dirname}/../../uploads/post/${context.user.id}`;

    if (
      mimetype != "image/jpg" &&
      mimetype != "image/png" &&
      mimetype != "image/jpeg" &&
      mimetype != "image/gif" &&
      mimetype != "video/mp4"
    )
      return {
        errors: [
          {
            field: "file",
            message: "Invalid file format",
          },
        ],
      };

    if (mimetype == "video/mp4") fileName = `${Date.now()}.mp4`;
    else if (mimetype == "image/gif") fileName = `${Date.now()}.gif`;
    else fileName = `${Date.now()}.png`;

    try {
      await promises.access(folder);
    } catch (_err) {
      await promises.mkdir(folder);
    }

    try {
      await new Promise(async (resolve, reject) =>
        createReadStream()
          .pipe(createWriteStream(`${folder}/${fileName}`))
          .on("finish", () => {
            resolve(true);
          })
          .on("error", (_: Error) => {
            reject(false);
          })
      );

      return {
        errors: [],
        media: {
          path: `post/${context.user.id}/${fileName}`,
          mimetype,
        },
      };
    } catch (_: unknown) {
      return {
        errors: [
          {
            field: "error",
            message: "File not found or invalid",
          },
        ],
        media: null,
      };
    }
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
}
