import React from "react";
import Skeleton from "react-loading-skeleton";
import classes from "./PageSkeletonLoading.module.scss";

const PageSkeletonLoading = () => {
  return (
    <div className={classes.container}>
      <div className={classes.fullBg}>
        <Skeleton height="100%" width="100%" />
      </div>
      <div className={classes.wrapper}>
        <div className={classes.eachChildWrapper}>
          <Skeleton
            className={classes.skeleton}
            height="13rem"
            width="23rem"
          />
        </div>
        <div className={classes.eachChildWrapper}>
          <Skeleton
            className={classes.skeleton}
            height="13rem"
            width="23rem"
          />
        </div>
        <div className={classes.eachChildWrapper}>
          <Skeleton
            className={classes.skeleton}
            height="13rem"
            width="23rem"
          />
        </div>
        <div className={classes.eachChildWrapper}>
          <Skeleton
            className={classes.skeleton}
            height="13rem"
            width="23rem"
          />
        </div>
        <div className={classes.eachChildWrapper}>
          <Skeleton
            className={classes.skeleton}
            height="13rem"
            width="23rem"
          />
        </div>
        <div className={classes.eachChildWrapper}>
          <Skeleton
            className={classes.skeleton}
            height="13rem"
            width="23rem"
          />
        </div>
      </div>
    </div>
  );
};

export default PageSkeletonLoading;
