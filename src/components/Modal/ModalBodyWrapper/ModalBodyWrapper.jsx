import React from 'react'
import classes from "./ModalBodyWrapper.module.scss";

const ModalBodyWrapper = ({children, className, ...rest}) => {
  return (
    <div {...rest} className={`${classes.body} ${className}`}>
        {children}
    </div>
  )
}

export default ModalBodyWrapper