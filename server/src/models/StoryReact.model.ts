import { prop as Property, Ref, getModelForClass } from "@typegoose/typegoose";
import { Schema } from "mongoose";
import { ObjectType, Field, Int } from "type-graphql";

import { User } from "./User.model";
import { Story } from "./Story.model";

@ObjectType()
export class StoryReact {
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
    required: [true, "Story is required"],
    ref: "Story",
    type: Schema.Types.ObjectId,
  })
  public storyId: Ref<Story>;

  @Field(() => Int)
  @Property({
    enum: [0, 1, 2, 3, 4, 5],
    default: 0,
    type: Schema.Types.Number,
  })
  public react: number;

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

export const StoryReactModel = getModelForClass<typeof StoryReact>(StoryReact, {
  schemaOptions: { timestamps: true },
});
