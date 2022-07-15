import { FC } from "react";

import Routes from "./Routes";
import { AuthContextProvider } from "./context/auth.context";

interface AppProps {}

const App: FC<AppProps> = () => {
  return (
    <AuthContextProvider>
      <Routes />
    </AuthContextProvider>
  );
};

export default App;
