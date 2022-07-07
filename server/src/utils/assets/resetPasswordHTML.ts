import { CLIENT_URL } from "../../constants";

export const resetPasswordHTML = (token: string) => {
  return `
  <a href="${CLIENT_URL}/change-password/${token}">
    <button style="background-color:orange">Reset Password</button>
  </a>
  `;
};
