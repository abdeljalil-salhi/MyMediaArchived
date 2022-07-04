import "reflect-metadata";
import "dotenv-safe/config";

import logger from "./utils/logger";
import { MongoConnection } from "./config/db";

const main = async () => {
  // Connect to the MongoDB database
  MongoConnection();
};

// Bootstrap the application
main().catch((err) => {
  logger.fatal(err);
  process.exit(1);
});
