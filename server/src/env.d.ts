declare global {
  namespace NodeJS {
    interface ProcessEnv {
      CLIENT_URL: string;
      PROD_DB_USERNAME: string;
      PROD_DB_PASSWORD: string;
      PROD_DB_NAME: string;
      DEV_DB_USERNAME: string;
      DEV_DB_PASSWORD: string;
      DEV_DB_NAME: string;
      PORT: string;
      SESSION_SECRET: string;
      PRIVATE_KEY: string;
    }
  }
}

export {};
