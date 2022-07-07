import { getModelForClass, prop, Ref } from "@typegoose/typegoose";
import { Schema } from "mongoose";
import { Field, ObjectType } from "type-graphql";

import { User } from "./User.model";

@ObjectType()
export class ForgotPasswordToken {
  @Field(() => String)
  readonly _id: string;

  @Field(() => String)
  @prop({
    required: [true, "User is required"],
    ref: "User",
    type: Schema.Types.ObjectId,
  })
  public user: Ref<User>;
  @Field(() => User)
  public userObj: User;

  @Field(() => String)
  @prop({
    trim: true,
    unique: true,
    type: Schema.Types.String,
  })
  public token: String;

  @Field(() => Date)
  @prop({
    default: Date.now() + 86400 * 1000,
    // Expires after 24 hours
    expires: 86400,
    type: Schema.Types.Date,
  })
  public expiresAt: Date;

  @Field(() => Date)
  @prop({
    type: Schema.Types.Date,
  })
  public createdAt: Date;

  @Field(() => Date)
  @prop({
    type: Schema.Types.Date,
  })
  public updatedAt: Date;
}

export const ForgotPasswordTokenModel = getModelForClass<
  typeof ForgotPasswordToken
>(ForgotPasswordToken, {
  schemaOptions: { timestamps: true },
});
