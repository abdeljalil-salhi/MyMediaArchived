import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class ShippingAddress {
  @Field(() => String)
  public fullName: string;

  @Field(() => String)
  public phone: string;

  @Field(() => String)
  public address: string;

  @Field(() => String)
  public city: string;

  @Field(() => String)
  public state: string;

  @Field(() => String)
  public zip: string;

  @Field(() => String)
  public country: string;

  @Field(() => Number, { nullable: true })
  public latitude?: number;

  @Field(() => Number, { nullable: true })
  public longitude?: number;
}
