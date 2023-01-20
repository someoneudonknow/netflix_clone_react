import React from "react";
import { Button } from "bootstrap";
import classes from "./GrayButton.module.scss"

const GrayButton = ({children, className, ...rest}) => {
  return (
    <button {...rest} className={`${classes.button} ${className}`} size="lg">
      <i className="fa-solid fa-circle-info"></i>
      <span>{children}</span>
    </button>
  );
};

export default GrayButton;
