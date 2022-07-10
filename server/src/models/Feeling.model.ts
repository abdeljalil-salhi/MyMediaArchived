import { getModelForClass, prop as Property } from "@typegoose/typegoose";
import { Schema } from "mongoose";
import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class Feeling {
  @Field(() => String)
  readonly _id: string;

  @Field(() => String)
  @Property({
    trim: true,
    default: `unknown_${new Date().getTime()}`,
    type: Schema.Types.String,
  })
  public name?: String;

  @Field(() => String)
  @Property({
    default: "feeling/unknown.png",
    type: Schema.Types.String,
  })
  public picture?: String;

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

export const FeelingModel = getModelForClass<typeof Feeling>(Feeling, {
  schemaOptions: { timestamps: true },
});
