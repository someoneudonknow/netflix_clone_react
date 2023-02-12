import React, { useState, memo, useRef } from "react";
import { useSelector } from "react-redux";
import classes from "./MovieCard.module.scss";
import image from "../../assets/images/Poster Not Available.jpg";
import { RoundedButton } from ".././UI";
import { PlaySVG, PlusSVG, ArrowDownSVG, CheckSVG } from "../SVG";
import { usePlayMovie, usePlayTV, useWishList } from "../../hooks";
import { MovieModal, TVShowModal } from "../Modal";

const MovieCard = ({
  posterURL,
  movieName,
  genres,
  id,
  className,
  type,
  ...rest
}) => {
  const [showModal, setShowModal] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const playMovie = usePlayMovie();
  const playTV = usePlayTV();
  const { addToList, isInWishList } = useWishList(id);
  const genresList = useSelector((state) => state.movie.genresInfo);
  const transformedGenresList = genres?.map((genresItem, i) => {
    return genresList?.genres?.find(d => d.id === genresItem);
  }, [genresList])
  let timerId = useRef();
  
  const handleHideModal = () => {
    setShowModal(false);
  };

  const handlePlayMovie = (e) => {
    e.stopPropagation();

    if (type === "movie") {
      playMovie(id);
    } else if (type === "tv") {
      playTV(id, 1, 1);
    }
  };

  const handleAddToWishList = (e) => {
    e.stopPropagation();
    addToList({
      movie: {
        posterURL,
        movieName,
        genres,
        id,
        type,
      },
    });
  };

  const handleShowModal = (e) => {
    e.stopPropagation();
    setShowModal(true);
  };

  const handleMouseEnter = () => {
    timerId.current = setTimeout(() => {
      setIsHovered(true);
    }, 600);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (timerId.current) {
      clearTimeout(timerId.current);
    }
  };

  return (
    <>
      {type == "tv" && (
        <TVShowModal onHide={handleHideModal} id={id} isShow={showModal} />
      )}
      {type == "movie" && (
        <MovieModal onHide={handleHideModal} id={id} isShow={showModal} />
      )}
      <div
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={`${classes.movieCard} ${
          isHovered ? classes.cardHover : ""
        } ${className}`}
      >
        <div onClick={handlePlayMovie} className={classes.cardImgWrapper}>
          <img
            loading="lazy"
            src={`${process.env.REACT_APP_BASE_IMAGE_URL}${posterURL}` || image}
            alt="film background img"
          />
        </div>
        <div className={classes.cardContent} onClick={handleShowModal}>
          <div className={classes.cardActions}>
            <div className={classes.cardActionsRight}>
              <RoundedButton
                onClick={handlePlayMovie}
                className={classes.action}
              >
                <PlaySVG />
              </RoundedButton>
              <RoundedButton
                onClick={handleAddToWishList}
                className={classes.action}
              >
                {isInWishList ? <CheckSVG /> : <PlusSVG />}
              </RoundedButton>
            </div>
            <RoundedButton onClick={handleShowModal} className={classes.action}>
              <ArrowDownSVG />
            </RoundedButton>
          </div>
          <h3 className={classes.cardMovieName}>{movieName}</h3>
          <ul className={classes.genresList}>
            {transformedGenresList?.slice(0, 3).map((genre) => (
              <li key={genre?.id} className={classes.genre}>
                {genre?.name}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default memo(MovieCard);
