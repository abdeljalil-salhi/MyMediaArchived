import { Field, ObjectType } from "type-graphql";

import { ErrorResponse } from "./error.res";
import { User } from "../../models/User.model";

@ObjectType()
export class UserResponse {
  @Field(() => [ErrorResponse], { nullable: true })
  errors?: ErrorResponse[] | null;

  @Field(() => User, { nullable: true })
  user?: User | null;
}

@ObjectType()
export class UsersResponse {
  @Field(() => [ErrorResponse], { nullable: true })
  errors?: ErrorResponse[] | null;

  @Field(() => [User], { nullable: true })
  users: User[] | null;
}
