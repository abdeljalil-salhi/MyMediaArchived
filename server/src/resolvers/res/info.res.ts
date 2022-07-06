import { Field, ObjectType } from "type-graphql";

import { ErrorResponse } from "./error.res";

@ObjectType()
export class InfoResponse {
  @Field(() => [ErrorResponse], { nullable: true })
  errors?: ErrorResponse[] | null;

  @Field(() => String, { nullable: true })
  info?: String | null;
}
