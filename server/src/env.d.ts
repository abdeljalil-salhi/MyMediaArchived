declare global {
  namespace NodeJS {
    interface ProcessEnv {
      CLIENT_URL: string;
      PROD_DB_USER_PASS: string;
      PROD_DB_CLUSTER_ID: string;
      PROD_DB_NAME: string;
      DEV_DB_USER_PASS: string;
      DEV_DB_CLUSTER_ID: string;
      DEV_DB_NAME: string;
      PORT: string;
      SESSION_SECRET: string;
      PRIVATE_KEY: string;
    }
  }
}

export {}
