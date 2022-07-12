import { getModelForClass, prop as Property, Ref } from "@typegoose/typegoose";
import { Schema } from "mongoose";
import { Field, ObjectType } from "type-graphql";

import { User } from "./User.model";
import { Conversation } from "./Conversation.model";
import { MessageReact } from "./MessageReact.model";

@ObjectType()
export class Message {
  @Field(() => String)
  readonly _id: string;

  @Field(() => String)
  @Property({
    ref: "Conversation",
    type: Schema.Types.ObjectId,
  })
  public conversationId: Ref<Conversation>;

  @Field(() => String)
  @Property({
    ref: "User",
    type: Schema.Types.ObjectId,
  })
  public sender: Ref<User>;
  @Field(() => User)
  public senderObj: User;

  @Field(() => String)
  @Property({
    trim: true,
    type: Schema.Types.String,
  })
  public text?: String;

  @Field(() => String)
  @Property({
    trim: true,
    type: Schema.Types.String,
  })
  public picture?: String;

  @Field(() => String)
  @Property({
    trim: true,
    type: Schema.Types.String,
  })
  public video?: String;

  @Field(() => String)
  @Property({
    trim: true,
    type: Schema.Types.String,
  })
  public file?: String;

  @Field(() => String)
  @Property({
    trim: true,
    type: Schema.Types.String,
  })
  public link?: String;

  @Field(() => String)
  @Property({
    trim: true,
    type: Schema.Types.String,
  })
  public ytvideo?: String;

  @Field(() => Boolean)
  @Property({
    default: false,
    type: Schema.Types.Boolean,
  })
  public isDeleted: boolean;

  @Field(() => [String])
  @Property({
    ref: "MessageReact",
    default: [],
    type: Schema.Types.ObjectId,
  })
  public reacts: Ref<MessageReact>[];
  @Field(() => [MessageReact], {
    defaultValue: [],
  })
  public reactsObj: MessageReact[];

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

export const MessageModel = getModelForClass<typeof Message>(Message, {
  schemaOptions: { timestamps: true },
});
