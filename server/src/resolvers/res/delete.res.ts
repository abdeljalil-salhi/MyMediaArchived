import { Field, ObjectType } from "type-graphql";

import { ErrorResponse } from "./error.res";
import { UserArchive } from "../../models/User.archive.model";

@ObjectType()
export class DeleteUserResponse {
  @Field(() => [ErrorResponse], { nullable: true })
  errors?: ErrorResponse[] | null;

  @Field(() => String, { nullable: true })
  info?: String | null;

  @Field(() => UserArchive, { nullable: true })
  deleted?: UserArchive | null;
}
