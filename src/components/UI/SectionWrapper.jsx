import React from "react";
import classes from "./SectionWrapper.module.scss";

const SectionWrapper = ({ children, className }) => {
  return (
    <div className={`${classes.sectionWrapper} ${className}`}>
      <div className={classes.contentWrapper}>{children}</div>
    </div>
  );
};

export default SectionWrapper;
