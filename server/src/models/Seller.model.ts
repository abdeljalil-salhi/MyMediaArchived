import { getModelForClass, prop as Property } from "@typegoose/typegoose";
import { IsEmail } from "class-validator";
import { Schema } from "mongoose";
import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class Seller {
  @Field(() => String)
  readonly _id: string;

  @Field(() => String)
  @Property({
    required: [true, "Seller name is required"],
    trim: true,
    type: Schema.Types.String,
  })
  public name: String;

  @Field(() => String)
  @Property({
    default: "seller/unknown.png",
    type: Schema.Types.String,
  })
  public logo: String;

  @IsEmail()
  @Field(() => String)
  @Property({
    required: [true, "Seller email is required"],
    lowercase: true,
    unique: true,
    trim: true,
    type: Schema.Types.String,
  })
  public email: string;

  @Field(() => String)
  @Property({
    default: "",
    type: Schema.Types.String,
  })
  public phone: string;

  @Field(() => String, { nullable: true })
  @Property({
    trim: true,
    type: Schema.Types.String,
  })
  public address?: string;

  @Field(() => String, { nullable: true })
  @Property({
    trim: true,
    type: Schema.Types.String,
  })
  public city?: string;

  @Field(() => String, { nullable: true })
  @Property({
    trim: true,
    type: Schema.Types.String,
  })
  public state?: string;

  @Field(() => String, { nullable: true })
  @Property({
    trim: true,
    type: Schema.Types.String,
  })
  public country?: string;

  @Field(() => String, { nullable: true })
  @Property({
    type: Schema.Types.String,
  })
  public zip?: string;

  @Field(() => String, { nullable: true })
  @Property({
    trim: true,
    type: Schema.Types.String,
  })
  public description?: string;

  @Field(() => [String])
  @Property({
    default: [],
    type: Schema.Types.String,
  })
  public socials: string[];

  @Field(() => String, { nullable: true })
  @Property({
    type: Schema.Types.String,
  })
  public website?: string;

  @Field(() => Number)
  @Property({
    default: 0,
    type: Schema.Types.Number,
  })
  public rating: number;

  @Field(() => [String])
  @Property({
    default: [],
    type: Schema.Types.String,
  })
  public reviews: string[];

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

export const SellerModel = getModelForClass<typeof Seller>(Seller, {
  schemaOptions: { timestamps: true },
});
