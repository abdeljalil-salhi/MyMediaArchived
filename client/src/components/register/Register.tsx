import { FC, useContext, useState } from "react";
import {
  Fade,
  Alert,
  IconButton,
  Button,
  RadioGroup,
  FormControlLabel,
  CircularProgress,
  Radio,
  Checkbox,
} from "@mui/material";
import {
  ReportGmailerrorred,
  Close,
  AccountCircleRounded,
  AccountCircleOutlined,
  CakeRounded,
  AlternateEmailOutlined,
  PasswordRounded,
  LockResetRounded,
  NavigateNextRounded,
} from "@mui/icons-material";
import { Link } from "react-router-dom";

import { USER } from "../../globals";
import { AuthContext } from "../../context/auth.context";
import { useRegisterMutation } from "../../generated/graphql";
import {
  registerFailure,
  registerStart,
  registerSuccess,
} from "../../context/actions/auth.actions";

interface RegisterProps {
  goToLogin: () => void;
}
export const Register: FC<RegisterProps> = ({ goToLogin }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState(0);
  const [birthday, setBirthday] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [terms, setTerms] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState("");
  const [errorOpened, setErrorOpened] = useState(false);
  const [firstStep, setFirstStep] = useState(true);
  const [secondStep, setSecondStep] = useState(false);

  const [register] = useRegisterMutation();
  const { dispatch } = useContext(AuthContext);

  const nextStep = (e: any) => {
    e.preventDefault();

    setFirstStep(false);
    setSecondStep(true);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    setIsFetching(true);
    setErrorOpened(false);
    setError("");

    let firstNameTest = firstName
      .trim()
      .replace(/\s{2,}/g, " ")
      .replace(" ", ".");
    let lastNameTest = lastName
      .trim()
      .replace(/\s{2,}/g, " ")
      .replace(" ", ".");

    setFirstName(firstName.trim().replace(/\s{2,}/g, " "));
    setLastName(lastName.trim().replace(/\s{2,}/g, " "));
    setUsername(
      `${firstNameTest.toLowerCase()}.${lastNameTest.toLowerCase()}_${Math.floor(
        1000 + Math.random() * 9000
      )}`
    );

    // Check if password and confirm password match or terms are checked
    if (password !== confirmPassword || terms === false) {
      if (password !== confirmPassword) {
        setError("Passwords don't match");
        setErrorOpened(true);
      }
      if (terms === false) {
        setError("Please read and confirm the Terms and Conditions");
        setErrorOpened(true);
      }
    } else {
      // Start the register process by dispatching the registerStart action
      dispatch(registerStart());
      try {
        // Send the GraphQL register request to the server
        const res = await register({
          variables: {
            firstName,
            lastName,
            fullName: `${firstName} ${lastName}`,
            gender,
            email,
            username,
            password,
            birthday,
          },
        });

        if (res.data?.register.user) {
          // Dispatch the register response by dispatching the registerSuccess action
          dispatch(registerSuccess(res.data?.register.user));
          // Store the registered user in local storage
          localStorage.setItem(USER, JSON.stringify(res.data?.register.user));
        } else if (res.data?.register.errors) {
          // Handle known errors and show them to the user
          setError(res.data.register.errors[0].message as string);
          setErrorOpened(true);
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
        // Dispatch the register failure by dispatching the registerFailure action
        dispatch(registerFailure());
      }
    }
    setIsFetching(false);
  };

  return (
    <div className="register">
      <div className="registerError">
        <Fade in={errorOpened} className="registerErrorAlert">
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
      <form
        className="registerBox"
        onSubmit={firstStep ? nextStep : handleSubmit}
      >
        {firstStep && (
          <>
            <div className="registerBoxInput">
              <AccountCircleRounded />
              <input
                type="text"
                placeholder="First name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                autoComplete="off"
                required
              />
            </div>
            <div className="registerBoxInput">
              <AccountCircleOutlined />
              <input
                type="text"
                placeholder="Last name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                autoComplete="off"
                required
              />
            </div>
            <div className="registerBoxInput">
              <CakeRounded />
              <input
                type="date"
                value={birthday}
                onChange={(e) => setBirthday(e.target.value)}
                autoComplete="off"
                min="1940-01-01"
                max="2012-01-01"
                required
              />
            </div>
            <div className="registerBoxRadios">
              <div>
                <small>Gender</small>
                <RadioGroup
                  name="gender"
                  value={gender}
                  onChange={(e) =>
                    setGender(parseInt((e.target as HTMLInputElement).value))
                  }
                >
                  <FormControlLabel
                    label="Male"
                    value={1}
                    control={<Radio required={true} />}
                  />
                  <FormControlLabel
                    label="Female"
                    value={2}
                    control={<Radio required={true} />}
                  />
                </RadioGroup>
              </div>
              <div>
                <small>or&nbsp;&nbsp;Select your pronouns</small>
                <RadioGroup
                  name="gender"
                  value={gender}
                  onChange={(e) =>
                    setGender(parseInt((e.target as HTMLInputElement).value))
                  }
                >
                  <FormControlLabel
                    label="he/him"
                    value={3}
                    control={<Radio required={true} />}
                  />
                  <FormControlLabel
                    label="she/her"
                    value={4}
                    control={<Radio required={true} />}
                  />
                  <FormControlLabel
                    label="they/them"
                    value={5}
                    control={<Radio required={true} />}
                  />
                </RadioGroup>
              </div>
            </div>
            <Button
              type="submit"
              variant="contained"
              className="registerBoxButton"
            >
              Next <NavigateNextRounded />
            </Button>
          </>
        )}
        {secondStep && (
          <>
            <div className="registerBoxInput">
              <AlternateEmailOutlined />
              <input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="off"
                required
              />
            </div>
            <div className="registerBoxInput">
              <PasswordRounded />
              <input
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="off"
                required
              />
            </div>
            <div className="registerBoxInput">
              <LockResetRounded />
              <input
                type="password"
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                autoComplete="off"
                required
              />
            </div>
            <div className="registerBoxTerms">
              <Checkbox
                id="terms"
                name="terms"
                checked={terms}
                onChange={(e) => setTerms(!terms)}
              />
              <label htmlFor="terms">
                I agree to the <Link to="/terms">Terms and Conditions</Link>.
              </label>
            </div>
            {isFetching ? (
              <Button className="registerBoxButton" disabled>
                <CircularProgress size="32px" />
              </Button>
            ) : (
              <Button className="registerBoxButton" type="submit">
                Sign Up
              </Button>
            )}
          </>
        )}
        <div>
          You already have an account?{" "}
          <span className="registerBoxLogin" onClick={goToLogin}>
            Log into your Account!
          </span>
        </div>
      </form>
    </div>
  );
};
