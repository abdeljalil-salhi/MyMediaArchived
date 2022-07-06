import { getModelForClass, prop as Property, Ref } from "@typegoose/typegoose";
import { Schema } from "mongoose";
import { Field, Int, ObjectType } from "type-graphql";

import { Post } from "./Post.model";
import { Highlight } from "./Highlight.model";
import { User } from "./User.model";

@ObjectType()
export class UserArchive {
  @Field(() => String)
  public _id?: string;

  @Field(() => String)
  @Property({
    ref: "User",
    type: Schema.Types.ObjectId,
  })
  public userId?: Ref<User>;

  @Field(() => String)
  @Property({
    trim: true,
    type: Schema.Types.String,
  })
  public firstName: string;

  @Field(() => String, { nullable: true })
  @Property({
    trim: true,
    type: Schema.Types.String,
  })
  public middleName?: string;

  @Field(() => String)
  @Property({
    trim: true,
    type: Schema.Types.String,
  })
  public lastName: string;

  @Field(() => String)
  @Property({
    trim: true,
    type: Schema.Types.String,
  })
  public fullName: string;

  @Field(() => String)
  @Property({
    trim: true,
    type: Schema.Types.String,
  })
  public username: string;

  @Field(() => String, { nullable: true })
  @Property({
    trim: true,
    type: Schema.Types.String,
  })
  public nickname?: string;

  @Field(() => Int)
  @Property({
    enum: [0, 1, 2, 3, 4, 5],
    default: 0,
    type: Schema.Types.Number,
  })
  public gender: number;

  @Field(() => String)
  @Property({
    default: "",
    type: Schema.Types.String,
  })
  public phone: string;

  @Field(() => String)
  @Property({
    lowercase: true,
    trim: true,
    type: Schema.Types.String,
  })
  public email: string;

  @Field(() => Boolean)
  @Property({
    default: false,
    type: Schema.Types.Boolean,
  })
  public isAdmin: boolean;

  @Field(() => Boolean)
  @Property({
    default: false,
    type: Schema.Types.Boolean,
  })
  public isVerified: boolean;

  @Field(() => Boolean)
  @Property({
    default: false,
    type: Schema.Types.Boolean,
  })
  public isSeller: boolean;

  @Field(() => String)
  @Property({
    default: "profile/noAvatar.png",
    type: Schema.Types.String,
  })
  public profile: string;

  @Field(() => String)
  @Property({
    default: "cover/noCover.png",
    type: Schema.Types.String,
  })
  public cover: string;

  @Field(() => String)
  @Property({
    default: "Hello, I am new on OpenHub !",
    type: Schema.Types.String,
  })
  public bio: string;

  @Field(() => Number)
  @Property({
    default: Date.now(),
    type: Schema.Types.Number,
  })
  public online: number;

  @Field(() => String)
  @Property({
    default: "",
    type: Schema.Types.String,
  })
  public birthday: string;

  @Field(() => String)
  @Property({
    default: "",
    type: Schema.Types.String,
  })
  public city: string;

  @Field(() => String)
  @Property({
    default: "",
    type: Schema.Types.String,
  })
  public hometown: string;

  // 0: -
  // 1: Single
  // 2: In a relationship
  // 3: Engaged
  // 4: Married
  // 5: In an open relationship
  // 6: Separated
  // 7: Divorced
  // 8: Widowed
  // 9: It's complicated
  @Field(() => Int)
  @Property({
    enum: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    default: 0,
    type: Schema.Types.Number,
  })
  public relationship: number;

  @Field(() => [String])
  @Property({
    default: [],
    type: Schema.Types.String,
  })
  public languages: string[];

  @Field(() => [String])
  @Property({
    default: [],
    type: Schema.Types.String,
  })
  public tags: string[];

  @Field(() => [String])
  @Property({
    default: [],
    type: Schema.Types.String,
  })
  public socials: string[];

  @Field(() => String)
  @Property({
    default: "",
    type: Schema.Types.String,
  })
  public website: string;

  @Field(() => [String])
  @Property({
    ref: "User",
    default: [],
    type: Schema.Types.ObjectId,
  })
  public followers: Ref<User>[];

  @Field(() => [String])
  @Property({
    ref: "User",
    default: [],
    type: Schema.Types.ObjectId,
  })
  public following: Ref<User>[];

  @Field(() => [String])
  @Property({
    ref: "User",
    default: [],
    type: Schema.Types.ObjectId,
  })
  public close: Ref<User>[];

  @Field(() => [String])
  @Property({
    ref: "Post",
    default: [],
    type: Schema.Types.ObjectId,
  })
  public likes: Ref<Post>[];

  @Field(() => [String])
  @Property({
    ref: "Post",
    default: [],
    type: Schema.Types.ObjectId,
  })
  public saved: Ref<Post>[];

  @Field(() => [String])
  @Property({
    ref: "Highlight",
    default: [],
    type: Schema.Types.ObjectId,
  })
  public highlights: Ref<Highlight>[];

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
  public password?: string;
}

export const UserArchiveModel = getModelForClass<typeof UserArchive>(
  UserArchive,
  {
    schemaOptions: { timestamps: true },
  }
);
