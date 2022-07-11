import { getModelForClass, prop as Property, Ref } from "@typegoose/typegoose";
import { Schema } from "mongoose";
import { Field, ObjectType } from "type-graphql";

import { User } from "./User.model";

@ObjectType()
export class Conversation {
  @Field(() => String)
  readonly _id: string;

  @Field(() => [String])
  @Property({
    ref: "User",
    default: [],
    type: Schema.Types.ObjectId,
  })
  public members: Ref<User>[];
  @Field(() => [User], {
    defaultValue: [],
  })
  public membersObj: User[];

  @Field(() => String)
  @Property({
    default: "",
    type: Schema.Types.String,
  })
  public lastMessage: String;

  @Field(() => String)
  @Property({
    ref: "User",
    type: Schema.Types.ObjectId,
  })
  public lastSender: Ref<User>;
  @Field(() => User)
  public lastSenderObj: User;

  @Field(() => Boolean)
  @Property({
    default: false,
    type: Schema.Types.Boolean,
  })
  public isRead: boolean;

  @Field(() => Number)
  @Property({
    default: 0,
    type: Schema.Types.Number,
  })
  public timestamp: number;

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

export const ConversationModel = getModelForClass<typeof Conversation>(
  Conversation,
  {
    schemaOptions: { timestamps: true },
  }
);
