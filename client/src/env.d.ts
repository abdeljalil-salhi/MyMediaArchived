declare global {
  namespace NodeJS {
    interface ProcessEnv {
      REACT_APP_CLIENT_URL: string;
      REACT_APP_UPLOADS_URL: string;
      REACT_APP_API_URL: string;
    }
  }
}

export {}
