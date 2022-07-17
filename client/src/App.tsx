import { FC } from "react";

import Routes from "./Routes";
import { AuthContextProvider } from "./context/auth.context";
import { SocketContextProvider } from "./context/socket.context";

interface AppProps {}

const App: FC<AppProps> = () => {
  return (
    <AuthContextProvider>
      <SocketContextProvider>
        <Routes />
      </SocketContextProvider>
    </AuthContextProvider>
  );
};

export default App;
