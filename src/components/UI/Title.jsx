import React from "react";
import classes from "./Title.module.scss"
import logo from "../../assets/images/N_logo.png"

const Title = ({fz = 2.5, children, className}) => {
  return (
    <div style={{height: `${fz + 1.5}rem`}} className={`${classes.titleWrapper} ${className}`}>
      <span>
        <img src={logo} alt="logo" />
      </span>
      <h1 style={{fontSize: `${fz}rem`}} className={classes.title}>{children}</h1>
    </div>
  );
};

export default Title;
