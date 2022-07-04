import "dotenv-safe/config";

export const __prod__ = process.env.NODE_ENV === "production";

export const PORT = process.env.PORT;
export const CLIENT_URL = process.env.CLIENT_URL;
