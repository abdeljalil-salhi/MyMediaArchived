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
import { Dispatch } from "redux";
import { Link } from "react-router-dom";

import { AuthContext } from "../../context/auth.context";
import { useRegisterMutation } from "../../generated/graphql";
import {
  registerFailure,
  registerStart,
  registerSuccess,
} from "../../context/actions/auth.actions";
import { Register_register } from "../../generated/types/Register";
import { setProfile } from "../../store/slices/profileSlice";
import { TProfile } from "../../store/types/profileTypes";
import { useAppDispatch } from "../../store/hooks";
import { updateLocalStorage } from "../../utils/localStorage";
import { USER } from "../../globals";

interface RegisterProps {
  goToLogin: () => void;
}

const actionDispatch = (dispatch: Dispatch) => ({
  setProfile: (profile: TProfile) => dispatch(setProfile(profile)),
});

export const Register: FC<RegisterProps> = ({ goToLogin }) => {
  // The Register component is used to register a new user.
  //
  // Props:
  // goToLogin: the function to go to the login page
  //
  // Notes:
  // - The register form is displayed when the user is not logged in
  // - The form is submitted when the user clicks the "Register" button
  // - We will be redirecting the user to the home page when the register is successful
  // - We will be opening the login page when the user clicks the "Login" button

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

  const { dispatch } = useContext(AuthContext);

  // The dispatch function to update the profile state in the store (Redux)
  const { setProfile } = actionDispatch(useAppDispatch());

  /*
   * @example
   * const [registerMutation, { data, loading, error }] = useRegisterMutation({
   *   variables: {
   *      firstName: // value for 'firstName'
   *      middleName: // value for 'middleName'
   *      lastName: // value for 'lastName'
   *      fullName: // value for 'fullName'
   *      username: // value for 'username'
   *      gender: // value for 'gender'
   *      email: // value for 'email'
   *      password: // value for 'password'
   *      birthday: // value for 'birthday'
   *   },
   * });
   */
  const [register] = useRegisterMutation();

  // Go to the next step in the register form
  const nextStep = (e: any) => {
    // Prevent the form from submitting normally (which would refresh the page)
    e.preventDefault();

    // Switch the page to the next one
    setFirstStep(false);
    setSecondStep(true);
  };

  // the handleSubmit function is called when the user clicks the "Register" button
  const handleSubmit = async (e: any) => {
    // Prevent the form from submitting normally (which would refresh the page)
    e.preventDefault();

    // Start the loading animation and clear any previous errors
    setIsFetching(true);
    setErrorOpened(false);
    setError("");

    // Change the spaces in the name with points
    let firstNameTest = firstName
      .trim()
      .replace(/\s{2,}/g, " ")
      .replace(" ", ".");
    let lastNameTest = lastName
      .trim()
      .replace(/\s{2,}/g, " ")
      .replace(" ", ".");

    // Create a the username based on the first name, last name and a random 4 digit number
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
          setProfile(res.data?.register as Register_register);
          // Store the registered user in local storage
          updateLocalStorage(USER, {
            _id: res.data?.register.user._id,
            username: res.data?.register.user.username,
            accessToken: res.data?.register.user.accessToken as string | null,
          });
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
    // Stop the loading animation
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
