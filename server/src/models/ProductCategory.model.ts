import { prop as Property, Ref, getModelForClass } from "@typegoose/typegoose";
import { MaxLength, MinLength } from "class-validator";
import { Schema } from "mongoose";
import { ObjectType, Field } from "type-graphql";

import { User } from "./User.model";

@ObjectType()
export class ProductCategory {
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

  @MinLength(3, {
    message: "Category name must be at least 3 characters long",
  })
  @MaxLength(50, {
    message: "Category name cannot be longer than 50 characters",
  })
  @Field(() => String)
  @Property({
    required: [true, "Category name is required"],
    trim: true,
    unique: true,
    type: Schema.Types.String,
  })
  public name: string;

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

export const ProductCategoryModel = getModelForClass<typeof ProductCategory>(
  ProductCategory,
  {
    schemaOptions: { timestamps: true },
  }
);
