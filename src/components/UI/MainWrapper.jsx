import React from "react";
import classes from "./MainWrapper.module.scss";

const MainWrapper = ({ children, className, ...rest }) => {
  return (
    <main {...rest} className={`${classes.mainWrapper} ${className}`}>
      {children}
    </main>
  );
};

export default MainWrapper;
