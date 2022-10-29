import { InputType, Field } from "type-graphql";

@InputType()
export class CreateConversationInput {
  @Field(() => String)
  public sender: string;

  @Field(() => String)
  public receiver: string;
}
