import { useContext } from "react";
import {
  BrowserRouter as Router,
  Routes as Switch,
  Route,
  Navigate,
} from "react-router-dom";

import { AuthContext } from "./context/auth.context";
import { Home } from "./pages/Home";
import { Authentication } from "./pages/Authentication";
import { NotFound404 } from "./pages/NotFound404";
import { Profile } from "./pages/Profile";

const Routes = () => {
  const { user } = useContext(AuthContext);

  return (
    <Router>
      <Switch>
        <Route path="/" element={user ? <Home /> : <Authentication />} />
        <Route path="login" element={<Navigate to="/" replace />} />
        <Route path="register" element={<Navigate to="/" replace />} />
        <Route path="auth" element={<Navigate to="/" replace />} />
        <Route path="u">
          <Route path=":username" element={<Profile />} />
          <Route path="*" element={<Navigate to="/404" replace />} />
        </Route>
        <Route path="404" element={<NotFound404 />} />
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Switch>
    </Router>
  );
};

export default Routes;
