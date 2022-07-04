import mongoose from "mongoose";

import logger from "../utils/logger";
import {
  DEV_DB_CLUSTER_ID,
  DEV_DB_NAME,
  DEV_DB_USER_PASS,
  PROD_DB_CLUSTER_ID,
  PROD_DB_NAME,
  PROD_DB_USER_PASS,
  __prod__,
} from "../constants";

export const MongoConnection = () => {
  // Connect to MongoDB
  mongoose
    .connect(
      __prod__
        ? `mongodb+srv://${PROD_DB_USER_PASS}@${PROD_DB_CLUSTER_ID}.mongodb.net/${PROD_DB_NAME}`
        : `mongodb+srv://${DEV_DB_USER_PASS}@${DEV_DB_CLUSTER_ID}.mongodb.net/${DEV_DB_NAME}`
    )
    // Handle successful connection to database
    .then(() =>
      logger.info(
        `[+] CONNECTED >> MongoDB >> ${
          __prod__ ? `prod:${PROD_DB_NAME}` : `dev:${DEV_DB_NAME}`
        }`
      )
    )
    // Handle error when connecting to database
    .catch((err) =>
      logger.error(
        `[!] FAILED >> MongoDB >> ${
          __prod__ ? `prod:${PROD_DB_NAME}` : `dev:${DEV_DB_NAME}`
        } >> ${err}`
      )
    );
};
