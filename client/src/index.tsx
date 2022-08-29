import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { createUploadLink } from "apollo-upload-client";

import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "./styles/index.scss";
import { PA } from "./globals";

const client = new ApolloClient({
  link: createUploadLink({
    uri: `${PA as string}graphql`,
  }),
  cache: new InMemoryCache(),
});

const root = createRoot(document.getElementById("root") as HTMLElement);

root.render(
  <StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </StrictMode>
);

reportWebVitals();
