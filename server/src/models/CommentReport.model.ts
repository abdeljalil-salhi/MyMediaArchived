import { prop as Property, Ref, getModelForClass } from "@typegoose/typegoose";
import { Schema } from "mongoose";
import { ObjectType, Field } from "type-graphql";

import { User } from "./User.model";
import { Comment } from "./Comment.model";

@ObjectType()
export class CommentReport {
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
    required: [true, "Comment is required"],
    ref: "Comment",
    type: Schema.Types.ObjectId,
  })
  public comment: Ref<Comment>;
  @Field(() => Comment)
  public commentObj: Comment;

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

export const CommentReportModel = getModelForClass<typeof CommentReport>(
  CommentReport,
  {
    schemaOptions: { timestamps: true },
  }
);
