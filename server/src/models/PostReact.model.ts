import { prop as Property, Ref, getModelForClass } from "@typegoose/typegoose";
import { Schema } from "mongoose";
import { ObjectType, Field, Int } from "type-graphql";

import { User } from "./User.model";
import { Post } from "./Post.model";

@ObjectType()
export class PostReact {
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
    required: [true, "Post is required"],
    ref: "Post",
    type: Schema.Types.ObjectId,
  })
  public postId: Ref<Post>;

  @Field(() => Int)
  @Property({
    enum: [0, 1, 2, 3, 4, 5],
    default: 0,
    type: Schema.Types.Number,
  })
  public react: number;

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

export const PostReactModel = getModelForClass<typeof PostReact>(PostReact, {
  schemaOptions: { timestamps: true },
});
