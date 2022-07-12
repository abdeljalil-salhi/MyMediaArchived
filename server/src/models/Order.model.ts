import {
  prop as Property,
  Ref,
  getModelForClass,
  Passthrough,
} from "@typegoose/typegoose";
import { Schema } from "mongoose";
import { ObjectType, Field } from "type-graphql";

import { paymentMethodENUM } from "../constants";
import { User } from "./User.model";
import { Seller } from "./Seller.model";
import { OrderItem } from "./OrderItem.model";
import { ShippingAddress } from "./ShippingAddress.model";
import { PaymentStatus } from "./PaymentStatus.model";

@ObjectType()
export class Order {
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
    required: [true, "Product seller is required"],
    ref: "Seller",
    type: Schema.Types.ObjectId,
  })
  public seller: Ref<Seller>;
  @Field(() => Seller)
  public sellerObj: Seller;

  @Field(() => [String])
  @Property({
    ref: "OrderItem",
    default: [],
    type: Schema.Types.ObjectId,
  })
  public orderItems: Ref<OrderItem>[];
  @Field(() => [OrderItem], {
    defaultValue: [],
  })
  public orderItemsObj: OrderItem[];

  @Field(() => [ShippingAddress])
  @Property({
    required: [true, "Shipping address is required"],
    default: [],
    type: () => new Passthrough(ShippingAddress, true),
  })
  public shippingAddress: {
    fullName: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    zip: string;
    country: string;
    latitude?: number;
    longitude?: number;
  };

  @Field(() => String)
  @Property({
    required: [true, "Payment method is required"],
    enum: paymentMethodENUM,
    type: Schema.Types.String,
  })
  public paymentMethod: string;

  @Field(() => PaymentStatus)
  @Property({
    required: [true, "Payment status is required"],
    type: () => new Passthrough(PaymentStatus, true),
  })
  public paymentStatus: {
    id: string;
    status: string;
    updateTime: string;
    email: string;
  };

  @Field(() => Number)
  @Property({
    required: [true, "Items price is required"],
    type: Schema.Types.Number,
  })
  public itemsPrice: number;

  @Field(() => Number)
  @Property({
    required: [true, "Shipping price is required"],
    type: Schema.Types.Number,
  })
  public shippingPrice: number;

  @Field(() => Number)
  @Property({
    required: [true, "Tax price is required"],
    type: Schema.Types.Number,
  })
  public taxPrice: number;

  @Field(() => Number)
  @Property({
    required: [true, "Total price is required"],
    type: Schema.Types.Number,
  })
  public totalPrice: number;

  @Field(() => Boolean)
  @Property({
    default: false,
    type: Schema.Types.Boolean,
  })
  public isPaid: boolean;

  @Field(() => Boolean)
  @Property({
    default: false,
    type: Schema.Types.Boolean,
  })
  public isDelivered: boolean;

  @Field(() => Date)
  @Property({
    type: Schema.Types.Date,
  })
  public paidAt: Date;

  @Field(() => Date)
  @Property({
    type: Schema.Types.Date,
  })
  public deliveredAt: Date;

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

export const OrderModel = getModelForClass<typeof Order>(Order, {
  schemaOptions: { timestamps: true },
});
