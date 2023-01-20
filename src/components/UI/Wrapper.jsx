import React from "react";
import classes from "./Wrapper.module.scss";

const Wrapper = ({ children, className, mw }) => {
  return (
    <div
      className={`${classes.row} ${className}`}
      style={{ maxWidth: mw ? `1${mw}0rem` : "160rem" }}
    >
      {children}
    </div>
  );
};

export default Wrapper;
