import React from "react";
import classes from "./AccordionItem.module.scss";

const AccordionItem = ({ children, title, onClick, isActive }) => {
  return (
    <div className={classes.accbar}>
      <button onClick={onClick} className={classes.barTittle}>
        <h3 className={classes.title}>{title}</h3>
        <i style={isActive ? {transform: 'rotate(45deg)'} : {}} className="fa-solid fa-plus"></i>
      </button>
      <div className={`${classes.content} ${isActive ? classes.active : ""}`}>
        {children}
      </div>
    </div>
  );
};

export default AccordionItem;
