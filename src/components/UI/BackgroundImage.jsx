import React from "react";
import classes from "./BackgroundImage.module.scss";
import logo from "../../assets/images/netflix_logo.png";
import { Link } from "react-router-dom";

const BackgroundImage = ({ src, children, className }) => {
  return (
    <div
      className={`${classes.container} ${className}`}
      style={{
        background: `linear-gradient(to top,rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.4) 50%,rgba(0,0,0,0.9) 100%),
                     url(${src}) no-repeat center/cover`,
      }}
    >
      <Link to="/vn">
        <img src={logo} alt="logo" />
      </Link>
      {children}
    </div>
  );
};

export default BackgroundImage;
