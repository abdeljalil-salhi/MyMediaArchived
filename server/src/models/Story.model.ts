import { getModelForClass, prop as Property, Ref } from "@typegoose/typegoose";
import { MaxLength } from "class-validator";
import { Schema } from "mongoose";
import { Field, ObjectType } from "type-graphql";

import { User } from "./User.model";
import { Feeling } from "./Feeling.model";
import { StoryReact } from "./StoryReact";

@ObjectType()
export class Story {
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

  @Field(() => [String])
  @Property({
    ref: "User",
    default: [],
    type: Schema.Types.ObjectId,
  })
  public views: Ref<User>[];
  @Field(() => [User], {
    defaultValue: [],
  })
  public viewsObj: User[];

  @MaxLength(500, {
    message: "Story text must not be longer than 500 characters",
  })
  @Field(() => String)
  @Property({
    trim: true,
    type: Schema.Types.String,
  })
  public text?: String;

  @Field(() => String)
  @Property({
    type: Schema.Types.String,
  })
  public picture?: String;

  @Field(() => String)
  @Property({
    type: Schema.Types.String,
  })
  public video?: String;

  @Field(() => String)
  @Property({
    type: Schema.Types.String,
  })
  public link?: String;

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
    ref: "User",
    default: [],
    type: Schema.Types.ObjectId,
  })
  public mentions: Ref<User>[];
  @Field(() => [User], {
    defaultValue: [],
  })
  public mentionsObj: User[];

  @Field(() => String)
  @Property({
    trim: true,
    type: Schema.Types.String,
  })
  public location?: string;

  @Field(() => String)
  @Property({
    trim: true,
    type: Schema.Types.String,
  })
  public hashtag?: string;

  @Field(() => [String])
  @Property({
    ref: "StoryReact",
    default: [],
    type: Schema.Types.ObjectId,
  })
  public reacts: Ref<StoryReact>[];
  @Field(() => [StoryReact], {
    defaultValue: [],
  })
  public reactsObj: StoryReact[];

  @Field(() => Boolean)
  @Property({
    default: false,
    type: Schema.Types.Boolean,
  })
  public isQuestions: boolean;

  // TODO
  public questions: string[];
  public shares: string[];
  public reports: string[];

  @Field(() => Date)
  @Property({
    default: Date.now() + 86400 * 1000,
    // Expires after 24 hours
    expires: 86400,
    type: Schema.Types.Date,
  })
  public expiresAt: Date;

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

export const StoryModel = getModelForClass<typeof Story>(Story, {
  schemaOptions: { timestamps: true },
});
