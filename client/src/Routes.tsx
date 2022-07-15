import { useContext } from "react";
import {
  BrowserRouter as Router,
  Routes as Switch,
  Route,
  Navigate,
} from "react-router-dom";

import { AuthContext } from "./context/auth.context";

const Routes = () => {
  const { user } = useContext(AuthContext);

  return (
    <Router>
      <Switch>
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Switch>
    </Router>
  );
};

export default Routes;
