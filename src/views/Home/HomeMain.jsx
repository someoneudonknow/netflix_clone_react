import React, { useState, useEffect, useRef } from "react";
import { getGenres, getMoviesByGenres, getTVShowByGenres } from "../../utils/api";
import MovieCardSlider from "../../components/MovieCardSlider";
import { MainWrapper } from "../../components/UI";
import MovieSliderSkeleton from "../../components/MovieCardSlider";

const HomeMain = () => {
  const [moviesByGenre, setMoviesByGenre] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [pageNum, setPageNum] = useState(3);
  const [genres, setGenres] = useState([]);
  const [lastElement, setLastElement] = useState(null);

  const observer = useRef(
    new IntersectionObserver((entries) => {
      const first = entries[0];
      if (first.isIntersecting) {
        setPageNum((no) => no + 3);
      }
    })
  ); // create a new observer and it in useRef var

  useEffect(() => {
    const callGenres = async () => {
      const data = await getGenres();
      setGenres(data?.genres);
    };

    callGenres(); // get all the movie genres list
  }, []);

  const callMovies = async () => {
    setIsLoading(true);
    const genresArrayToCall = genres.slice(pageNum - 3, pageNum);

    const mappingData = await Promise.all(
      genresArrayToCall.map(async (genre, i) => {
        const moviesList = await getMoviesByGenres(genre.id, pageNum + i + 1);
        return { genre, movies: moviesList };
      })
    );

    setMoviesByGenre((prev) => {
      return [...prev, ...mappingData].filter(
        (value, index, self) =>
          index === self.findIndex((t) => t.genre === value.genre)
      ); // return unduplicate array
    });

    setIsLoading(false);
  }; // call movies function

  useEffect(() => {
    const call = async () => {
      if (genres.length > 0 && pageNum > 0 && pageNum <= genres.length + 3) {
        await callMovies();
      }
    }
    call();
  }, [pageNum, genres, genres.length]); // handle the call movie

  useEffect(() => {
    const currentElement = lastElement;
    const currentObserver = observer.current;

    if (currentElement) {
      currentObserver.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        currentObserver.unobserve(currentElement);
      }
    };
  }, [lastElement]);

  return (
    <MainWrapper>
      {moviesByGenre?.map((movie, i) => {
        return (
          <MovieCardSlider
            genres={genres}
            ref={setLastElement}
            key={i}
            title={movie.genre?.name}
            movieList={movie.movies}
          />
        );
      })}
      {isLoading && <MovieSliderSkeleton />}
    </MainWrapper>
  );
};

export default HomeMain;
