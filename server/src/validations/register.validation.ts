import { RegisterInput } from "../models/inputs/Register.input";

export const usernameLength: number = 3;
export const minPasswordLength: number = 6;
export const maxPasswordLength: number = 30;
export const passwordRegex: RegExp =
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$/;

export const registerValidation = (input: RegisterInput) => {
  let altPosition: number = input.email.indexOf("@");
  let dotPosition: number = input.email.lastIndexOf(".");
  if (altPosition < 1 || dotPosition - altPosition < 2)
    return [
      {
        field: "email",
        message: "invalid email",
      },
    ];

  if (input.username.length < usernameLength)
    return [
      {
        field: "username",
        message: `lower than ${usernameLength} characters`,
      },
    ];

  if (input.username.includes("@"))
    return [
      {
        field: "username",
        message: "cannot include an @",
      },
    ];

  if (input.password.length < minPasswordLength)
    return [
      {
        field: "password",
        message: `lower than ${minPasswordLength} characters`,
      },
    ];

  if (input.password.length > maxPasswordLength)
    return [
      {
        field: "password",
        message: `higher than ${maxPasswordLength} characters`,
      },
    ];

  if (passwordRegex.test(input.password))
    return [
      {
        field: "password",
        message: `at least ${minPasswordLength} characters; 1 upper case, 1 lower case, 1 digit and 1 special character`,
      },
    ];

  return null;
};
