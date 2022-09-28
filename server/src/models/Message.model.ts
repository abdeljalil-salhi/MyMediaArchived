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

  @Field(() => [String])
  @Property({
    ref: "Conversation",
    default: [],
    type: Schema.Types.ObjectId,
  })
  public conversations: Ref<Conversation>[];

  @Field(() => String)
  @Property({
    required: [true, "Sender is required"],
    ref: "User",
    type: Schema.Types.ObjectId,
  })
  public sender: Ref<User>;
  @Field(() => User)
  public senderObj: User;

  @Field(() => String, { nullable: true })
  @Property({
    trim: true,
    type: Schema.Types.String,
  })
  public text?: String;

  @Field(() => String, { nullable: true })
  public textSnippet?: string;

  @Field(() => String, { nullable: true })
  @Property({
    trim: true,
    type: Schema.Types.String,
  })
  public picture?: String;

  @Field(() => String, { nullable: true })
  @Property({
    trim: true,
    type: Schema.Types.String,
  })
  public video?: String;

  @Field(() => String, { nullable: true })
  @Property({
    trim: true,
    type: Schema.Types.String,
  })
  public audio?: String;

  @Field(() => String, { nullable: true })
  @Property({
    trim: true,
    type: Schema.Types.String,
  })
  public file?: String;

  @Field(() => String, { nullable: true })
  @Property({
    trim: true,
    type: Schema.Types.String,
  })
  public link?: String;

  @Field(() => String, { nullable: true })
  @Property({
    trim: true,
    type: Schema.Types.String,
  })
  public ytvideo?: String;

  @Field(() => String, { nullable: true })
  @Property({
    trim: true,
    type: Schema.Types.String,
  })
  public location?: String;

  @Field(() => String, { nullable: true })
  @Property({
    trim: true,
    type: Schema.Types.String,
  })
  public GIF?: String;

  @Field(() => String, { nullable: true })
  @Property({
    trim: true,
    type: Schema.Types.String,
  })
  public sticker?: String;

  @Field(() => String, { nullable: true })
  @Property({
    ref: "User",
    type: Schema.Types.ObjectId,
  })
  public profile?: Ref<User>;
  @Field(() => User, { nullable: true })
  public profileObj?: User;

  @Field(() => Boolean)
  @Property({
    default: false,
    type: Schema.Types.Boolean,
  })
  public isRemoved: boolean;

  @Field(() => [String])
  @Property({
    ref: "User",
    default: [],
    type: Schema.Types.ObjectId,
  })
  public deletedBy: Ref<User>[];

  @Field(() => [String])
  @Property({
    ref: "User",
    default: [],
    type: Schema.Types.ObjectId,
  })
  public seenBy: Ref<User>[];

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
