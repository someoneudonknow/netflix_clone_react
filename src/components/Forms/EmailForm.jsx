import React from "react";
import { useState, useId, useRef } from "react";
import classes from "./EmailForm.module.scss";

const EmailForm = ({ onSubmit }) => {
  const [enteredEmail, setEnteredEmail] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [isTouched, setIsTouched] = useState(false);
  const inputRef = useRef();
  const inputId = useId();
  const emailPatern = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/);
  const isInputValid = enteredEmail.trim() !== "";
  const isEmailValid = emailPatern.test(enteredEmail);
  const isEmailInvalid = !isEmailValid && isTouched;
  const isInputInvalid = !isInputValid && isTouched;
  const isFormValid = isInputValid && isEmailValid;

  const labelStyle = {
    fontSize: isFocused ? "1.5rem" : "2.2rem",
    transform: isFocused ? "translateY(0)" : "translateY(1.3rem)",
    fontWeight: isFocused ? "bold" : "normal",
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();
    setIsTouched(true);
    if(!isFocused) {
      inputRef.current.focus();
    }
    if (!isFormValid) return;

    onSubmit(enteredEmail);
    setEnteredEmail("");
    setIsTouched(false);
  };

  const handleEmailEntered = (e) => {
    setEnteredEmail(e.target.value);
    setIsTouched(true);
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    if (enteredEmail.trim() === "") {
      setIsFocused(false);
    }
  };

  return (
    <form className={classes.myForm} onSubmit={handleSubmitForm}>
      <div className={classes.formControl}>
        <div className={classes.inputWrapper}>
          <label style={labelStyle} htmlFor={inputId}>
            Địa chỉ email
          </label>
          <input
            id={inputId}
            onFocus={handleFocus}
            onBlur={handleBlur}
            value={enteredEmail}
            onChange={handleEmailEntered}
            type="email"
            ref={inputRef}
          />
        </div>
        <button type="submit">
          <span>Bắt đầu</span>
          <i className="fa-solid fa-chevron-right"></i>
        </button>
      </div>
      {isInputInvalid && (
        <p className={classes.errorMessage}>Bạn cần nhập email!</p>
      )}
      {!isInputInvalid && isEmailInvalid && (
        <p className={classes.errorMessage}>Email không hợp lệ</p>
      )}
    </form>
  );
};

export default EmailForm;
