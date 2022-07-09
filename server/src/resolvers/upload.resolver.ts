/*********************
 UPLOAD RESOLVER
 - profilePicture()
**********************/
import { Arg, Ctx, Mutation, Resolver, UseMiddleware } from "type-graphql";
import { createWriteStream, promises } from "fs";

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

    fileName = `${Date.now()}.png`;

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
}
