import { getModelForClass, prop as Property, Ref } from "@typegoose/typegoose";
import { Schema } from "mongoose";
import { Field, ObjectType } from "type-graphql";

import { User } from "./User.model";
import { Message } from "./Message.model";

@ObjectType()
export class Conversation {
  @Field(() => String)
  readonly _id: string;

  @Field(() => String)
  @Property({
    required: [true, "User is required"],
    ref: "User",
    type: Schema.Types.ObjectId,
  })
  public owner: Ref<User>;
  @Field(() => User)
  public ownerObj: User;

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

  @Field(() => String, { nullable: true })
  @Property({
    ref: "Message",
    type: Schema.Types.ObjectId,
  })
  public lastMessage?: Ref<Message>;
  @Field(() => Message, { nullable: true })
  public lastMessageObj?: Message;

  @Field(() => String)
  @Property({
    ref: "User",
    type: Schema.Types.ObjectId,
  })
  public lastSender: Ref<User>;
  @Field(() => User)
  public lastSenderObj: User;

  @Field(() => Number)
  @Property({
    default: Date.now(),
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
