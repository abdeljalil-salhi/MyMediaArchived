import { ObjectType, Field } from "type-graphql";

@ObjectType()
export default class ErrorResponse {
  @Field(() => String, { nullable: true })
  field: string;

  @Field(() => String, { nullable: true })
  message: string;
}
