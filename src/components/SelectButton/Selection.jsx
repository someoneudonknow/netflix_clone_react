import React from "react";
import classes from "./Selection.module.scss";

const Selection = ({ children, data, onClicked, onHide, className }) => {
  const handleClicked = (e) => {
    e.stopPropagation();
    onClicked(data);
    onHide(false);
  };
  
  return (
    <button onClick={handleClicked} className={`${classes.choice} ${className}`}>
      {children}
    </button>
  );
};

export default Selection;
