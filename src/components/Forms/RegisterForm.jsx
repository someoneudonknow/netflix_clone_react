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
  const [isPhoneNumberFocused, setIsPhoneNumberFocused] = useState(false);
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

  const handlePhoneNumberFocus = () => {
    setIsPhoneNumberFocused(true);
  };

  const handlePhoneNumberBlur = (e) => {
    if (e.target.value === "") {
      setIsPhoneNumberFocused(false);
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
      const docRef = await setDoc(doc(db, "users", `${user.uid}`), {
        displayName: user?.displayName,
        email: user.email,
        photoUrl: user?.photoURL,
        uid: user.uid,
        providerId: user.providerData[0].providerId,
        phoneNumber,
        wishList: [],
      });

      navigate("/vn/home/" + credentialUser.user.uid);
    } catch (error) {
      switch (error.code) {
        case "auth/too-many-requests":
          setIsError("Quá nhiều yêu cầu vui lòng chờ giây lát rồi thử lại");
          break;
        case "auth/email-already-in-use":
          setIsError("Email đã được sử dụng");
          break;
        default:
          setIsError("Tạo tài khoản thất bại vui lòng thử lại sau");
          break;
      }
    }
    setIsLoading(false);
  };

  return (
    <FormWrapper className={classes.loginForm}>
      <h1 className="h1 text-light mb-5">Đăng kí</h1>
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
          <label htmlFor="email">Nhập email</label>
          <small className={classes.errorMessage}>
            {errors.email?.type === "required" && "Vui lòng nhập email"}
            {errors.email?.type === "pattern" &&
              "Vui lòng nhập đúng định dạng email"}
          </small>
        </div>
        <div
          className={`${classes.formControl} ${
            isPhoneNumberFocused ? classes.focusInput : ""
          } ${errors.email ? classes.invalid : ""}`}
        >
          <input
            {...register("phoneNumber", {
              required: true,
              pattern:
                /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/,
              maxLength: 10,
              onBlur: handlePhoneNumberBlur,
            })}
            name="phoneNumber"
            onFocus={handlePhoneNumberFocus}
            className="text-bg-dark rounded"
            type="text"
            id="phoneNumber"
          />
          <label htmlFor="phoneNumber">Nhập số điện thoại</label>
          <small className={classes.errorMessage}>
            {errors.phoneNumber?.type === "required" &&
              "Vui lòng nhập số điện thoại"}
            {errors.phoneNumber?.type === "pattern" &&
              "Vui lòng nhập đúng định dạng số điện thoại"}
            {errors.phoneNumber?.type === "maxLength" &&
              "Số điện thoại phải bé hơn 10 số"}
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
              {isPasswordShow ? "Ẩn" : "Hiện"}
            </button>
          )}
          <label htmlFor="password">Mật khẩu</label>
          <small className={classes.errorMessage}>
            {errors.password?.type === "required" && "Vui lòng nhập mật khẩu"}
            {errors.password?.type === "minLength" &&
              "Vui lòng nhập mật khẩu lớn hơn 4 ký tự và bé hơn 60 kí tự"}
            {errors.password?.type === "maxLength" &&
              "Vui lòng nhập mật khẩu lớn hơn 4 ký tự và bé hơn 60 kí tự"}
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
              {isPasswordConfirmShow ? "Ẩn" : "Hiện"}
            </button>
          )}
          <label htmlFor="passwordConfirmation">Xác nhận mật khẩu</label>
          <small className={classes.errorMessage}>
            {errors.passwordConfirmation?.type === "required" &&
              "Vui xác nhận mật khẩu"}
            {errors.passwordConfirmation?.type === "validate" &&
              "Mật khẩu xác nhận sai"}
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
            {!isLoading && "Đăng kí"}
          </Button>
        </ButtonGroup>
        <p className="h3 text-light">
          Đã có tài khoản
          <Link to="/vn/login_register/login" className="text-decoration-none">
            {" "}
            Đăng nhập
          </Link>
        </p>
      </form>
    </FormWrapper>
  );
};

export default RegisterForm;
