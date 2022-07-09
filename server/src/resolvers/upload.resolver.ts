/*********************
 UPLOAD RESOLVER
 - profilePicture()
 - coverPicture()
 - postMedia()
**********************/

import { Arg, Ctx, Mutation, Resolver, UseMiddleware } from "type-graphql";
import { createWriteStream, promises } from "fs";
import { v4 } from "uuid";

// @ts-ignore
import GraphQLUpload from "graphql-upload/GraphQLUpload.js";
/* @ts-ignore */
import Upload from "graphql-upload/Upload.js";

import { isAuth } from "../middlewares/isAuth";
import { MyContext } from "../types";
import { MediaResponse } from "./res/media.res";

@Resolver()
export class UploadResolver {
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

    if (mimetype == "video/mp4") fileName = `${v4()}.mp4`;
    else if (mimetype == "image/gif") fileName = `${v4()}.gif`;
    else fileName = `${v4()}.png`;

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

  @Mutation(() => MediaResponse)
  @UseMiddleware(isAuth)
  public async profilePicture(
    @Arg("file", () => GraphQLUpload)
    { createReadStream, mimetype }: Upload,
    @Ctx() context: MyContext
  ): Promise<MediaResponse> {
    let fileName: string;
    let folder: string = `${__dirname}/../../uploads/profile/${context.user.id}`;

    if (
      mimetype != "image/jpg" &&
      mimetype != "image/png" &&
      mimetype != "image/jpeg"
    )
      return {
        errors: [
          {
            field: "file",
            message: "Invalid file format",
          },
        ],
      };

    fileName = `${v4()}.png`;

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
          path: `profile/${context.user.id}/${fileName}`,
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

  @Mutation(() => MediaResponse)
  @UseMiddleware(isAuth)
  public async coverPicture(
    @Arg("file", () => GraphQLUpload)
    { createReadStream, mimetype }: Upload,
    @Ctx() context: MyContext
  ): Promise<MediaResponse> {
    let fileName: string;
    let folder: string = `${__dirname}/../../uploads/cover/${context.user.id}`;

    if (
      mimetype != "image/jpg" &&
      mimetype != "image/png" &&
      mimetype != "image/jpeg"
    )
      return {
        errors: [
          {
            field: "file",
            message: "Invalid file format",
          },
        ],
      };

    fileName = `${v4()}.png`;

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
          path: `cover/${context.user.id}/${fileName}`,
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
}
