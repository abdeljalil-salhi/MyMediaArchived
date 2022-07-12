import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class PaymentStatus {
  @Field(() => String)
  public id: string;

  @Field(() => String)
  public status: string;

  @Field(() => String)
  public updateTime: string;

  @Field(() => String)
  public email: string;
}
