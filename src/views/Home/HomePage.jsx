import { PageSkeletonLoading } from "../../components/UI";
import React, { Suspense, lazy, useState, useEffect } from "react";
import { usePlayMovie } from "../../hooks";

const MainHeader = lazy(() => import("../../components/layout/MainHeader"));
const Main = lazy(() => import("./HomeMain"));

const HomePage = () => {
  const playMovie = usePlayMovie();

  useEffect(() => {
    window.sessionStorage.setItem("currentPage", JSON.stringify("home"));
    return () => {
      window.sessionStorage.removeItem("currentPage");
    };
  }, []);

  const handlePlayMovie = (movieId) => {
    playMovie(movieId);
  };

  return (
    <Suspense fallback={<PageSkeletonLoading />}>
      <MainHeader onPlay={handlePlayMovie} type="movie" />
      <Main />
    </Suspense>
  );
};

export default HomePage;
