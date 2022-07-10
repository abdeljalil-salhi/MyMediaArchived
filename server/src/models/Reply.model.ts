import { getModelForClass, prop as Property, Ref } from "@typegoose/typegoose";
import { MaxLength } from "class-validator";
import { Schema } from "mongoose";
import { Field, ObjectType } from "type-graphql";

import { User } from "./User.model";
import { ReplyReact } from "./ReplyReact.model";
import { ReplyReport } from "./ReplyReport.model";

@ObjectType()
export class Reply {
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
    message: "Reply text must not be longer than 1000 characters",
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
    ref: "ReplyReact",
    default: [],
    type: Schema.Types.ObjectId,
  })
  public reacts: Ref<ReplyReact>[];
  @Field(() => [ReplyReact], {
    defaultValue: [],
  })
  public reactsObj: ReplyReact[];

  @Field(() => [String])
  @Property({
    ref: "ReplyReport",
    default: [],
    type: Schema.Types.ObjectId,
  })
  public reports: Ref<ReplyReport>[];
  @Field(() => [ReplyReport], {
    defaultValue: [],
  })
  public reportsObj: ReplyReport[];

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

export const ReplyModel = getModelForClass<typeof Reply>(Reply, {
  schemaOptions: { timestamps: true },
});
