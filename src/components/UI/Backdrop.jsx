import React from "react";
import { createPortal } from "react-dom";
import classes from "./Backdrop.module.scss";

const BackdropComponent = ({ onHide }) => {
  return <div onClick={onHide} className={classes.modalBackdrop}></div>;
};

const Backdrop = ({onHide}) => {
  return createPortal(<BackdropComponent onHide={onHide} />,document.getElementById("portal"));
};

export default Backdrop;
