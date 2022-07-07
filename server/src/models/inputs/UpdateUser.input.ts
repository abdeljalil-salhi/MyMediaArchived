import { IsEmail } from "class-validator";
import { InputType, Field, Int } from "type-graphql";

@InputType()
export class UpdateUserInput {
  @Field(() => String, { nullable: true })
  public firstName?: string;

  @Field(() => String, { nullable: true })
  public middleName?: string;

  @Field(() => String, { nullable: true })
  public lastName?: string;

  @Field(() => String, { nullable: true })
  public fullName?: string;

  @Field(() => String, { nullable: true })
  public username?: string;

  @IsEmail()
  @Field(() => String, { nullable: true })
  public email?: string;

  @Field(() => String, { nullable: true })
  public password?: string;

  @Field(() => Boolean, { nullable: true })
  public isAdmin?: boolean;

  @Field(() => Boolean, { nullable: true })
  public isVerified?: boolean;

  @Field(() => Boolean, { nullable: true })
  public isSeller?: boolean;

  @Field(() => String, { nullable: true })
  public profile?: string;

  @Field(() => String, { nullable: true })
  public cover?: string;

  @Field(() => String, { nullable: true })
  public bio?: string;

  @Field(() => String, { nullable: true })
  public birthday?: string;

  @Field(() => String, { nullable: true })
  public city?: string;

  @Field(() => String, { nullable: true })
  public hometown?: string;

  @Field(() => Int, { nullable: true })
  public relationship?: number;

  @Field(() => String, { nullable: true })
  public website?: string;
}

@InputType()
export class UpdateTagsInput {
  @Field(() => String, { nullable: true })
  public userId: string;

  @Field(() => [String], { nullable: true })
  public tags: string[];
}
