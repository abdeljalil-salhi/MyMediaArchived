/*********************
 POST RESOLVER
 - register()
 **********************/

import {
  Arg,
  Ctx,
  FieldResolver,
  Mutation,
  Resolver,
  Root,
  UseMiddleware,
} from "type-graphql";

import { MyContext } from "../types";
import { User } from "../models/User.model";
import { Post, PostModel } from "../models/Post.model";
import { isAuth } from "../middlewares/isAuth";
import { PostResponse } from "./res/post.res";
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
  async createPost(
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
          ? media.mimetype == "text/plain"
            ? media.path
            : ""
          : "";
        input.file = media
          ? media.mimetype == "application/zip" ||
            media.mimetype == "application/x-7z-compressed" ||
            media.mimetype == "application/vnd.rar"
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
}
