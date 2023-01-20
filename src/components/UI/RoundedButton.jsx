import React from "react";
import classes from "./RoundedButton.module.scss";

const RoundedButton = ({ className, onClick, children, ...rest }) => {
  return (
    <button onClick={onClick} {...rest} className={`${classes.roundedButton} ${className}`}>
      {children}
    </button>
  );
};

export default RoundedButton;
