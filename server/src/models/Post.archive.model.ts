import { getModelForClass, prop as Property, Ref } from "@typegoose/typegoose";
import { Schema } from "mongoose";
import { Field, ObjectType } from "type-graphql";

import { User } from "./User.model";
import { Feeling } from "./Feeling.model";
import { PostReport } from "./PostReport.model";
import { Comment } from "./Comment.model";
import { PostReact } from "./PostReact.model";
import { Post } from "./Post.model";

@ObjectType()
export class PostArchive {
  @Field(() => String)
  public _id?: string;

  @Field(() => String)
  @Property({
    ref: "Post",
    type: Schema.Types.ObjectId,
  })
  public postId?: Ref<Post>;

  @Field(() => String)
  @Property({
    required: [true, "User is required"],
    ref: "User",
    type: Schema.Types.ObjectId,
  })
  public user: Ref<User>;

  @Field(() => Boolean)
  @Property({
    default: false,
    type: Schema.Types.Boolean,
  })
  public isEdited: boolean;

  @Field(() => String, { nullable: true })
  @Property({
    trim: true,
    type: Schema.Types.String,
  })
  public text?: String;

  @Field(() => String, { nullable: true })
  public textSnippet?: string;

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
    ref: "PostReact",
    default: [],
    type: Schema.Types.ObjectId,
  })
  public reacts: Ref<PostReact>[];

  @Field(() => [String])
  @Property({
    ref: "Comment",
    default: [],
    type: Schema.Types.ObjectId,
  })
  public comments: Ref<Comment>[];

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
  @Field(() => [PostReport], {
    defaultValue: [],
  })
  public reportsObj: PostReport[];

  @Field(() => Date)
  @Property({
    type: Schema.Types.Date,
  })
  public createdAt?: Date;

  @Field(() => Date)
  @Property({
    type: Schema.Types.Date,
  })
  public updatedAt?: Date;

  // Useless properties to delete
  public __v?: any;
}

export const PostArchiveModel = getModelForClass<typeof PostArchive>(
  PostArchive,
  {
    schemaOptions: { timestamps: true },
  }
);
