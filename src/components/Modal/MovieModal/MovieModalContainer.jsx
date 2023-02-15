import React, { useState, useEffect, memo } from "react";
import { useDispatch } from "react-redux";
import { addModal, removeModal } from "../../../store/modalSlice";
import classes from "./MovieModalContainer.module.scss";
import ModalHeader from "../ModalHeader";
import {
  getMovieById,
  getCastById,
  getSimilarMovies,
  getCollectionById,
} from "../../../utils/api";
import MovieList from "../../MovieList";
import { usePlayMovie, useWishList } from "../../../hooks";
import { ModalWrapper } from "../../UI";
import ModalBodyWrapper from "../ModalBodyWrapper";
import ModalSkeleton from "../ModalSkeleton/ModalSkeleton";

const MovieModalContainer = ({ onHide, id, isShow, onTransitionEnd }) => {
  const [isLoading, setIsLoading] = useState(false);
  //movie, cast, similar movies
  const [currentMovie, setCurrentMovie] = useState({});
  const [currentMovieCast, setCurrentMovieCast] = useState({});
  const [similarMovies, setSimilarMovies] = useState([]);

  //collection
  const [collection, setCollection] = useState([]);
  const [isFromCollection, setIsFromCollection] = useState();
  const collectionId = isFromCollection?.id;
  //............................
  const releaseDate = currentMovie?.release_date;
  const releaseYear = releaseDate?.substring(-1, releaseDate?.indexOf("-"));
  const isAdult = currentMovie?.adult;

  //creators list
  const creatorsArrayList = currentMovieCast?.cast?.filter(
    (creator) => creator?.known_for_department !== "Acting"
  );

  //cast list
  const castArrayList = currentMovieCast?.cast?.filter(
    (cast) => cast?.known_for_department === "Acting"
  );

  const { addToList, isInWishList } = useWishList(id);
  const playMovie = usePlayMovie();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(addModal({ id, type: "movie" }));

    return () => {
      dispatch(removeModal({ id }));
    };
  }, []);

  useEffect(() => {
    (async () => {
      setIsLoading(true);

      const movie = await getMovieById(id);
      const similarMovies = await getSimilarMovies(id);
      const castList = await getCastById(id);

      setIsFromCollection(movie?.belongs_to_collection);
      setSimilarMovies(similarMovies);
      setCurrentMovie(movie);
      setCurrentMovieCast(castList);
      setIsLoading(false);
    })();
  }, [id]);

  useEffect(() => {
    const callCollection = async () => {
      if (isFromCollection && collectionId) {
        const collection = await getCollectionById(collectionId);
        setCollection(collection);
      }
    };

    callCollection();
  }, [isFromCollection, collectionId]);

  const handlePlayMovie = () => {
    playMovie(currentMovie?.id);
  };

  const handleAddToWishList = () => {
    addToList({
      movie: {
        posterURL: `${process.env.REACT_APP_BASE_IMAGE_780_URL}${currentMovie.backdrop_path}`,
        movieName: currentMovie?.title || currentMovie?.name,
        genres: currentMovie?.genres?.map((genre) => {
          return genre?.id;
        }),
        id,
        type: "movie",
      },
    });
  };

  const handleFilterByGenres = (genresId) => {
    console.log("genres");
    console.log(genresId);
  };
  const handleFilterByPeoples = (peoplesId) => {
    console.log("peoples");
    console.log(peoplesId);
  };

  return (
    <ModalWrapper
      onTransitionEnd={onTransitionEnd}
      style={isShow ? { animation: `appear ease .4s` } : {}}
      onHide={onHide}
      className={`${classes.modalContainer} ${isShow ? "" : classes.out}`}
    >
      {isLoading && <ModalSkeleton />}
      {!isLoading && (
        <>
          <ModalHeader
            onPlayMovie={handlePlayMovie}
            movieName={currentMovie?.title || currentMovie?.name}
            posterURL={currentMovie.backdrop_path}
            onHide={onHide}
            onAddToWishList={handleAddToWishList}
            type="movie"
            isAdd={isInWishList}
          />
          <ModalBodyWrapper className={classes.modalBody}>
            <div className={classes.description}>
              <div className={classes.descLeft}>
                <div className={classes.yearAndAge}>
                  <span className={classes.year}>{releaseYear}</span>
                  {isAdult && <span className={classes.adult}>18+</span>}
                </div>
                <p className={classes.overview}>{currentMovie?.overview}</p>
              </div>
              <div className={classes.descRight}>
                <div className={classes.actors}>
                  <p className={classes.title}>
                    Cast:{" "}
                    <span className={classes.actorList}>
                      {castArrayList?.slice(0, 3).map((item) => (
                        <span
                          onClick={() => {
                            handleFilterByPeoples(item?.id);
                          }}
                          key={item?.id}
                        >
                          {item?.name + ", "}
                        </span>
                      ))}
                      {castArrayList?.length > 3 && (
                        <a className="text-light" href="#Modalfooter">
                          <i>more</i>
                        </a>
                      )}
                    </span>
                  </p>
                </div>
                <div className={classes.genres}>
                  <p className={classes.title}>
                    Genres:{" "}
                    <span className={classes.genresList}>
                      {currentMovie?.genres?.map((genre, i) => (
                        <span
                          onClick={() => {
                            handleFilterByGenres(genre.id);
                          }}
                          key={genre.id}
                        >
                          {genre?.name +
                            (i < currentMovie?.genres.length - 1 ? ", " : "")}
                        </span>
                      ))}
                    </span>
                  </p>
                </div>
              </div>
            </div>
            {isFromCollection && (
              <MovieList
                type="movie"
                title="Collection"
                movieList={collection}
              />
            )}
            {similarMovies.length > 0 && (
              <MovieList
                type="movie"
                title="More Like This"
                movieList={similarMovies}
              />
            )}
          </ModalBodyWrapper>
          <footer id="Modalfooter" className={classes.modalFooter}>
            <p className={classes.about}>
              About{" "}
              <span className={classes.footerMovieName}>
                {currentMovie?.title || currentMovie?.name}
              </span>
            </p>
            <div className={classes.footerContent}>
              {creatorsArrayList?.length > 0 && (
                <div>
                  <h3 className={classes.roleTitle}>Creators</h3>
                  <p>
                    {creatorsArrayList?.map((creator, i) => (
                      <span
                        onClick={() => {
                          handleFilterByPeoples(creator.id);
                        }}
                        key={creator.id}
                      >
                        {creator.name +
                          (i < creatorsArrayList?.length - 1 ? ", " : ".")}
                      </span>
                    ))}
                  </p>
                </div>
              )}
              {castArrayList?.length > 0 && (
                <div>
                  <h3 className={classes.roleTitle}>Cast</h3>
                  <p>
                    {castArrayList?.map((cast, i) => (
                      <span
                        onClick={() => {
                          handleFilterByPeoples(cast.id);
                        }}
                        key={cast.id}
                      >
                        {cast.name +
                          (i < castArrayList?.length - 1 ? ", " : ".")}
                      </span>
                    ))}
                  </p>
                </div>
              )}
              {currentMovie?.genres?.length > 0 && (
                <div>
                  <h3 className={classes.roleTitle}>Genres</h3>
                  <p>
                    {currentMovie?.genres?.map((genre, i) => (
                      <span
                        onClick={() => {
                          handleFilterByGenres(genre.id);
                        }}
                        key={genre.id}
                      >
                        {genre?.name +
                          (i < currentMovie?.genres.length - 1 ? ", " : ".")}
                      </span>
                    ))}
                  </p>
                </div>
              )}
            </div>
          </footer>
        </>
      )}
    </ModalWrapper>
  );
};

export default memo(MovieModalContainer);
