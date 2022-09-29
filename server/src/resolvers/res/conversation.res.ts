import { Field, ObjectType } from "type-graphql";

import { ErrorResponse } from "./error.res";
import { Conversation } from "../../models/Conversation.model";

@ObjectType()
export class ConversationResponse {
  @Field(() => [ErrorResponse], { nullable: true })
  errors?: ErrorResponse[] | null;

  @Field(() => Conversation, { nullable: true })
  conversation?: Conversation | null;
}

@ObjectType()
export class ConversationsResponse {
  @Field(() => [ErrorResponse], { nullable: true })
  errors?: ErrorResponse[] | null;

  @Field(() => [Conversation], { nullable: true })
  conversations: Conversation[] | null;
}

@ObjectType()
export class PaginatedConversationsResponse {
  @Field(() => [ErrorResponse], { nullable: true })
  errors?: ErrorResponse[] | null;

  @Field(() => [Conversation], { nullable: true })
  conversations: Conversation[] | null;

  @Field(() => Boolean, { defaultValue: false })
  hasMore?: boolean | null;
}
