import React from "react";
import classes from "./WelcomeFooter.module.scss";
import { SelectButton, Selection } from "../../components/SelectButton";
import { WelcomeFooterLayout } from "../../components/layout";

const WelcomeFooter = () => {
  const handleSelect = (data) => {};

  return (
    <WelcomeFooterLayout>
      <ul className={classes.questionsList}>
        <li>
          <a className="text-muted" href="/">FAQ</a>
        </li>
        <li>
          <a className="text-muted" href="/">Help Center</a>
        </li>
        <li>
          <a className="text-muted" href="/">Account</a>
        </li>
        <li>
          <a className="text-muted" href="/">Media Center</a>
        </li>
        <li>
          <a className="text-muted" href="/">Investor Relations</a>
        </li>
        <li>
          <a className="text-muted" href="/">Jobs</a>
        </li>
        <li>
          <a className="text-muted" href="/">Ways to Watch</a>
        </li>
        <li>
          <a className="text-muted" href="/">Terms of Use</a>
        </li>
        <li>
          <a className="text-muted" href="/">Privacy</a>
        </li>
        <li>
          <a className="text-muted" href="/">Cookie Preferences</a>
        </li>
        <li>
          <a className="text-muted" href="/">Corporate Information</a>
        </li>
        <li>
          <a className="text-muted" href="/">Contact Us</a>
        </li>
        <li>
          <a className="text-muted" href="/">Speed Test</a>
        </li>
        <li>
          <a className="text-muted" href="/">Legal Notices</a>
        </li>
        <li>
          <a className="text-muted" href="/">Only on Netflix</a>
        </li>
      </ul>
      <SelectButton className={classes.selectBtn} onSelect={handleSelect}>
        <Selection className={classes.selection} init data="en">
          {" "}
          English{" "}
        </Selection>
        <Selection className={classes.selection} data="vn">
          {" "}
          Tiếng Việt{" "}
        </Selection>
      </SelectButton>
      <p className={classes.location}>Netflix Viet Nam</p>
    </WelcomeFooterLayout>
  );
};

export default WelcomeFooter;
