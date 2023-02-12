import { PageSkeletonLoading } from "../../components/UI";
import React, { Suspense, lazy, useState, useEffect } from "react";
import { MovieModal, TVShowModal } from "../../components/Modal";
import { getModalInfo, removeModalInfo } from "../../functions";
import { getTrending } from "../../utils/api";
import MovieCardSlider, {
  MovieSliderSkeleton,
} from "../../components/MovieCardSlider";
import classes from "./TrendingPage.module.scss";

const MainLayout = lazy(() => import("../../components/layout/MainLayout"));

const TrendingPage = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [id, setId] = useState();
  const [type, setType] = useState(null);
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [trendingTVs, setTrendingTVs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    window.sessionStorage.setItem("currentPage", JSON.stringify("trending"));
    return () => {
      window.sessionStorage.removeItem("currentPage");
    };
  }, []);

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);
      try {
        const trendingMovies = await getTrending("week", "movie");
        const trendingTVs = await getTrending("week", "tv");
        setTrendingMovies(trendingMovies);
        setTrendingTVs(trendingTVs);
      } catch (err) {
        console.log(err);
      }
      setIsLoading(false);
    };

    getData();
  }, []);

  useEffect(() => {
    const data = getModalInfo();

    if (data?.isModalOpen && data?.id) {
      setModalOpen(data?.isModalOpen);
      setId(data?.id);
      setType(data?.type);
      document.documentElement.scrollTop = document.body.scrollTop =
        data?.scrollTop || 0;

      removeModalInfo();
    }
  }, []);

  const handleHideModal = () => {
    setModalOpen(false);
  };

  return (
    <Suspense fallback={<PageSkeletonLoading />}>
      <>
        {modalOpen && type && type === "movie" ? (
          <MovieModal onHide={handleHideModal} id={id} isShow={modalOpen} />
        ) : (
          <TVShowModal onHide={handleHideModal} id={id} isShow={modalOpen} />
        )}
        <div className={classes.content}>
          {isLoading && (
            <>
              <MovieSliderSkeleton />
              <MovieSliderSkeleton />
            </>
          )}
          {!isLoading && (
            <>
              <MovieCardSlider
                title="Trending movies"
                movieList={trendingMovies}
              />
              <MovieCardSlider
                title="Trending TV Shows"
                movieList={trendingTVs}
                tv
              />
            </>
          )}
        </div>
      </>
    </Suspense>
  );
};

export default TrendingPage;
