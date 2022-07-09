import { Field, InputType } from "type-graphql";

@InputType()
export class UpdatePostInput {
  @Field(() => String, { nullable: true })
  public text?: string;

  @Field(() => String, { nullable: true })
  public link?: string;

  @Field(() => String, { nullable: true })
  public ytvideo?: string;

  @Field(() => String, { nullable: true })
  public location?: string;

  @Field(() => Boolean, { nullable: true })
  public isEdited?: boolean;
}
