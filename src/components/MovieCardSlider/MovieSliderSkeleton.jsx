import React from 'react'
import Skeleton from "react-loading-skeleton";

const MovieSliderSkeleton = () => {
  return (
    <div className="ps-5 d-flex my-5">
      <Skeleton className="me-4" height="13rem" width="25rem" />
      <Skeleton className="me-4" height="13rem" width="25rem" />
      <Skeleton className="me-4" height="13rem" width="25rem" />
      <Skeleton className="me-4" height="13rem" width="25rem" />
      <Skeleton className="me-4" height="13rem" width="25rem" />
      <Skeleton className="me-4" height="13rem" width="25rem" />
    </div>
  );
};

export default MovieSliderSkeleton;