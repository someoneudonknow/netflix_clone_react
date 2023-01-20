import React from 'react'
import classes from "./FormWrapper.module.scss";

const FormWrapper = ({children, className}) => {
  return (
    <div className={`${classes.formWrapper} ${className}`}>
        {children}
    </div>
  )
}

export default FormWrapper