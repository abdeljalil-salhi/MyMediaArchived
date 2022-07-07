import "reflect-metadata";

import http from "http";
import path from "path";
import cors from "cors";
import express from "express";
import compression from "compression";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import {
  ApolloServerPluginLandingPageGraphQLPlayground,
  ApolloServerPluginLandingPageProductionDefault,
} from "apollo-server-core";

/* @ts-ignore */
import graphqlUploadExpress from "graphql-upload/graphqlUploadExpress.js";

import logger from "./utils/logger";
import { MongoConnection } from "./config/db";
import { CLIENT_URL, PORT, __prod__ } from "./constants";
import { resolvers } from "./resolvers";
import { userLoader } from "./dataloaders/user.loader";
import { TypegooseMiddleware } from "./middlewares/Typegoose";

const main = async () => {
  // Connect to the MongoDB database
  MongoConnection();

  // Initialize the Express app
  const app = express();

  // Cross-origin resource sharing
  const corsOptions = {
    origin: CLIENT_URL,
    credentials: true,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
  };
  app.use(cors(corsOptions));

  // GZIP compression options (for >50Kb)
  app.use(
    compression({
      level: 6,
      threshold: 50 * 1024,
      filter: (req, res) => {
        if (req.headers["x-no-compression"]) {
          return false;
        }
        return compression.filter(req, res);
      },
    })
  );

  // Access Control settings
  app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET,POST,PUT,DELETE,PATCH,OPTIONS"
    );
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Content-Type, Authorization"
    );
    if (req.method === "OPTIONS") {
      return res.sendStatus(200);
    }
    next();
    return;
  });

  // Express web framework - Cookie parser (JWT)
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Trust proxy settings
  app.set("trust proxy", 1);

  // Apollo server configuration
  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers,
      validate: false,
      authChecker: undefined,
      globalMiddlewares: [TypegooseMiddleware],
    }),
    context: ({ req }) => ({
      authentication: req.headers.authentication || "",
      userLoader: userLoader(),
    }),
    plugins: [
      __prod__
        ? ApolloServerPluginLandingPageProductionDefault()
        : ApolloServerPluginLandingPageGraphQLPlayground(),
    ],
  });

  // Start the Apollo server
  await apolloServer.start();

  // GraphQL Upload middleware
  app.use(graphqlUploadExpress({ maxFileSize: 10000000, maxFiles: 10 }));

  // Apollo server middleware
  apolloServer.applyMiddleware({
    app,
    cors: false,
  });

  // Main route
  app.get("/", (_, res) => {
    res.json({
      status: 200,
      message: "server is running",
    });
  });

  // Serve uploaded files from the /uploads directory
  app.use("/uploads", express.static(path.join(__dirname, "../uploads/")));

  // Create a new HTTP server
  const server: http.Server = http.createServer(app);
  server.on("error", (e: any) => {
    if (e.code === "EADDRINUSE") {
      logger.error(`[!] EADDRINUSE >> ${PORT} in use >> Retrying...`);
      setTimeout(() => {
        server.close();
        server.listen(PORT, () => {
          logger.info(`[+] CONNECTED >> localhost >> ${PORT}`);
        });
      }, 1000);
    }
  });

  // Listening for connections
  server.listen(PORT, () => {
    logger.info(`[+] CONNECTED >> localhost >> ${PORT}`);
  });
};

// Bootstrap the application
main().catch((err) => {
  logger.fatal(err);
  process.exit(1);
});
