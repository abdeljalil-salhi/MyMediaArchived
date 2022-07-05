import "dotenv-safe/config";

export const __prod__ = process.env.NODE_ENV === "production";

export const PORT = process.env.PORT;
export const CLIENT_URL = process.env.CLIENT_URL;
export const PROD_DB_USER_PASS = process.env.PROD_DB_USER_PASS;
export const PROD_DB_CLUSTER_ID = process.env.PROD_DB_CLUSTER_ID;
export const PROD_DB_NAME = process.env.PROD_DB_NAME;
export const DEV_DB_USER_PASS = process.env.DEV_DB_USER_PASS;
export const DEV_DB_CLUSTER_ID = process.env.DEV_DB_CLUSTER_ID;
export const DEV_DB_NAME = process.env.DEV_DB_NAME;
export const PRIVATE_KEY = process.env.PRIVATE_KEY;
