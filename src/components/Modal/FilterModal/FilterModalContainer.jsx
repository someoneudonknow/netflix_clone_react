import React, { useState, useEffect } from "react";
import { Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import classes from "./FilterModalContainer.module.scss";
import { ModalWrapper } from "../../UI";
import MovieCard from "../../MovieCard/MovieCard";
import { ExitSVG, ArrowLeftSVG } from "../../SVG";
import {
  getMoviesByGenres,
  getMoviesByPeoples,
  getTVShowByGenres,
} from "../../../utils/api";
import { addModal } from "../../../store/modalSlice";
import { useModalTransition, useModal } from "../../.././hooks";

const FilterModalContainer = ({
  onHide,
  id,
  isShow,
  onTransitionEnd,
  filterBy,
  type,
  title,
}) => {
  const [filteredFilms, setFilteredFilms] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const { outAni, appearAni } = useModalTransition();
  const modals = useSelector((state) => state.modals.currentModals);
  const { hideAllModals } = useModal();

  useEffect(() => {
    dispatch(
      addModal({ id, type: "filter", filterBy, mediaType: type, name: title })
    );
  }, []);

  useEffect(() => {
    const getMoviesAfterFiltered = async () => {
      setIsLoading(true);
      try {
        let movies = [];
        if (filterBy == "genre") {
          if (type == "movie") {
            movies = await getMoviesByGenres(id, 1);
          } else if (type == "tv") {
            movies = await getTVShowByGenres(id, 1);
          }
        } else if (filterBy == "people") {
          if (type == "movie") {
            movies = await getMoviesByPeoples(id, 1);
          }
        }
        setFilteredFilms(movies);
      } catch (e) {
        console.log(e);
      }
      setIsLoading(false);
    };
    getMoviesAfterFiltered();
  }, [filterBy]);

  return (
    <ModalWrapper
      onTransitionEnd={onTransitionEnd}
      style={isShow ? appearAni : {}}
      onHide={onHide}
      className={`${classes.modalContainer} ${isShow ? "" : outAni}`}
    >
      {isLoading && (
        <div className={classes.spinnerWrapper}>
          <Spinner animation="border" variant="light" />{" "}
        </div>
      )}
      {!isLoading && (
        <>
          <div
            onClick={hideAllModals}
            className={`${classes.navigateModalBtn} ${classes.closeBtn}`}
          >
            <ExitSVG />
          </div>
          {modals?.length > 1 && (
            <div
              onClick={onHide}
              className={`${classes.navigateModalBtn} ${classes.backBtn}`}
            >
              <ArrowLeftSVG />
            </div>
          )}
          <h1 className={classes.modalTitle}>{title}</h1>
          {filteredFilms.length <= 0 && (
            <p className={classes.noResultText}>No result</p>
          )}
          {filteredFilms.length > 0 && (
            <div className={classes.filmsList}>
              {filteredFilms.map((film) => (
                <MovieCard
                  id={film.id}
                  posterURL={film?.posterURL}
                  key={film?.id}
                  type={type}
                  genres={film?.genresId}
                  className={classes.filmItem}
                  movieName={film?.title}
                />
              ))}
            </div>
          )}
        </>
      )}
    </ModalWrapper>
  );
};

export default FilterModalContainer;
