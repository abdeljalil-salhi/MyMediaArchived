import mongoose from "mongoose";

import logger from "../utils/logger";
import { __prod__ } from "../constants";

export const MongoConnection = () => {
  // Connect to MongoDB
  mongoose
    .connect(
      __prod__
        ? `mongodb+srv://${process.env.PROD_DB_USER_PASS}@${process.env.PROD_DB_CLUSTER_ID}.mongodb.net/${process.env.PROD_DB_NAME}`
        : `mongodb+srv://${process.env.DEV_DB_USER_PASS}@${process.env.DEV_DB_CLUSTER_ID}.mongodb.net/${process.env.DEV_DB_NAME}`
    )
    // Handle successful connection to database
    .then(() =>
      logger.info(
        `[+] CONNECTED >> MongoDB >> ${
          __prod__
            ? `prod:${process.env.PROD_DB_NAME}`
            : `dev:${process.env.DEV_DB_NAME}`
        }`
      )
    )
    // Handle error when connecting to database
    .catch((err) =>
      logger.error(
        `[!] FAILED >> MongoDB >> ${
          __prod__
            ? `prod:${process.env.PROD_DB_NAME}`
            : `dev:${process.env.DEV_DB_NAME}`
        } >> ${err}`
      )
    );
};
