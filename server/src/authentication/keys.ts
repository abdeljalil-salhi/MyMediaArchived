import { PRIVATE_KEY } from "../constants";

export const privateKey = Buffer.from(PRIVATE_KEY, "base64").toString("ascii");
