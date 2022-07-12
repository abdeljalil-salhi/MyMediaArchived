import { prop as Property, Ref, getModelForClass } from "@typegoose/typegoose";
import { Schema } from "mongoose";
import { ObjectType, Field } from "type-graphql";

import { User } from "./User.model";
import { Message } from "./Message.model";

@ObjectType()
export class MessageReact {
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
    required: [true, "Message is required"],
    ref: "Message",
    type: Schema.Types.ObjectId,
  })
  public messageId: Ref<Message>;

  @Field(() => String)
  @Property({
    default: "love",
    type: Schema.Types.String,
  })
  public react: string;

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

export const MessageReactModel = getModelForClass<typeof MessageReact>(MessageReact, {
  schemaOptions: { timestamps: true },
});
