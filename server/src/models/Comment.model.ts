import { getModelForClass, prop as Property } from "@typegoose/typegoose";
import { Schema } from "mongoose";
import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class Comment {
  @Field(() => String)
  readonly _id: string;

  @Field(() => String)
  @Property({
    type: Schema.Types.String,
  })
  public value: string;
}

export const CommentModel = getModelForClass<typeof Comment>(Comment, {
  schemaOptions: { timestamps: true },
});
