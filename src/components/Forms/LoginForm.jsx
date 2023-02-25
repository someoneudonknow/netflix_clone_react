import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button, ButtonGroup, Alert, Spinner } from "react-bootstrap";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import classes from "./LoginForm.module.scss";
import { FormWrapper } from "../UI";
import { auth, fbProvider, ggProvider, db } from "../../firebase/config";

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    setFocus,
  } = useForm({
    mode: "onTouched",
  });
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [showText, setShowText] = useState(false);
  const [togglePassword, setTogglePassword] = useState(false);
  const { state } = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (state && state.email) {
      setFocus("email");
      setValue("email", state.email);
    }
  }, []);

  const handleTogglePassword = () => {
    setTogglePassword((prevState) => !prevState);
  };

  const handleEmailFocus = () => {
    setIsEmailFocused(true);
  };

  const handleEmailBlur = (e) => {
    if (e.target.value === "") {
      setIsEmailFocused(false);
    }
  };

  const handlePasswordFocus = () => {
    setIsPasswordFocused(true);
  };

  const handlePasswordBlur = (e) => {
    if (e.target.value === "") {
      setIsPasswordFocused(false);
    }
  };

  const handleLoadMoreClick = () => {
    setShowText(true);
  };

  const onLoginWithEmailPassword = async (data) => {
    const { email, password } = data;
    setIsLoading(true);
    try {
      const credentialUser = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      setIsError(null);
      navigate("/vn/home/" + credentialUser.user.uid);
    } catch (error) {
      switch (error.code) {
        case "auth/wrong-password":
          setIsError("Wrong password");
          break;
        case "auth/too-many-requests":
          setIsError("Too many requests, please try again later!");
          break;
        case "auth/user-disabled":
          setIsError("Your account is disabled!");
          break;
        case "auth/user-not-found":
          setIsError("Account not found");
          break;
        default:
          setIsError("Signing in failed, please try again later!");
          break;
      }
    }
    setIsLoading(false);
  };

  const onLoginWithFacebook = async () => {
    setIsLoading(true);
    try {
      const credentialUser = await signInWithPopup(auth, fbProvider);
      const { user } = credentialUser;
      setIsError(null);
      if (credentialUser._tokenResponse?.isNewUser) {
        await setDoc(doc(db, "users", `${user.uid}`), {
          displayName: user?.displayName,
          email: user.email,
          photoUrl: user?.photoURL,
          uid: user.uid,
          providerId: user.providerData[0].providerId,
          wishList: [],
        });
      }
      navigate("/vn/home/" + credentialUser.user.uid);
    } catch (error) {
      switch (error.code) {
        case "auth/too-many-requests":
          setIsError("Too many requests, please try again later!");
          break;
        case "auth/user-disabled":
          setIsError("Your account is disabled!");
          break;
        case "auth/user-not-found":
          setIsError("Account not found");
          break;
        case "auth/account-exists-with-different-credential":
          setIsError("Account exists with different credential!");
          break;
        default:
          setIsError("Signing in failed, please try again later!");
          break;
      }
    }
    setIsLoading(false);
  };

  const onLoginWithGoogle = async () => {
    setIsLoading(true);
    try {
      setIsError(null);
      const credentialUser = await signInWithPopup(auth, ggProvider);
      const { user } = credentialUser;
      if (credentialUser._tokenResponse?.isNewUser) {
        await setDoc(doc(db, "users", `${user.uid}`), {
          displayName: user?.displayName,
          email: user.email,
          photoUrl: user?.photoURL,
          uid: user.uid,
          providerId: user.providerData[0].providerId,
          wishList: [],
        });
      }
      navigate("/vn/home/" + credentialUser.user.uid);
    } catch (error) {
      switch (error.code) {
        case "auth/too-many-requests":
          setIsError("Too many requests, please try again later!");
          break;
        case "auth/user-disabled":
          setIsError("Your account is disabled!");
          break;
        case "auth/user-not-found":
          setIsError("Account not found");
          break;
        case "auth/account-exists-with-different-credential":
          setIsError("Account exists with different credential!");
          break;
        default:
          setIsError("Signing in failed, please try again later!");
          break;
      }
    }
    setIsLoading(false);
  };

  const loadMoreButton = (
    <span
      onClick={handleLoadMoreClick}
      className={`${classes.loadmoreBtn} ${classes.linkBtn}`}
    >
      {" "}
      Learn more.
    </span>
  );

  const infoText = (
    <p className={`${classes.infoText} text-muted`}>
      The information collected by Google reCAPTCHA is subject to the Google{" "}
      <span className={classes.linkBtn}>Privacy Policy</span> and
      <span className={classes.linkBtn}> Terms of Service </span>, and is used
      for providing, maintaining, and improving the reCAPTCHA service and for
      general security purposes (it is not used for personalized advertising by
      Google).
    </p>
  );

  return (
    <FormWrapper className={classes.loginForm}>
      <h1 className="h1 text-light mb-5">Sign In</h1>
      <form>
        {isError && (
          <Alert style={{ fontSize: "1.7rem" }} variant="danger">
            {isError}
          </Alert>
        )}
        <div
          className={`${classes.formControl} ${
            isEmailFocused ? classes.focusInput : ""
          } ${errors.email ? classes.invalid : ""}`}
        >
          <input
            {...register("email", {
              required: true,
              pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
              onBlur: handleEmailBlur,
            })}
            name="email"
            onFocus={handleEmailFocus}
            className="text-bg-dark rounded"
            type="text"
            id="email"
          />
          <label htmlFor="email">Email or phone number</label>
          <small className={classes.errorMessage}>
            {errors.email?.type === "required" && "Email is required!"}
            {errors.email?.type === "pattern" &&
              "Please enter a valid email address"}
          </small>
        </div>
        <div
          className={`${classes.formControl} ${
            isPasswordFocused ? classes.focusInput : ""
          } ${errors.password ? classes.invalid : ""} d-flex`}
        >
          <input
            {...register("password", {
              required: true,
              maxLength: 60,
              minLength: 4,
              onBlur: handlePasswordBlur,
            })}
            name="password"
            onFocus={handlePasswordFocus}
            className="text-bg-dark rounded"
            type={togglePassword ? "text" : "password"}
            id="password"
          />
          {isPasswordFocused && (
            <button
              onClick={handleTogglePassword}
              type="button"
              className={`${classes.showHideBtn} text-light h3 h-100`}
            >
              {togglePassword ? "HIDE" : "SHOW"}
            </button>
          )}
          <label htmlFor="password">Password</label>
          <small className={classes.errorMessage}>
            {errors.password?.type === "required" && "Password is required!"}
            {errors.password?.type === "minLength" &&
              "Please enter password greater than 4 characters and less than 60 characters!"}
            {errors.password?.type === "maxLength" &&
              "Please enter password greater than 4 characters and less than 60 characters"}
          </small>
        </div>
        <ButtonGroup vertical className="w-100 mt-5">
          <Button
            onClick={handleSubmit(onLoginWithEmailPassword)}
            disabled={isLoading}
            type="submit"
            variant="danger"
            className={`w-100 rounded mb-4 ${classes.loginBtn}`}
          >
            {isLoading && <Spinner animation="border" />}
            {!isLoading && "Sign In"}
          </Button>
          <Button
            disabled={isLoading}
            variant="outline-primary"
            className={`w-100 rounded mb-4 ${classes.loginBtn}`}
            onClick={onLoginWithFacebook}
          >
            <span>Sign in with facebook</span>{" "}
            <i className="ms-3 fa-brands fa-facebook"></i>
          </Button>
          <Button
            onClick={onLoginWithGoogle}
            disabled={isLoading}
            variant="outline-light"
            className={`w-100 rounded mb-4 ${classes.loginBtn}`}
          >
            <span>Sign in with google</span>{" "}
            <i className="ms-3 fa-brands fa-google"></i>
          </Button>
        </ButtonGroup>
      </form>
      <div
        className={`${classes.formText} ${
          showText ? classes.showInfoText : ""
        }`}
      >
        <h3 className={`text-muted`}>
          New to Netflix?{" "}
          <Link className="text-light" to="/vn/login_register/register">
            Sign up now
          </Link>
        </h3>
        <p className={`text-muted`}>
          This page is protected by Google reCAPTCHA to ensure you're not a bot.
          {!showText && loadMoreButton}
        </p>
        {infoText}
      </div>
    </FormWrapper>
  );
};

export default LoginForm;
