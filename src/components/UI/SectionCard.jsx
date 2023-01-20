import React from "react";
import classes from "./SectionCard";

const SectionCard = ({children, className}) => {
  return (
      <div className={`${classes.cardWrapper} ${className}`}>
        {children}
      </div>
  );
};

export default SectionCard;
