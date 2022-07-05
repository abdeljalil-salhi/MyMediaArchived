import { IsEmail } from "class-validator";
import { InputType, Field, Int } from "type-graphql";

@InputType()
export class RegisterInput {
  @Field(() => String)
  public firstName: string;

  @Field(() => String, { nullable: true })
  public middleName?: string;

  @Field(() => String)
  public lastName: string;

  @Field(() => String)
  public fullName: string;

  @Field(() => String)
  public username: string;

  @Field(() => Int)
  public gender: number;

  @IsEmail()
  @Field(() => String)
  public email: string;

  @Field(() => String)
  public password: string;

  @Field(() => Boolean, { nullable: true })
  public isAdmin?: boolean;

  @Field(() => String, { nullable: true })
  public profile?: string;

  @Field(() => String, { nullable: true })
  public cover?: string;

  @Field(() => String)
  public birthday: string;
}
