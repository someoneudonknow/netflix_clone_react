import React, { useState, useEffect, memo } from "react";
import { useDispatch } from "react-redux";
import { addModal, removeModal } from "../../../store/modalSlice";
import classes from "./TVShowModalContainer.module.scss";
import ModalHeader from "../ModalHeader";
import ModalBodyWrapper from "../ModalBodyWrapper";
import EpisodesList from "../../Episodes";
import {
  getTVById,
  getTVShowCastById,
  getSimilarTVShows,
  getEpisodesByIdAndNumber,
} from "../../../utils/api";
import MovieList from "../../MovieList";
import { usePlayTV, useWishList } from "../../../hooks";
import { ModalWrapper } from "../../UI";
import ModalSkeleton from "../ModalSkeleton/ModalSkeleton";
import { SelectButton, Selection } from "../../SelectButton";
import { EpisodesListSkeleton } from "../../Episodes/EpisodesList";

const TVShowModalContainer = ({ onHide, id, isShow, onTransitionEnd }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isEpisodesLoading, setIsEpisodesLoading] = useState(false);
  //movie, cast, similar movies
  const [currentTVShow, setCurrentTVShow] = useState({});
  const [currentTVCast, setCurrentTVCast] = useState({});
  const [similarSeries, setSimilarSeries] = useState([]);
  const [currentEpisodes, setCurrentEpisodes] = useState([]);
  const [currentSeason, setCurrentSeason] = useState(1);
  const releaseDate = currentTVShow?.releaseDate;
  const releaseYear = releaseDate?.substring(0, releaseDate?.indexOf("-"));
  //creators list
  const creatorsArrayList = currentTVShow?.creators;
  const playTV = usePlayTV();
  const { addToList, isInWishList } = useWishList(id);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(addModal({ id: id, type: "tv" }));

    return () => {
      dispatch(removeModal({ id }));
    };
  }, []);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      try {
        const series = await getTVById(id);
        const similarTVShow = await getSimilarTVShows(id);
        const currentTVCast = await getTVShowCastById(id);

        setSimilarSeries(similarTVShow);
        setCurrentTVCast(currentTVCast);
        setCurrentTVShow(series);
      } catch (e) {
        console.log(e);
      }
      setIsLoading(false);
    })();
  }, [id]);

  useEffect(() => {
    const getSeasonEpisodes = async () => {
      setIsEpisodesLoading(true);
      try {
        const episodes = await getEpisodesByIdAndNumber(id, currentSeason);
        setCurrentEpisodes(episodes);
      } catch (e) {}
      setIsEpisodesLoading(false);
    };
    getSeasonEpisodes();
  }, [currentSeason]);

  const handlePlayMovie = () => {
    playTV(id, currentSeason, currentEpisodes[0]?.episodeNumber);
  };

  const handleAddToWishList = () => {
    addToList({
      movie: {
        posterURL: `${process.env.REACT_APP_BASE_IMAGE_780_URL}${currentTVShow.posterURL}`,
        movieName: currentTVShow?.title,
        genres: currentTVShow?.genres?.map((genre) => {
          return genre?.id;
        }),
        id,
        type: "tv",
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

  const handleSeasonChange = (data) => {
    setCurrentSeason(data);
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
            movieName={currentTVShow?.title}
            posterURL={currentTVShow.posterURL}
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
                  {/* {isAdult && <span className={classes.adult}>18+</span>} */}
                </div>
                <p className={classes.overview}>{currentTVShow?.overview}</p>
              </div>
              <div className={classes.descRight}>
                <div className={classes.actors}>
                  <p className={classes.title}>
                    Cast:{" "}
                    <span className={classes.actorList}>
                      {currentTVCast?.cast?.slice(0, 3).map((item) => (
                        <span
                          onClick={() => {
                            handleFilterByPeoples(item?.id);
                          }}
                          key={item?.id}
                        >
                          {item?.name + ", "}
                        </span>
                      ))}
                      {currentTVCast?.cast?.length > 3 && (
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
                      {currentTVShow?.genres?.map((genre, i) => (
                        <span
                          onClick={() => {
                            handleFilterByGenres(genre.id);
                          }}
                          key={genre.id}
                        >
                          {genre?.name +
                            (i < currentTVShow?.genres.length - 1 ? ", " : "")}
                        </span>
                      ))}
                    </span>
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-5 d-flex justify-content-between align-items-center">
              <h3 className="text-light h1">{`Season: ${currentSeason}`}</h3>
              {currentTVShow?.seasonsDetails && (
                <SelectButton
                  className={classes.selectBtn}
                  onSelect={handleSeasonChange}
                >
                  {currentTVShow?.seasonsDetails?.map((season) => {
                    return (
                      <Selection
                        init={season?.season_number == 1}
                        className={classes.selection}
                        key={season.id}
                        data={season.season_number}
                      >
                        Season {season.season_number}
                        <span>{` (${season?.episode_count} episodes)`}</span>
                      </Selection>
                    );
                  })}
                </SelectButton>
              )}
            </div>
            {!isEpisodesLoading && currentEpisodes && (
              <EpisodesList
                defaultImage={`${process.env.REACT_APP_BASE_IMAGE_780_URL}${currentTVShow.posterURL}`}
                type="tv"
                seriesName={currentTVShow?.title}
                episodesList={currentEpisodes}
                id={id}
              />
            )}
            {isEpisodesLoading && <EpisodesListSkeleton />}
            {similarSeries.length > 0 && (
              <MovieList
                type="tv"
                title="More Like This"
                movieList={similarSeries}
              />
            )}
          </ModalBodyWrapper>
          <footer id="Modalfooter" className={classes.modalFooter}>
            <p className={classes.about}>
              About{" "}
              <span className={classes.footerMovieName}>
                {currentTVShow?.title || currentTVShow?.name}
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
              {currentTVCast?.cast?.length > 0 && (
                <div>
                  <h3 className={classes.roleTitle}>Cast</h3>
                  <p>
                    {currentTVCast?.cast?.map((cast, i) => (
                      <span
                        onClick={() => {
                          handleFilterByPeoples(cast.id);
                        }}
                        key={cast.id}
                      >
                        {cast.name +
                          (i < currentTVCast?.cast?.length - 1 ? ", " : ".")}
                      </span>
                    ))}
                  </p>
                </div>
              )}
              {currentTVShow?.genres?.length > 0 && (
                <div>
                  <h3 className={classes.roleTitle}>Genres</h3>
                  <p>
                    {currentTVShow?.genres?.map((genre, i) => (
                      <span
                        onClick={() => {
                          handleFilterByGenres(genre.id);
                        }}
                        key={genre.id}
                      >
                        {genre?.name +
                          (i < currentTVShow?.genres.length - 1 ? ", " : ".")}
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

export default memo(TVShowModalContainer);
