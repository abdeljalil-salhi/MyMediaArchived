import argon2 from "argon2";
import {
  getModelForClass,
  index,
  pre,
  prop as Property,
  queryMethod,
  ReturnModelType,
  Ref,
} from "@typegoose/typegoose";
import { Schema } from "mongoose";
import { AsQueryMethod } from "@typegoose/typegoose/lib/types";
import { Field, Int, ObjectType } from "type-graphql";
import { IsEmail, MaxLength, MinLength } from "class-validator";

import { Post } from "./Post.model";
import { Highlight } from "./Highlight.model";

interface QueryHelpers {
  findByEmail: AsQueryMethod<typeof findByEmail>;
}

function findByEmail(
  this: ReturnModelType<typeof User, QueryHelpers>,
  email: User["email"]
) {
  return this.findOne({ email });
}

@pre<User>("save", async function () {
  if (!this.isModified("password")) {
    return;
  }
  const hash: string = await argon2.hash(this.password as string);
  this.password = hash;
})
@index({ email: 1 })
@queryMethod(findByEmail)
@ObjectType()
export class User {
  @Field(() => String)
  readonly _id: string;

  @MinLength(3, {
    message: "First name must be at least 3 characters long",
  })
  @MaxLength(30, {
    message: "First name cannot be longer than 30 characters",
  })
  @Field(() => String)
  @Property({
    required: [true, "First name is required"],
    trim: true,
    type: Schema.Types.String,
  })
  public firstName: string;

  @MinLength(3, {
    message: "Middle name must be at least 3 characters long",
  })
  @MaxLength(30, {
    message: "Middle name cannot be longer than 30 characters",
  })
  @Field(() => String, { nullable: true })
  @Property({
    trim: true,
    type: Schema.Types.String,
  })
  public middleName?: string;

  @MinLength(3, {
    message: "Last name must be at least 3 characters long",
  })
  @MaxLength(30, {
    message: "Last name cannot be longer than 30 characters",
  })
  @Field(() => String)
  @Property({
    required: [true, "Last name is required"],
    trim: true,
    type: Schema.Types.String,
  })
  public lastName: string;

  @MinLength(3, {
    message: "Full name must be at least 3 characters long",
  })
  @MaxLength(100, {
    message: "Full name cannot be longer than 100 characters",
  })
  @Field(() => String)
  @Property({
    required: [true, "Full name is required"],
    trim: true,
    type: Schema.Types.String,
  })
  public fullName: string;

  @MinLength(3, {
    message: "Username must be at least 3 characters long",
  })
  @MaxLength(30, {
    message: "Username cannot be longer than 30 characters",
  })
  @Field(() => String)
  @Property({
    required: [true, "Username is required"],
    trim: true,
    unique: true,
    type: Schema.Types.String,
  })
  public username: string;

  @MinLength(3, {
    message: "Nickname must be at least 3 characters long",
  })
  @MaxLength(20, {
    message: "Nickname cannot be longer than 20 characters",
  })
  @Field(() => String, { nullable: true })
  @Property({
    trim: true,
    type: Schema.Types.String,
  })
  public nickname?: string;

  @Field(() => Int)
  @Property({
    required: [true, "Gender is required"],
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

  @IsEmail()
  @Field(() => String)
  @Property({
    required: [true, "Email is required"],
    lowercase: true,
    unique: true,
    trim: true,
    type: Schema.Types.String,
  })
  public email: string;

  // Cannot be selected by GraphQL
  @MinLength(6)
  @MaxLength(1024)
  @Property({
    required: [true, "Password is required"],
    type: Schema.Types.String,
  })
  password: string;

  @Field(() => String)
  public accessToken?: string;

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

  @MaxLength(1024, {
    message: "Bio cannot be longer than 1024 characters",
  })
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
  @Field(() => [User], {
    defaultValue: [],
  })
  public followersObj: User[];

  @Field(() => [User])
  @Property({
    ref: "User",
    default: [],
    type: Schema.Types.ObjectId,
  })
  public following: Ref<User>[];
  @Field(() => [User], {
    defaultValue: [],
  })
  public followingObj: User[];

  @Field(() => [User])
  @Property({
    ref: "User",
    default: [],
    type: Schema.Types.ObjectId,
  })
  public close: Ref<User>[];
  @Field(() => [User], {
    defaultValue: [],
  })
  public closeObj: User[];

  @Field(() => [String])
  @Property({
    ref: "Post",
    default: [],
    type: Schema.Types.ObjectId,
  })
  public likes: Ref<Post>[];
  @Field(() => [Post], {
    defaultValue: [],
  })
  public likesObj: Post[];

  @Field(() => [Post])
  @Property({
    ref: "Post",
    default: [],
    type: Schema.Types.ObjectId,
  })
  public saved: Ref<Post>[];
  @Field(() => [Post], {
    defaultValue: [],
  })
  public savedObj: Post[];

  @Field(() => [Highlight])
  @Property({
    ref: "Highlight",
    default: [],
    type: Schema.Types.ObjectId,
  })
  public highlights: Ref<Highlight>[];
  @Field(() => [Highlight], {
    defaultValue: [],
  })
  public highlightsObj: Highlight[];

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

export const UserModel = getModelForClass<typeof User, QueryHelpers>(User, {
  schemaOptions: { timestamps: true },
});
