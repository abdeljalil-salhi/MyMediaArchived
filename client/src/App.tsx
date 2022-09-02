import { FC } from "react";

import Routes from "./Routes";
import { AuthContextProvider } from "./context/auth.context";
import { combineContexts } from "./combineContexts";

interface AppProps {}

interface AppContextProviderProps {
  children: any;
}

const contextProviders: FC<any>[] = [AuthContextProvider];

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
