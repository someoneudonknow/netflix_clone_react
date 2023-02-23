import React from "react";
import { useForm } from "react-hook-form";
import { Button, ButtonGroup, Alert, Spinner } from "react-bootstrap";
import { useState, useEffect } from "react";
import { setDoc, doc } from "firebase/firestore";
import classes from "./RegisterForm.module.scss";
import { FormWrapper } from "../UI";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../firebase/config";

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
    setFocus,
  } = useForm({
    mode: "onTouched",
  });
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [isPasswordConfirmFocused, setIsPasswordConfirmFocused] =
    useState(false);
  const [isPasswordShow, setIsPasswordShow] = useState(true);
  const [isPasswordConfirmShow, setIsPasswordConfirmShow] = useState(false);
  const enteredPassword = watch("password");
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
    setIsPasswordShow((prevState) => !prevState);
  };

  const handleTogglePasswordConfirm = () => {
    setIsPasswordConfirmShow((prevState) => !prevState);
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

  const handlePasswordConfirmFocused = () => {
    setIsPasswordConfirmFocused(true);
  };

  const handlePasswordConfirmBlur = (e) => {
    if (e.target.value === "") {
      setIsPasswordConfirmFocused(false);
    }
  };

  const handlePasswordConfirmPaste = (e) => {
    e.preventDefault();
    return false;
  };

  const onSubmitForm = async (data) => {
    const { email, password, phoneNumber } = data;
    setIsLoading(true);
    try {
      setIsError(null);
      const credentialUser = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const { user } = credentialUser;
      await setDoc(doc(db, "users", `${user.uid}`), {
        displayName: user?.displayName || user.email,
        email: user.email,
        photoUrl: user?.photoURL,
        uid: user.uid,
        providerId: user.providerData[0].providerId,
        wishList: [],
      });

      navigate("/vn/home/" + credentialUser.user.uid);
    } catch (error) {
      switch (error.code) {
        case "auth/too-many-requests":
          setIsError("Too many requests, please try again later!");
          break;
        case "auth/email-already-in-use":
          setIsError("Email already in use!");
          break;
        default:
          setIsError("Sign up failed, please try again later!");
          break;
      }
    }
    setIsLoading(false);
  };

  return (
    <FormWrapper className={classes.loginForm}>
      <h1 className="h1 text-light mb-5">Sign up</h1>
      <form onSubmit={handleSubmit(onSubmitForm)}>
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
          <label htmlFor="email">Enter email</label>
          <small className={classes.errorMessage}>
            {errors.email?.type === "required" && "Email is required!"}
            {errors.email?.type === "pattern" &&
              "Please enter a valid email address!"}
          </small>
        </div>
        <div
          className={`${classes.formControl} ${
            isPasswordFocused ? classes.focusInput : ""
          } ${errors.password ? classes.invalid : ""} input-group`}
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
            type={isPasswordShow ? "text" : "password"}
            id="password"
          />
          {isPasswordFocused && (
            <button
              onClick={handleTogglePassword}
              type="button"
              class={`${classes.showHideBtn} text-light h3 h-100`}
            >
              {isPasswordShow ? "SHOW" : "HIDE"}
            </button>
          )}
          <label htmlFor="password">Mật khẩu</label>
          <small className={classes.errorMessage}>
            {errors.password?.type === "required" && "Password is required!"}
            {errors.password?.type === "minLength" &&
              "Please enter password greater than 4 characters and less than 60 characters!"}
            {errors.password?.type === "maxLength" &&
              "Please enter password greater than 4 characters and less than 60 characters!"}
          </small>
        </div>
        <div
          className={`${classes.formControl} ${
            isPasswordConfirmFocused ? classes.focusInput : ""
          } ${errors.passwordConfirmation ? classes.invalid : ""}`}
        >
          <input
            {...register("passwordConfirmation", {
              required: true,
              onBlur: handlePasswordConfirmBlur,
              validate: (value) => {
                return value === enteredPassword;
              },
            })}
            onPaste={handlePasswordConfirmPaste}
            name="passwordConfirmation"
            onFocus={handlePasswordConfirmFocused}
            className="text-bg-dark rounded"
            type={isPasswordConfirmShow ? "text" : "password"}
            id="passwordConfirmation"
          />
          {isPasswordConfirmFocused && (
            <button
              onClick={handleTogglePasswordConfirm}
              type="button"
              class={`${classes.showHideBtn} text-light h3 h-100`}
            >
              {isPasswordConfirmShow ? "SHOW" : "HIDE"}
            </button>
          )}
          <label htmlFor="passwordConfirmation">Password confirm</label>
          <small className={classes.errorMessage}>
            {errors.passwordConfirmation?.type === "required" &&
              "Password confirm is required!"}
            {errors.passwordConfirmation?.type === "validate" &&
              "Wrong password confirmation!"}
          </small>
        </div>
        <ButtonGroup vertical className="w-100 mt-3">
          <Button
            disabled={isLoading}
            type="submit"
            variant="danger"
            className={`w-100 rounded mb-4 ${classes.loginBtn}`}
          >
            {isLoading && <Spinner animation="border" />}
            {!isLoading && "Sign up"}
          </Button>
        </ButtonGroup>
        <p className="h3 text-light">
          Have an account?
          <Link to="/vn/login_register/login" className="text-decoration-none">
            {" "}
            Sign in
          </Link>
        </p>
      </form>
    </FormWrapper>
  );
};

export default RegisterForm;
