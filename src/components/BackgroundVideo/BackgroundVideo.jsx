import React from "react";
import { Container } from "react-bootstrap";
import classes from "./BackgroundVideo.module.scss"

const BackgroundVideo = ({ children, src, className, ...rest }) => {
  return (
    <Container
      className="p-0 m-0"
      fluid
      style={{
        background: `url(${src}) no-repeat center/cover`,
      }}
    >
      <div {...rest} className={`${classes.overlay} ${className}`}>
        {children}
      </div>
    </Container>
  );
};

export default BackgroundVideo;
