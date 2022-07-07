import "dotenv-safe/config";

export const __prod__ = process.env.NODE_ENV === "production";

// Global environment variables
export const PORT = process.env.PORT;
export const CLIENT_URL = process.env.CLIENT_URL;

// MongoDB constants
export const PROD_DB_USER_PASS = process.env.PROD_DB_USER_PASS;
export const PROD_DB_CLUSTER_ID = process.env.PROD_DB_CLUSTER_ID;
export const PROD_DB_NAME = process.env.PROD_DB_NAME;
export const DEV_DB_USER_PASS = process.env.DEV_DB_USER_PASS;
export const DEV_DB_CLUSTER_ID = process.env.DEV_DB_CLUSTER_ID;
export const DEV_DB_NAME = process.env.DEV_DB_NAME;

// JsonWebToken constants
export const PRIVATE_KEY = process.env.PRIVATE_KEY;

// NodeMailer constants
export const SMTP_HOST = process.env.SMTP_HOST;
export const SMTP_PORT = process.env.SMTP_PORT;
export const SMTP_AUTH = process.env.SMTP_AUTH;
export const SMTP_SENDER = '"MyMedia" <support@mymedia.com>';

// User validation constants
export const usernameLength: number = 3;
export const minPasswordLength: number = 6;
export const maxPasswordLength: number = 30;
export const passwordRegex: RegExp =
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$/;
