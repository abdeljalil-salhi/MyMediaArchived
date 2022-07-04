import "reflect-metadata";
import "dotenv-safe/config";

import { MongoConnection } from "./config/db";

const main = async () => {
  // Connect to the MongoDB database
  MongoConnection();
};

// Bootstrap the application
main().catch((err) => {
  console.error(err);
  process.exit(1);
});
