import React from "react";
import classes from "./MainFooter.module.scss";

const MainFooter = () => {
  return (
    <footer className={classes.footerWrapper}>
      <div className={classes.footerContent}>
        <ul className={classes.socialsList}>
          <li className={classes.socialItem}>
            <a href="#">
              <i className="fa-brands fa-facebook-f"></i>
            </a>
          </li>
          <li className={classes.socialItem}>
            <a href="#">
              <i className="fa-brands fa-instagram"></i>
            </a>
          </li>
          <li className={classes.socialItem}>
            <a href="#">
              <i className="fa-brands fa-twitter"></i>
            </a>
          </li>
          <li className={classes.socialItem}>
            <a href="#">
              <i className="fa-brands fa-youtube"></i>
            </a>
          </li>
        </ul>
        <div className={classes.contactInfo}>
          <ul>
            <li>
              <a href="#">Audio Description</a>
            </li>
            <li>
              <a href="#">Help Center</a>
            </li>
            <li>
              <a href="#">Gift Cards</a>
            </li>
            <li>
              <a href="#">Media Center</a>
            </li>
            <li>
              <a href="#">Investor Relations</a>
            </li>
            <li>
              <a href="#">Jobs</a>
            </li>
            <li>
              <a href="#">Terms of Use</a>
            </li>
            <li>
              <a href="#">Privacy</a>
            </li>
            <li>
              <a href="#">Legal Notices</a>
            </li>
            <li>
              <a href="#">Cookie Preferences</a>
            </li>
            <li>
              <a href="#">Corporate Information</a>
            </li>
            <li>
              <a href="#">Contact Us</a>
            </li>
          </ul>
        </div>
        <div className={classes.serviceCode}>
          <span>Service Code</span>
        </div>
        <div className={classes.copyright}>
          <p>
            © 1997-2022 Netflix, Inc.{" "}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default MainFooter;
