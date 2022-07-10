import { getModelForClass, prop as Property, Ref } from "@typegoose/typegoose";
import { MaxLength } from "class-validator";
import { Schema } from "mongoose";
import { Field, ObjectType } from "type-graphql";

import { User } from "./User.model";
import { CommentReact } from "./CommentReact.model";
import { Reply } from "./Reply.model";
import { CommentReport } from "./CommentReport.model";

@ObjectType()
export class Comment {
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

  @MaxLength(1000, {
    message: "Comment text must not be longer than 1000 characters",
  })
  @Field(() => String, { nullable: true })
  @Property({
    trim: true,
    type: Schema.Types.String,
  })
  public text?: string;

  @Field(() => String, { nullable: true })
  public textSnippet?: string;

  @Field(() => String, { nullable: true })
  @Property({
    type: Schema.Types.String,
  })
  public picture?: string;

  @Field(() => String, { nullable: true })
  @Property({
    type: Schema.Types.String,
  })
  public video?: string;

  @Field(() => String, { nullable: true })
  @Property({
    type: Schema.Types.String,
  })
  public link?: string;

  @Field(() => String, { nullable: true })
  @Property({
    type: Schema.Types.String,
  })
  public ytvideo?: string;

  @Field(() => String, { nullable: true })
  @Property({
    type: Schema.Types.String,
  })
  public file?: string;

  @Field(() => [String])
  @Property({
    ref: "CommentReact",
    default: [],
    type: Schema.Types.ObjectId,
  })
  public reacts: Ref<CommentReact>[];
  @Field(() => [CommentReact], {
    defaultValue: [],
  })
  public reactsObj: CommentReact[];

  @Field(() => [String])
  @Property({
    ref: "Reply",
    default: [],
    type: Schema.Types.ObjectId,
  })
  public replies: Ref<Reply>[];
  @Field(() => [Reply], {
    defaultValue: [],
  })
  public repliesObj: Reply[];

  @Field(() => [String])
  @Property({
    ref: "CommentReport",
    default: [],
    type: Schema.Types.ObjectId,
  })
  public reports: Ref<CommentReport>[];
  @Field(() => [CommentReport], {
    defaultValue: [],
  })
  public reportsObj: CommentReport[];

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

export const CommentModel = getModelForClass<typeof Comment>(Comment, {
  schemaOptions: { timestamps: true },
});
