import { getModelForClass, prop as Property, Ref } from "@typegoose/typegoose";
import { Schema } from "mongoose";
import { Field, ObjectType } from "type-graphql";
import { Story } from "./Story.model";

import { User } from "./User.model";

@ObjectType()
export class Highlight {
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
    trim: true,
    default: "Highlight",
    type: Schema.Types.String,
  })
  public group?: string;

  @Field(() => [Story])
  @Property({
    ref: "Story",
    default: [],
    type: Schema.Types.ObjectId,
  })
  public stories: Ref<Story>[];
  @Field(() => [User], {
    defaultValue: [],
  })
  public storiesObj: Story[];

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

export const HighlightModel = getModelForClass<typeof Highlight>(Highlight, {
  schemaOptions: { timestamps: true },
});
