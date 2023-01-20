import React from "react";
import classes from "./Accordion.module.scss";
import { Children, cloneElement } from "react";
import { useState } from "react";

const Accordion = ({ children }) => {
  const [selected, setSelected] = useState();
  const childArray = Children.toArray(children);

  const toggle = (i) => {
    if (selected == i) {
      return setSelected(null);
    }
    setSelected(i);
  };

  return (
    <div className={classes.accordionWrapper}>
      {Children.map(childArray, (child, i) => {
        return cloneElement(child, {
          onClick: () => toggle(i),
          isActive: selected === i,
          ...child.props,
        });
      })}
    </div>
  );
};

export default Accordion;
