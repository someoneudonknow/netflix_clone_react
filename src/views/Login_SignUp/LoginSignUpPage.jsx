import React, { Fragment } from "react";
import { Outlet } from "react-router-dom";
import { BackgroundImage } from "../../components/UI";
import loginBackground from "../../assets/images/welcome_header_img.jpg";
import { WelcomeFooterLayout } from "../../components/layout";
import { SelectButton, Selection } from "../../components/SelectButton";
import classes from "./LoginSignUpPage.module.scss";

const LoginSignUpPage = () => {
  const handleSelect = (data) => {
    console.log(data);
  };

  return (
    <Fragment>
      <BackgroundImage src={loginBackground} className={classes.background}>
        <div>
          <Outlet />
        </div>
        <WelcomeFooterLayout className={classes.loginFooter}>
          <ul className={classes.questionsList}>
            <li>
              <a className="text-muted" href="/home">FAQ</a>
            </li>
            <li>
              <a className="text-muted" href="/home">Help Center</a>
            </li>
            <li>
              <a className="text-muted" href="/home">Terms of Use</a>
            </li>
            <li>
              <a className="text-muted" href="/home">Privacy</a>
            </li>
            <li>
              <a className="text-muted" href="/home">Cookie Preferences</a>
            </li>
            <li>
              <a className="text-muted" href="/home">Corporate Information</a>
            </li>
          </ul>
          <SelectButton className={classes.selectBtn} onSelect={handleSelect}>
            <Selection init className={classes.selection} data="en">
              {" "}
              English{" "}
            </Selection>
            <Selection className={classes.selection} data="vn">
              {" "}
              Tiếng Việt{" "}
            </Selection>
          </SelectButton>
        </WelcomeFooterLayout>
      </BackgroundImage>
    </Fragment>
  );
};

export default LoginSignUpPage;
