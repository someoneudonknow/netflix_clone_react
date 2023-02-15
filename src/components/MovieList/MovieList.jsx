import React, { useState, useEffect } from "react";
import { Row } from "react-bootstrap";
import MovieItem from "./MovieItem";
import classes from "./MovieList.module.scss";
import { LoadMoreButton } from "../UI";
import { usePlayMovie, usePlayTV } from "../../hooks";
import notAvailableImg from "../../assets/images/Poster Not Available.jpg";

const MovieList = ({
  title = "More like this",
  movieList,
  defaultImage,
  type,
}) => {
  const [visible, setVisible] = useState(9);
  const [isLoadMore, setIsLoadMore] = useState(false);
  const listLength = movieList?.length;
  const playMovie = usePlayMovie();
  const playTV = usePlayTV();

  const handlePlayMovie = (id) => {
    if(type === 'movie') {
      playMovie(id);
    }else {
      playTV(id,1,1);
    }
  };

  useEffect(() => {
    if (listLength > 9) {
      setIsLoadMore(true);
    }
  }, [listLength]);

  const handleLoadMore = () => {
    if (visible < listLength - 1) {
      setVisible((prevState) => prevState + listLength - prevState);
    } else {
      setVisible((prevState) => prevState - (listLength - 9));
    }
  };

  return (
    <div className={classes.listWrapper}>
      <h1 className={classes.title}>{title}</h1>
      <Row className="mt-5 gy-4">
        {movieList?.slice(0, visible)?.map((movie) => (
          <MovieItem
            type={type}
            genresId={movie?.genresId}
            key={movie.id}
            posterURL={`${
              movie.posterURL
                ? `${process.env.REACT_APP_BASE_IMAGE_URL}${movie.posterURL}`
                : defaultImage
                ? defaultImage
                : notAvailableImg
            }`}
            overview={movie.overview}
            duration={movie.duration}
            id={movie.id}
            title={movie.title}
            onPlayMovie={handlePlayMovie}
            isUnReleased={movie?.unReleased}
          />
        ))}
      </Row>
      {isLoadMore && (
        <LoadMoreButton
          style={
            visible >= listLength - 1
              ? { transform: "rotate(180deg)" }
              : { transform: "rotate(0deg)" }
          }
          onClick={handleLoadMore}
        />
      )}
    </div>
  );
};

export default MovieList;
