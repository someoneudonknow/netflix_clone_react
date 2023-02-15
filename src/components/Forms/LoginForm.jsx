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
        case "auth/too-many-requests":
          setIsError("Quá nhiều yêu cầu vui lòng chờ giây lát rồi thử lại");
          break;
        case "auth/user-disabled":
          setIsError(
            "Tài khoản đã bị vô hiệu hóa vui lòng liên hệ admin để khôi phục"
          );
          break;
        case "auth/user-not-found":
          setIsError("Tài khoản không tồn tại, vui lòng tạo tài khoản mới");
          break;
        case "auth/wrong-password":
          setIsError("Sai mật khẩu");
          break;
        default:
          setIsError("Đăng nhập thất bại vui lòng thử lại sau");
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
          setIsError("Quá nhiều yêu cầu vui lòng chờ giây lát rồi thử lại");
          break;
        case "auth/user-disabled":
          setIsError(
            "Tài khoản đã bị vô hiệu hóa vui lòng liên hệ admin để khôi phục"
          );
          break;
        case "auth/user-not-found":
          setIsError("Tài khoản không tồn tại, vui lòng tạo tài khoản mới");
          break;
        case "auth/account-exists-with-different-credential":
          setIsError("Email đã được sử dụng ở phương thức đăng nhập khác");
          break;
        default:
          setIsError("Đăng nhập thất bại vui lòng thử lại sau");
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
          setIsError("Quá nhiều yêu cầu vui lòng chờ giây lát rồi thử lại");
          break;
        case "auth/user-disabled":
          setIsError(
            "Tài khoản đã bị vô hiệu hóa vui lòng liên hệ admin để khôi phục"
          );
          break;
        case "auth/user-not-found":
          setIsError("Tài khoản không tồn tại, vui lòng tạo tài khoản mới");
          break;
        case "auth/account-exists-with-different-credential":
          setIsError("Email đã được sử dụng ở phương thức đăng nhập khác");
          break;
        default:
          setIsError("Đăng nhập thất bại vui lòng thử lại sau");
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
      Tìm hiểu thêm
    </span>
  );

  const infoText = (
    <p className={`${classes.infoText} text-muted`}>
      Thông tin do Google reCAPTCHA thu thập sẽ tuân theo{" "}
      <span className={classes.linkBtn}>Chính sách Quyền riêng tư</span> và
      <span className={classes.linkBtn}> Điều khoản dịch vụ </span>của Google,
      và được dùng để cung cấp, duy trì và cải thiện dịch vụ reCAPTCHA cũng như
      các mục đích bảo mật nói chung (thông tin này không được dùng để cá nhân
      hóa quảng cáo của Google).
    </p>
  );

  return (
    <FormWrapper className={classes.loginForm}>
      <h1 className="h1 text-light mb-5">Đăng nhập</h1>
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
          <label htmlFor="email">Nhập email hoặc số điện thoại</label>
          <small className={classes.errorMessage}>
            {errors.email?.type === "required" && "Vui lòng nhập email"}
            {errors.email?.type === "pattern" &&
              "Vui lòng nhập đúng định dạng email"}
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
              {togglePassword ? "Ẩn" : "Hiện"}
            </button>
          )}
          <label htmlFor="password">Mật khẩu</label>
          <small className={classes.errorMessage}>
            {errors.password?.type === "required" && "Vui lòng nhập mật khẩu"}
            {errors.password?.type === "minLength" &&
              "Vui lòng nhập mật khẩu lớn hơn 4 ký tự và bé hơn 60 kì tự"}
            {errors.password?.type === "maxLength" &&
              "Vui lòng nhập mật khẩu lớn hơn 4 ký tự và bé hơn 60 kì tự"}
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
            {!isLoading && "Đăng nhập"}
          </Button>
          <Button
            disabled={isLoading}
            variant="outline-primary"
            className={`w-100 rounded mb-4 ${classes.loginBtn}`}
            onClick={onLoginWithFacebook}
          >
            <span>Đăng nhập với facebook</span>{" "}
            <i className="ms-3 fa-brands fa-facebook"></i>
          </Button>
          <Button
            onClick={onLoginWithGoogle}
            disabled={isLoading}
            variant="outline-light"
            className={`w-100 rounded mb-4 ${classes.loginBtn}`}
          >
            <span>Đăng nhập với google</span>{" "}
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
          Bạn mới tham gia Netflix?{" "}
          <Link className="text-light" to="/vn/login_register/register">
            Đăng ký ngay
          </Link>
        </h3>
        <p className={`text-muted`}>
          Trang này được Google reCAPTCHA bảo vệ để đảm bảo bạn không phải là
          robot.
          {!showText && loadMoreButton}
        </p>
        {infoText}
      </div>
    </FormWrapper>
  );
};

export default LoginForm;
