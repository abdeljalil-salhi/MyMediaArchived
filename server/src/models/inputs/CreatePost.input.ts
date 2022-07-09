import { InputType, Field, Int } from "type-graphql";

@InputType()
export class CreatePostInput {
  @Field(() => String, { nullable: true })
  public user: string;

  @Field(() => String, { nullable: true })
  public text?: string;

  @Field(() => String, { nullable: true })
  public picture?: string;

  @Field(() => String, { nullable: true })
  public video?: string;

  @Field(() => String, { nullable: true })
  public file?: string;

  @Field(() => String, { nullable: true })
  public link?: string;

  @Field(() => String, { nullable: true })
  public ytvideo?: string;

  @Field(() => String, { nullable: true })
  public location?: string;
}

@InputType()
export class MediaInput {
  @Field(() => String, { nullable: true })
  public path?: string;

  @Field(() => String, { nullable: true })
  public mimetype?: string;
}

@InputType()
export class ReactInput {
  @Field(() => Int)
  public react: number;
}
