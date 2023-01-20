import { PageSkeletonLoading } from "../../components/UI";
import React, { Suspense, lazy, useState, useEffect } from "react";
import { usePlayTV } from "../../hooks";
import { TVShowModal } from "../../components/Modal";
import { getModalInfo, removeModalInfo } from "../../functions";
import TVShowsMain from "./TVShowsMain";

const MainLayout = lazy(() => import("../../components/layout/MainLayout"));
const MainHeader = lazy(() => import("../../components/layout/MainHeader"));

const TVShowsPage = () => {
  const playTV = usePlayTV();
  const [modalOpen, setModalOpen] = useState(false);
  const [id, setId] = useState();

  useEffect(() => {
    window.sessionStorage.setItem("currentPage", JSON.stringify("tvshows"));
    return () => {
      window.sessionStorage.removeItem("currentPage");
    };
  }, []);

  useEffect(() => {
    const data = getModalInfo();

    if (data?.id && data?.isModalOpen) {
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

  const handlePlayTV = (tvId, seasonNumber, episode) => {
    playTV(tvId, seasonNumber, episode);
  };

  return (
    <Suspense fallback={<PageSkeletonLoading />}>
      <TVShowModal onHide={handleHideModal} id={id} isShow={modalOpen} />
      <MainLayout>
        <MainHeader onPlay={handlePlayTV} type="tv" />
        <TVShowsMain />
      </MainLayout>
    </Suspense>
  );
};

export default TVShowsPage;
