import React from "react";
import MainNavigation from "./MainNavigation";
import MainFooter from "./MainFooter";
import { Outlet } from "react-router-dom";
import { Fragment } from "react";

const MainLayout = () => {
  return (
    <Fragment>
      <MainNavigation />
        <main style={{backgroundColor: "var(--primary-black)"}}><Outlet/></main>
      <MainFooter />
    </Fragment>
  );
};

export default MainLayout;
