import { PageSkeletonLoading } from "../../components/UI";
import React, { Suspense, useState, useEffect } from "react";
import { getTrending } from "../../utils/api";
import MovieCardSlider, {
  MovieSliderSkeleton,
} from "../../components/MovieCardSlider";
import classes from "./TrendingPage.module.scss";

const TrendingPage = () => {
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

  return (
    <Suspense fallback={<PageSkeletonLoading />}>
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
    </Suspense>
  );
};

export default TrendingPage;
