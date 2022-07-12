import { prop as Property, Ref, getModelForClass } from "@typegoose/typegoose";
import { MaxLength } from "class-validator";
import { Schema } from "mongoose";
import { ObjectType, Field } from "type-graphql";

import { User } from "./User.model";
import { Product } from "./Product.model";

@ObjectType()
export class ProductReview {
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
    required: [true, "Product is required"],
    ref: "Product",
    type: Schema.Types.ObjectId,
  })
  public product: Ref<Product>;
  @Field(() => Product)
  public productObj: Product;

  @MaxLength(512, {
    message: "Bio cannot be longer than 512 characters",
  })
  @Field(() => String)
  @Property({
    required: [true, "Comment is required"],
    trim: true,
    type: Schema.Types.String,
  })
  public comment: string;

  @Field(() => Number)
  @Property({
    required: [true, "Rating is required"],
    type: Schema.Types.Number,
  })
  public rating: number;

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

export const ProductReviewModel = getModelForClass<typeof ProductReview>(
  ProductReview,
  {
    schemaOptions: { timestamps: true },
  }
);
