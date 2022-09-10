import { FC, useContext, useRef, useState } from "react";
import {
  Alert,
  Button,
  CircularProgress,
  Fade,
  IconButton,
} from "@mui/material";
import {
  AlternateEmail,
  Close,
  Password,
  ReportGmailerrorred,
} from "@mui/icons-material";
import { Dispatch } from "redux";

import { AuthContext } from "../../context/auth.context";
import { useLoginMutation } from "../../generated/graphql";
import {
  loginStart,
  loginSuccess,
  loginFailure,
} from "../../context/actions/auth.actions";
import { updateLocalStorageUser } from "../../utils/localStorage";
import { Login_login } from "../../generated/types/Login";
import { setProfile } from "../../store/slices/profileSlice";
import { TProfile } from "../../store/types/profileTypes";
import { useAppDispatch } from "../../store/hooks";

interface LoginProps {
  goToRegister: () => void;
}

const actionDispatch = (dispatch: Dispatch) => ({
  setProfile: (profile: TProfile) => dispatch(setProfile(profile)),
});

export const Login: FC<LoginProps> = ({ goToRegister }) => {
  // the Login component is used to log into MyMedia
  //
  // Props:
  // goToRegister: the function to go to the register page
  //
  // Notes:
  // - The login form is displayed when the user is not logged in
  // - The form is submitted when the user clicks the "Login" button
  // - We will be redirecting the user to the home page when the login is successful
  // - We will be opening the register page when the user clicks the "Register" button

  const [usernameOrEmail, setUsernameOrEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState("");
  const [errorOpened, setErrorOpened] = useState(false);

  const usernameOrEmailRef = useRef<HTMLInputElement>(null);

  const { dispatch } = useContext(AuthContext);

  // The dispatch function to update the profile state in the store (Redux)
  const { setProfile } = actionDispatch(useAppDispatch());

  /*
   * @example
   * const [loginMutation, { data, loading, error }] = useLoginMutation({
   *   variables: {
   *      usernameOrEmail: // value for 'usernameOrEmail'
   *      password: // value for 'password'
   *   },
   * });
   */
  const [login] = useLoginMutation();

  // the handleSubmit function is called when the user clicks the "Login" button
  const handleSubmit = async (e: any) => {
    // Prevent the form from submitting normally (which would refresh the page)
    e.preventDefault();

    // Start the loading animation and clear any previous errors
    setIsFetching(true);
    setErrorOpened(false);
    setError("");

    // To lowercase the username or email address before submitting it to the server
    let usernameOrEmailToLowerCase = usernameOrEmail.toLowerCase();

    // Start the login process by dispatching the loginStart action
    dispatch(loginStart());
    try {
      // Send the GraphQL login request to the server
      const res = await login({
        variables: {
          usernameOrEmail: usernameOrEmailToLowerCase,
          password,
        },
      });

      if (res.data?.login.user) {
        // Dispatch the login response by dispatching the loginSuccess action
        dispatch(loginSuccess(res.data?.login.user));
        setProfile(res.data?.login as Login_login);
        // Store the logged user in local storage
        updateLocalStorageUser({
          _id: res.data?.login.user._id,
          username: res.data?.login.user.username,
          accessToken: res.data?.login.user.accessToken as string | null,
        });
      } else if (res.data?.login.errors) {
        // Handle known errors and show them to the user
        setError(res.data.login.errors[0].message as string);
        setErrorOpened(true);
        if (res.data.login.errors[0].field === "usernameOrEmail") {
          setUsernameOrEmail("");
          setPassword("");
          usernameOrEmailRef.current?.focus();
        }
        if (res.data.login.errors[0].field === "password") setPassword("");
      } else if (res.errors) {
        // Handle unknown errors and show them to the user
        setError(
          `${
            res.errors[0].message as string
          }. Please report this error to the support.`
        );
        setErrorOpened(true);
      }
    } catch (err: unknown) {
      // Dispatch the login failure by dispatching the loginFailure action
      dispatch(loginFailure());
    }
    // Stop the loading animation
    setIsFetching(false);
  };

  return (
    <div className="login">
      <div className="loginError">
        <Fade in={errorOpened} className="loginErrorAlert">
          <Alert
            severity="error"
            icon={<ReportGmailerrorred fontSize="medium" />}
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  setErrorOpened(false);
                }}
              >
                <Close fontSize="inherit" />
              </IconButton>
            }
            sx={{ mb: 2 }}
          >
            {error}
          </Alert>
        </Fade>
      </div>
      <form className="loginBox" onSubmit={handleSubmit}>
        <div className="loginBoxInput">
          <AlternateEmail />
          <input
            placeholder="Email address or username"
            type="text"
            ref={usernameOrEmailRef}
            value={usernameOrEmail}
            onChange={(e) => setUsernameOrEmail(e.target.value)}
            required
          />
        </div>
        <div className="loginBoxInput">
          <Password />
          <input
            placeholder="Password"
            type="password"
            minLength={6}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {isFetching ? (
          <Button className="loginBoxButton" disabled>
            <CircularProgress size="32px" />
          </Button>
        ) : (
          <Button type="submit" variant="contained" className="loginBoxButton">
            Log In
          </Button>
        )}
        <span className="loginBoxForgot">Forgot Password?</span>
        <span className="loginBoxRegisterBox">
          {isFetching ? (
            <Button variant="text" className="loginBoxRegister" disabled>
              Create an Account
            </Button>
          ) : (
            <Button
              variant="text"
              className="loginBoxRegister"
              onClick={goToRegister}
            >
              Create an Account
            </Button>
          )}
        </span>
      </form>
    </div>
  );
};
