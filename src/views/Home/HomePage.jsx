import { PageSkeletonLoading } from "../../components/UI";
import React, { Suspense, lazy, useState, useEffect } from "react";
import { usePlayMovie } from "../../hooks";
import { MovieModal } from "../../components/Modal";
import { getModalInfo, removeModalInfo } from "../../functions";

const MainLayout = lazy(() => import("../../components/layout/MainLayout"));
const MainHeader = lazy(() => import("../../components/layout/MainHeader"));
const Main = lazy(() => import("./HomeMain"));

const HomePage = () => {
  const playMovie = usePlayMovie();
  const [modalOpen, setModalOpen] = useState(false);
  const [id, setId] = useState();

  useEffect(() => {
    window.sessionStorage.setItem("currentPage", JSON.stringify("home"));
    return () => {
      window.sessionStorage.removeItem("currentPage");
    };
  }, []);

  useEffect(() => {
    const data = getModalInfo();

    if (data?.isModalOpen && data?.id) {
      setModalOpen(data?.isModalOpen);
      setId(data?.id);
      document.documentElement.scrollTop = document.body.scrollTop =
        data?.scrollTop || 0;
      removeModalInfo();
    }
  }, []);

  const handleHideModal = () => {
    setModalOpen(false);
  };

  const handlePlayMovie = (movieId) => {
    playMovie(movieId);
  };

  return (
    <Suspense fallback={<PageSkeletonLoading />}>
      <MovieModal onHide={handleHideModal} id={id} isShow={modalOpen} />
      <MainHeader onPlay={handlePlayMovie} type="movie" />
      <Main />
    </Suspense>
  );
};

export default HomePage;
