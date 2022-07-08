import { Field, ObjectType } from "type-graphql";

import { ErrorResponse } from "./error.res";

@ObjectType()
export class MediaResponse {
  @Field(() => [ErrorResponse], { nullable: true })
  errors?: ErrorResponse[] | null;

  @Field(() => MediaType, { nullable: true })
  media?: MediaType | null;
}

@ObjectType()
export class MediaType {
  @Field(() => String, { nullable: true })
  path?: string;

  @Field(() => String, { nullable: true })
  mimetype?: string;
}
