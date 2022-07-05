import { ObjectType, Field } from "type-graphql";

@ObjectType()
export class ErrorResponse {
  @Field(() => String, { nullable: true })
  field: string;

  @Field(() => String, { nullable: true })
  message: string;
}
