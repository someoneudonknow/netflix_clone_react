import React, { useEffect, useState, useCallback } from "react";
import { Col } from "react-bootstrap";
import classes from "./MainHeader.module.scss";
import BackgroundVideo from "../../BackgroundVideo";
import defaultImg from "../../../assets/images/Poster Not Available.jpg";
import { Wrapper, Loading, Title, WhiteButton, GrayButton } from "../../UI";
import { getTrending } from "../../../utils/api";
import { MovieModal, TVShowModal } from "../../Modal";
import { getTVById } from "../../../utils/api";

const MainHeader = ({ type, onPlay }) => {
  const [lastestMovie, setLastestMovie] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [currentTV, setCurrentTV] = useState({});

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      try {
        const data = await getTrending("day", type);
        const randomIndex = Math.floor(Math.random() * (data.length - 1));
        
        setLastestMovie(data[0]);

        if (type === "tv") {
          const currentTV = await getTVById(data[0]?.id);
          setCurrentTV(currentTV);
        }
      } catch (e) {
        console.error(e);
      }
      setIsLoading(false);
    })();
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  const handlePlay = () => {
    if (type === "movie") {
      onPlay(lastestMovie.id);
    } else {
      onPlay(lastestMovie.id, currentTV?.seasonsDetails[0]?.season_number, 1);
    }
  };

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleHideModal = () => {
    setShowModal(false);
  };

  return (
    <>
      {type == "movie" && (
        <MovieModal
          isShow={showModal}
          onHide={handleHideModal}
          currentMovie={lastestMovie}
          id={lastestMovie.id}
        />
      )}
      {type == "tv" && (
        <TVShowModal
          isShow={showModal}
          onHide={handleHideModal}
          currentMovie={lastestMovie}
          id={lastestMovie.id}
        />
      )}
      <BackgroundVideo
        className={classes.container}
        src={
          `${process.env.REACT_APP_BASE_IMAGE_1280_URL}${lastestMovie?.posterURL}` ||
          defaultImg
        }
      >
        {lastestMovie?.isAdult && <span className={classes.ageValid}>18+</span>}
        <Wrapper className={`text-light ${classes.contentWrapper}`}>
          <Col md="12">
            <Title>{type == "tv" ? "SERIES" : "FILM"}</Title>
            <h1 className={classes.movieName}>{lastestMovie?.title}</h1>
            <p className={`${classes.movieDesc}`}>
              {lastestMovie?.description}
            </p>
            <div className={classes.actionsWrapper}>
              <WhiteButton onClick={handlePlay} className={classes.action}>
                Play
              </WhiteButton>
              <GrayButton onClick={handleShowModal} className={classes.action}>
                More info
              </GrayButton>
            </div>
          </Col>
        </Wrapper>
      </BackgroundVideo>
    </>
  );
};

export default MainHeader;
