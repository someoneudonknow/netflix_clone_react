import React from "react";
import classes from "./WelcomeFooterLayout.module.scss"

const WelcomeFooterLayout = ({ children, className }) => {
  return (
    <footer className={`${classes.footerWrapper} ${className}`}>
      <div className={classes.footerContent}>
        <a className={`${classes.title} text-muted`} href="https://help.netflix.com/vi/contactus">
          Bạn có câu hỏi? Liên hệ với chúng tôi.
        </a>
        {children}
      </div>
    </footer>
  );
};

export default WelcomeFooterLayout;
