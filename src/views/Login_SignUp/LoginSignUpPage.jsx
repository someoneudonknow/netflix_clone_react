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
              <a className="text-muted" href="/home">Câu hỏi thường gặp</a>
            </li>
            <li>
              <a className="text-muted" href="/home">Trung tâm trợ giúp</a>
            </li>
            <li>
              <a className="text-muted" href="/home">Điều khoản sử dụng</a>
            </li>
            <li>
              <a className="text-muted" href="/home">Quyền riêng tư</a>
            </li>
            <li>
              <a className="text-muted" href="/home">Tùy chọn cookie</a>
            </li>
            <li>
              <a className="text-muted" href="/home">Thông tin doanh nghiệp</a>
            </li>
          </ul>
          <SelectButton className={classes.selectBtn} onSelect={handleSelect}>
            <Selection className={classes.selection} data="en">
              {" "}
              English{" "}
            </Selection>
            <Selection className={classes.selection} init data="vn">
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
