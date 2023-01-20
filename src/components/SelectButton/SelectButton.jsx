import React from "react";
import classes from "./SelectButton.module.scss";
import { useState, useRef, useEffect, Children, cloneElement } from "react";
import { useClickOutside } from "../../hooks";

const SelectButton = ({ onSelect, children, className }) => {
  const [text, setText] = useState(() => {
    let child = [];
    let returnData;

    if (Array.isArray(children)) {
      child = [...children];
    } else {
      child = [children];
    }

    const data = child.find((child) => child.props.init);

    if (!data) {
      returnData = child[0].props.children;
    } else {
      returnData = data.props.children;
    }

    return returnData;
  });

  const [selectedData, setSelectedData] = useState(() => {
    let child = [];
    let returnData;

    if (Array.isArray(children)) {
      child = [...children];
    } else {
      child = [children];
    }

    const data = child.find((child) => child.props.init);

    if (!data) {
      returnData = child[0].props.data;
    } else {
      returnData = data.props.data;
    }
    
    return returnData;
  });
  const [toggleOptions, setToggleOptions] = useState(false);
  const languagesBtnRef = useRef();
  const optionsRef = useRef();
  const arrayChildren = Children.toArray(children);

  useEffect(() => {
    onSelect(selectedData);
  }, [selectedData, onSelect]);

  useClickOutside(languagesBtnRef, () => {
    setToggleOptions(false);
  });

  const toggleOptionsShow = () => {
    setToggleOptions((prevState) => !prevState);
  };

  //clone current child element an add onClick and onHide props to it
  const newChild = Children.map(arrayChildren, (child) => {
    return cloneElement(child, {
      onClicked: (data) => {
        setText(child.props.children);
        setSelectedData(data);
      },
      onHide: setToggleOptions,
      ...child.props,
    });
  });

  return (
    <span
      style={{
        borderColor: toggleOptions
          ? "var(--white-color)"
          : "var(--primary-text)",
      }}
      onClick={toggleOptionsShow}
      className={`${classes.languagesChosseBtn} ${className}`}
      ref={languagesBtnRef}
    >
      <div className={classes.languagesBtnContent}>
        <i className="fa-solid fa-globe"></i>
        <span>{text}</span>
        <i className="fa-solid fa-caret-down"></i>
      </div>
      {toggleOptions && (
        <div ref={optionsRef} className={classes.options}>
          {newChild}
        </div>
      )}
    </span>
  );
};

export default SelectButton;
