import { InputType, Field } from "type-graphql";

@InputType()
export class CreateMessageInput {
  @Field(() => String)
  public conversationSender: string;

  @Field(() => String)
  public conversationReceiver: string;

  @Field(() => String)
  public sender: string;

  @Field(() => String, { nullable: true })
  public text?: string;

  @Field(() => String, { nullable: true })
  public picture?: string;

  @Field(() => String, { nullable: true })
  public video?: string;

  @Field(() => String, { nullable: true })
  public audio?: string;

  @Field(() => String, { nullable: true })
  public file?: string;

  @Field(() => String, { nullable: true })
  public link?: string;

  @Field(() => String, { nullable: true })
  public ytvideo?: string;

  @Field(() => String, { nullable: true })
  public location?: string;

  @Field(() => String, { nullable: true })
  public GIF?: string;

  @Field(() => String, { nullable: true })
  public sticker?: string;

  @Field(() => String, { nullable: true })
  public profile?: string;
}
