import {
  getModelForClass,
  Passthrough,
  prop as Property,
  Ref,
} from "@typegoose/typegoose";
import { Schema } from "mongoose";
import { Field, ObjectType } from "type-graphql";
import { MaxLength } from "class-validator";

import { User } from "./User.model";
import { Feeling } from "./Feeling.model";
import { PostReport } from "./PostReport.model";
import { Comment } from "./Comment.model";

@ObjectType()
export class Post {
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

  @Field(() => Boolean)
  @Property({
    default: false,
    type: Schema.Types.Boolean,
  })
  public isEdited: boolean;

  @MaxLength(100, {
    message: "Post text cannot be longer than 1000 characters",
  })
  @Field(() => String, { nullable: true })
  @Property({
    trim: true,
    type: Schema.Types.String,
  })
  public text?: String;

  @Field(() => String, { nullable: true })
  @Property({
    type: Schema.Types.String,
  })
  public picture?: String;

  @Field(() => String, { nullable: true })
  @Property({
    type: Schema.Types.String,
  })
  public video?: String;

  @Field(() => String, { nullable: true })
  @Property({
    type: Schema.Types.String,
  })
  public file?: String;

  @Field(() => String, { nullable: true })
  @Property({
    type: Schema.Types.String,
  })
  public link?: String;

  @Field(() => String, { nullable: true })
  @Property({
    type: Schema.Types.String,
  })
  public ytvideo?: String;

  @Field(() => String, { nullable: true })
  @Property({
    ref: "Feeling",
    type: Schema.Types.ObjectId,
  })
  public feeling?: Ref<Feeling>;
  @Field(() => Feeling)
  public feelingObj?: Feeling;

  @Field(() => [String])
  @Property({
    default: [],
    type: Schema.Types.String,
  })
  public tags: string[];

  @Field(() => [String])
  @Property({
    ref: "User",
    default: [],
    type: Schema.Types.ObjectId,
  })
  public mentions: Ref<User>[];
  @Field(() => [User], {
    defaultValue: [],
  })
  public mentionsObj: User[];

  @Field(() => String, { nullable: true })
  @Property({
    trim: true,
    type: Schema.Types.String,
  })
  public location?: string;

  @Field(() => [String])
  @Property({
    default: [],
    type: () =>
      new Passthrough({
        user: String,
        react: { enum: [0, 1, 2, 3, 4, 5], default: 0, type: Number },
        timestamp: { default: Date.now(), type: Date },
      }),
  })
  public reacts: {
    user: Ref<User>;
    react: number;
    timestamp: Date;
  };

  @Field(() => [String])
  @Property({
    ref: "Comment",
    default: [],
    type: Schema.Types.ObjectId,
  })
  public comments: Ref<Comment>[];
  @Field(() => [Comment], {
    defaultValue: [],
  })
  public commentsObj: Comment[];

  @Field(() => [String])
  @Property({
    ref: "Post",
    default: [],
    type: Schema.Types.ObjectId,
  })
  public shares: Ref<Post>[];

  @Field(() => Boolean)
  @Property({
    default: false,
    type: Schema.Types.Boolean,
  })
  public isShared: boolean;

  @Field(() => String, { nullable: true })
  @Property({
    ref: "Post",
    type: Schema.Types.ObjectId,
  })
  public originalPost?: Ref<Post>;
  @Field(() => Post, { nullable: true })
  public originalPostObj?: Post;

  @Field(() => [String])
  @Property({
    ref: "User",
    default: [],
    type: Schema.Types.ObjectId,
  })
  public saves: Ref<User>[];

  @Field(() => [String])
  @Property({
    ref: "PostReport",
    default: [],
    type: Schema.Types.ObjectId,
  })
  public reports: Ref<PostReport>[];

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

export const PostModel = getModelForClass<typeof Post>(Post, {
  schemaOptions: { timestamps: true },
});
