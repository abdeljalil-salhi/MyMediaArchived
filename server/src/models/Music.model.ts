import { prop as Property, getModelForClass, Ref } from "@typegoose/typegoose";
import { Schema } from "mongoose";
import { ObjectType, Field, Int } from "type-graphql";

import { User } from "./User.model";

@ObjectType()
export class Music {
  @Field(() => String)
  readonly _id: string;

  @Field(() => String)
  @Property({
    required: [true, "addedBy is required"],
    ref: "User",
    type: Schema.Types.ObjectId,
  })
  public addedBy: Ref<User>;
  @Field(() => User)
  public addedByObj: User;

  @Field(() => String)
  @Property({
    required: [true, "Title is required"],
    trim: true,
    type: Schema.Types.String,
  })
  public title: string;

  @Field(() => String)
  @Property({
    trim: true,
    default: "Unknown",
    type: Schema.Types.String,
  })
  public artist: string;

  @Field(() => String)
  @Property({
    default: "music/unknown.png",
    type: Schema.Types.String,
  })
  public picture: string;

  @Field(() => String, { nullable: true })
  @Property({
    trim: true,
    type: Schema.Types.String,
  })
  public album?: string;

  @Field(() => String, { nullable: true })
  @Property({
    trim: true,
    type: Schema.Types.String,
  })
  public genre?: string;

  @Field(() => Int)
  @Property({
    default: 0,
    type: Schema.Types.Number,
  })
  public duration: number;

  @Field(() => String)
  @Property({
    default: "music/lyrics/unknown.vtt",
    type: Schema.Types.String,
  })
  public lyrics: string;

  @Field(() => String)
  @Property({
    default: "music/unknown.mp3",
    type: Schema.Types.String,
  })
  public file: string;

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

export const MusicModel = getModelForClass<typeof Music>(Music, {
  schemaOptions: { timestamps: true },
});
