import { PageSkeletonLoading } from "../../components/UI";
import React, { Suspense, lazy, useEffect } from "react";
import { usePlayTV } from "../../hooks";
import TVShowsMain from "./TVShowsMain";

const MainHeader = lazy(() => import("../../components/layout/MainHeader"));

const TVShowsPage = () => {
  const playTV = usePlayTV();

  useEffect(() => {
    window.sessionStorage.setItem("currentPage", JSON.stringify("tvshows"));
    return () => {
      window.sessionStorage.removeItem("currentPage");
    };
  }, []);

  const handlePlayTV = (tvId, seasonNumber, episode) => {
    playTV(tvId, seasonNumber, episode);
  };

  return (
    <Suspense fallback={<PageSkeletonLoading />}>
      <MainHeader onPlay={handlePlayTV} type="tv" />
      <TVShowsMain />
    </Suspense>
  );
};

export default TVShowsPage;
