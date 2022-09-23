declare global {
  namespace NodeJS {
    interface ProcessEnv {
      REACT_APP_CLIENT_URL: string;
      REACT_APP_UPLOADS_URL: string;
      REACT_APP_API_URL: string;
      REACT_APP_SOCKET_URL: string;
      REACT_APP_OPENCAGE_API: string;
      REACT_APP_OPENWEATHERMAP_API: string;
    }
  }
}

export {};
