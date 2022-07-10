import { prop as Property, Ref, getModelForClass } from "@typegoose/typegoose";
import { Schema } from "mongoose";
import { ObjectType, Field } from "type-graphql";
import { User } from "./User.model";

@ObjectType()
export class StoryQuestion {
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
    trim: true,
    type: Schema.Types.String,
  })
  public question: String;

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

export const StoryQuestionModel = getModelForClass<typeof StoryQuestion>(
  StoryQuestion,
  {
    schemaOptions: { timestamps: true },
  }
);
