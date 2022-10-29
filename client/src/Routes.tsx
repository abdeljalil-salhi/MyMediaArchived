import { useContext, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes as Switch,
  Route,
  Navigate,
} from "react-router-dom";
import { createSelector } from "@reduxjs/toolkit";
import { Dispatch } from "redux";

import { AuthContext } from "./context/auth.context";
import { Home } from "./pages/Home";
import { Authentication } from "./pages/Authentication";
import { NotFound404 } from "./pages/NotFound404";
import { Profile } from "./pages/Profile";
import { GetProfile_getProfile } from "./generated/types/GetProfile";
import profileService from "./store/services/profileService";
import { setProfile } from "./store/slices/profileSlice";
import { useAppDispatch, useAppSelector } from "./store/hooks";
import { isEmpty } from "./utils/isEmpty";
import { makeSelectProfile } from "./store/selectors/profileSelector";
import { TProfile } from "./store/types/profileTypes";
import { Direct } from "./pages/Direct";

const stateSelector = createSelector(makeSelectProfile, (profile) => ({
  profile: profile?.user,
}));

const actionDispatch = (dispatch: Dispatch) => ({
  setProfile: (profile: TProfile) => dispatch(setProfile(profile)),
});

const Routes = () => {
  const { user } = useContext(AuthContext);

  const { profile } = useAppSelector(stateSelector);

  // The dispatch function to update the profile state in the store (Redux)
  const { setProfile } = actionDispatch(useAppDispatch());

  // The useEffect hook below is used to fetch the user's profile data
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        // Send the GraphQL getProfile request to the server
        const res: GetProfile_getProfile = (await profileService
          .getProfile(user.username as string)
          .catch((_: unknown) => {})) as GetProfile_getProfile;
        // If the request was successful, update the user's profile reducer
        setProfile(res);
      } catch (_: unknown) {}
    };
    isEmpty(profile) && fetchProfile();
  }, [profile, setProfile, user]);

  return (
    <Router>
      <Switch>
        <Route path="/" element={user ? <Home /> : <Authentication />} />
        <Route path="login" element={<Navigate to="/" replace />} />
        <Route path="register" element={<Navigate to="/" replace />} />
        <Route path="auth" element={<Navigate to="/" replace />} />
        <Route path="u">
          <Route path=":username" element={<Profile />} />
          <Route path="" element={<Navigate to="/" replace />} />
          <Route path="*" element={<Navigate to="/404" replace />} />
        </Route>
        <Route path="inbox">
          <Route path="" element={<Direct />} />
          <Route path=":username" element={<Direct />} />
          <Route path="*" element={<Navigate to="/inbox" replace />} />
        </Route>
        <Route path="404" element={<NotFound404 />} />
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Switch>
    </Router>
  );
};

export default Routes;
