import React, { useEffect } from "react";
import classes from "./ModalWrapper.module.scss";
import { createPortal } from "react-dom";

const ModalWrapperComponent = ({
  children,
  onHide,
  className,
  onTransitionEnd,
  ...rest
}) => {
  useEffect(() => {
    document.body.style.overflowY = "hidden";
    return () => {
      document.body.style.overflowY = "auto";
    };
  }, []);

  const handleClickEvent = (e) => {
    e.stopPropagation();
  };
  return (
    <div onClick={onHide} className={`${classes.wrapper}`}>
      <div
        {...rest}
        onClick={handleClickEvent}
        className={`${classes.wrapperContent} ${className}`}
        onTransitionEnd={onTransitionEnd}
      >
        {children}
      </div>
    </div>
  );
};

const ModalWrapper = ({
  children,
  className,
  onHide,
  onTransitionEnd,
  ...rest
}) => {
  return createPortal(
    <ModalWrapperComponent
      onHide={onHide}
      className={className}
      onTransitionEnd={onTransitionEnd}
      {...rest}
    >
      {children}
    </ModalWrapperComponent>,
    document.getElementById("portal")
  );
};

export default ModalWrapper;
