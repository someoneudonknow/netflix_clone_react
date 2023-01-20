import React from "react";
import MainNavigation from "./MainNavigation";
import MainFooter from "./MainFooter";
import { Fragment } from "react";

const MainLayout = ({ children }) => {
  return (
    <Fragment>
      <MainNavigation />
        <main style={{backgroundColor: "var(--primary-black)"}}>{children}</main>
      <MainFooter />
    </Fragment>
  );
};

export default MainLayout;
