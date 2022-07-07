import { Field, ObjectType } from "type-graphql";

import { ErrorResponse } from "./error.res";
import { ForgotPasswordToken } from "../../models/ForgotPasswordToken.model";

@ObjectType()
export class TokenResponse {
  @Field(() => [ErrorResponse], { nullable: true })
  errors?: ErrorResponse[] | null;

  @Field(() => ForgotPasswordToken, { nullable: true })
  token?: ForgotPasswordToken | null;
}
