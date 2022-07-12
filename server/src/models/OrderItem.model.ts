import { prop as Property, Ref, getModelForClass } from "@typegoose/typegoose";
import { Schema } from "mongoose";
import { ObjectType, Field, Int } from "type-graphql";

import { User } from "./User.model";
import { Product } from "./Product.model";
import { Order } from "./Order.model";

@ObjectType()
export class OrderItem {
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
    required: [true, "Order is required"],
    ref: "Order",
    type: Schema.Types.ObjectId,
  })
  public order: Ref<Order>;
  @Field(() => Order)
  public orderObj: Order;

  @Field(() => String)
  @Property({
    required: [true, "Product is required"],
    ref: "Product",
    type: Schema.Types.ObjectId,
  })
  public product: Ref<Product>;
  @Field(() => Product)
  public productObj: Product;

  @Field(() => Int)
  @Property({
    required: [true, "Quantity is required"],
    type: Schema.Types.Number,
  })
  public quantity: number;

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

export const OrderItemModel = getModelForClass<typeof OrderItem>(OrderItem, {
  schemaOptions: { timestamps: true },
});
