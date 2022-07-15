import { FC, useContext, useState } from "react";
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

import { AuthContext } from "../../context/auth.context";
import { useLoginMutation } from "../../generated/graphql";

interface LoginProps {
  goToRegister: () => void;
}

export const Login: FC<LoginProps> = ({ goToRegister }) => {
  const [usernameOrEmail, setUsernameOrEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState("");
  const [errorOpened, setErrorOpened] = useState(false);

  const [login] = useLoginMutation();
  const { dispatch } = useContext(AuthContext);

  const handleSubmit = async (e: any) => {};

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
