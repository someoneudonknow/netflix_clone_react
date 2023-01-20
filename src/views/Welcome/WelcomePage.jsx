import React, { Fragment } from "react";
import WelcomeHeader from "./WelcomeHeader";
import WelcomeMain from "./WelcomeMain";
import WelcomeFooter from "./WelcomeFooter";

const WelcomePage = () => {
  return (
    <Fragment>
      <WelcomeHeader />
      <WelcomeMain />
      <WelcomeFooter />
    </Fragment>
  );
};

export default WelcomePage;
