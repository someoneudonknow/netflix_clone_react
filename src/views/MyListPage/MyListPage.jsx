import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { MainLayout } from "../../components/layout";
import classes from "./MyListPage.module.scss";
import MyList from "../../components/MyList/MyList";
import { useWishList } from "../../hooks";

const MyListPage = () => {
  
  useEffect(() => {
    window.sessionStorage.setItem("currentPage", JSON.stringify("myList"));
    return () => {
      window.sessionStorage.removeItem("currentPage");
    };
  }, []);
  
  return (
    <MainLayout>
      <div className={classes.wrapper}>
        <h1 className="display-1 m-0 text-light">My List</h1>
        <MyList />
      </div>
    </MainLayout>
  );
};

export default MyListPage;
