import { prop as Property, Ref, getModelForClass } from "@typegoose/typegoose";
import { Schema } from "mongoose";
import { ObjectType, Field } from "type-graphql";

import { User } from "./User.model";
import { Post } from "./Post.model";

@ObjectType()
export class PostReport {
  @Field(() => String)
  readonly _id: string;

  @Field(() => String)
  @Property({
    required: [true, "User is required"],
    ref: "User",
    type: Schema.Types.ObjectId,
  })
  public user: Ref<User>;
  @Field(() => User)
  public userObj: User;

  @Field(() => String)
  @Property({
    required: [true, "Post is required"],
    ref: "Post",
    type: Schema.Types.ObjectId,
  })
  public post: Ref<Post>;
  @Field(() => Post)
  public postObj: Post;

  @Field(() => String)
  @Property({
    enum: ["spam", "inappropriate", "other"],
    default: "other",
    type: Schema.Types.String,
  })
  public reason: string;

  @Field(() => String)
  @Property({
    type: Schema.Types.String,
  })
  public description: string;

  @Field(() => Date)
  @Property({
    type: Schema.Types.Date,
  })
  public createdAt: Date;

  @Field(() => Date)
  @Property({
    type: Schema.Types.Date,
  })
  public updatedAt: Date;
}

export const PostReportModel = getModelForClass<typeof PostReport>(PostReport, {
  schemaOptions: { timestamps: true },
});
