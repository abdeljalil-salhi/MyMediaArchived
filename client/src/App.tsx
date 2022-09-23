import { FC, ReactNode } from "react";

import Routes from "./Routes";
import { combineContexts } from "./combineContexts";
import { AuthContextProvider } from "./context/auth.context";
import { SocketContextProvider } from "./context/socket.context";
import { WidgetsContextProvider } from "./context/widgets.context";

interface AppProps {}

interface AppContextProviderProps {
  children: ReactNode;
}

const contextProviders: FC<any>[] = [
  AuthContextProvider,
  SocketContextProvider,
  WidgetsContextProvider,
];

export const AppContextProvider: FC<AppContextProviderProps> = combineContexts(
  ...contextProviders
);

const App: FC<AppProps> = () => {
  return (
    <AppContextProvider>
      <Routes />
    </AppContextProvider>
  );
};

export default App;
