import { prop as Property, Ref, getModelForClass } from "@typegoose/typegoose";
import { Schema } from "mongoose";
import { ObjectType, Field } from "type-graphql";

import { Story } from "./Story.model";
import { User } from "./User.model";

@ObjectType()
export class StoryShare {
  @Field(() => String)
  readonly _id: string;

  @Field(() => User)
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

export const StoryShareModel = getModelForClass<typeof StoryShare>(StoryShare, {
  schemaOptions: { timestamps: true },
});
