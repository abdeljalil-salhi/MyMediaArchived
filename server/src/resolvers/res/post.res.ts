import { Field, ObjectType } from "type-graphql";

import { ErrorResponse } from "./error.res";
import { Post } from "../../models/Post.model";

@ObjectType()
export class PostResponse {
  @Field(() => [ErrorResponse], { nullable: true })
  errors?: ErrorResponse[] | null;

  @Field(() => Post, { nullable: true })
  post?: Post | null;
}
