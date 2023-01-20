import React from "react";
import { createPortal } from "react-dom";
import classes from "./Loading.module.scss";

const LoadingAni = () => (
  <div className={classes.wrapper}>
    <div className={classes.loading}>
      <div className={classes.bulletouter}>
        <div className={classes.bulletinner}></div>
        <div className={classes.mask}></div>
        <div className={classes.dot}></div>
      </div>
    </div>
  </div>
);

const Loading = () => {
  return createPortal(<LoadingAni />, document.getElementById("portal"));
};

export default Loading;
