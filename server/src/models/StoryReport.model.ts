import { prop as Property, Ref, getModelForClass } from "@typegoose/typegoose";
import { Schema } from "mongoose";
import { ObjectType, Field } from "type-graphql";

import { User } from "./User.model";
import { Story } from "./Story.model";

@ObjectType()
export class StoryReport {
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

  @Field(() => String)
  @Property({
    enum: ["spam", "inappropriate", "other"],
    default: "other",
    type: Schema.Types.String,
  })
  public reason: string;

  @Field(() => String)
  @Property({
    trim: true,
    type: Schema.Types.String,
  })
  public description: string;

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

export const StoryReportModel = getModelForClass<typeof StoryReport>(
  StoryReport,
  {
    schemaOptions: { timestamps: true },
  }
);
