import React, { useEffect } from "react";
import classes from "./MyListPage.module.scss";
import MyList from "../../components/MyList/MyList";

const MyListPage = () => {
  useEffect(() => {
    window.sessionStorage.setItem("currentPage", JSON.stringify("myList"));
    return () => {
      window.sessionStorage.removeItem("currentPage");
    };
  }, []);

  return (
    <div className={classes.wrapper}>
      <h1 className="display-1 m-0 text-light">My List</h1>
      <MyList />
    </div>
  );
};

export default MyListPage;
