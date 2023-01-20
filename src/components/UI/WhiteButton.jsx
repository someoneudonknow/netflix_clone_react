import React from "react";
import classes from './WhiteButton.module.scss';
import { PlaySVG } from ".././SVG" 

const WhiteButton = ({children, className, ...rest}) => {
  return (
    <button {...rest} className={`${classes.button} ${className}`}>
      <PlaySVG/>
      <span>{children}</span>
    </button>
  );
};

export default WhiteButton;
