import {
  maxPasswordLength,
  minPasswordLength,
  passwordRegex,
  usernameLength,
} from "../constants";
import { UpdateUserInput } from "../models/inputs/UpdateUser.input";

export const updateUserValidation = (input: UpdateUserInput) => {
  if (input.email) {
    let altPosition: number = input.email.indexOf("@");
    let dotPosition: number = input.email.lastIndexOf(".");
    if (altPosition < 1 || dotPosition - altPosition < 2)
      return [
        {
          field: "email",
          message: "Invalid email",
        },
      ];
  }

  if (input.username) {
    if (input.username.length < usernameLength)
      return [
        {
          field: "username",
          message: `Lower than ${usernameLength} characters`,
        },
      ];

    if (input.username.includes("@"))
      return [
        {
          field: "username",
          message: "Cannot include an @",
        },
      ];
  }

  if (input.password) {
    if (input.password.length < minPasswordLength)
      return [
        {
          field: "password",
          message: `Lower than ${minPasswordLength} characters`,
        },
      ];

    if (input.password.length > maxPasswordLength)
      return [
        {
          field: "password",
          message: `Higher than ${maxPasswordLength} characters`,
        },
      ];

    // Need to be fixed
    if (passwordRegex.test(input.password))
      return [
        {
          field: "password",
          message: `At least ${minPasswordLength} characters; 1 upper case, 1 lower case, 1 digit and 1 special character`,
        },
      ];
  }

  return null;
};
