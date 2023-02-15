import React, { useState } from "react";
import {
  Col,
  Card,
} from "react-bootstrap";
import Skeleton from "react-loading-skeleton";
import { RoundedButton } from "../UI";
import classes from "./MovieItem.module.scss";
import { PlusSVG, PlaySVG, CheckSVG } from "../SVG";
import { useWishList } from "../../hooks";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
const MovieItem = ({
  posterURL,
  overview,
  duration,
  onPlayMovie,
  id,
  title,
  type,
  genresId,
  isUnReleased,
}) => {
  const [isImgLoading, setIsImgLoading] = useState(true);
  const { isInWishList, addToList } = useWishList(id);

  const handlePlayMovie = () => {
    onPlayMovie(id);
  };

  const handleAddToWishList = (e) => {
    e.stopPropagation();

    addToList({
      movie: {
        posterURL,
        movieName: title,
        genres: genresId,
        id,
        type: type,
      },
    });
  };

  const handleLoadImage = () => {
    setIsImgLoading(false);
  };

  return (
    <Col md={4} xs={6}>
      <Card onClick={handlePlayMovie} className={`${classes.cardWrapper}`}>
        <span className={classes.duration}>{duration || ""}</span>
        {isImgLoading && <Skeleton className={classes.imgSkeleton} />}
        <Card.Img
          className={classes.cardImage}
          onLoad={handleLoadImage}
          loading="lazy"
          variant="top"
          src={posterURL}
        />
        <RoundedButton className={classes.playBtn}>
          <PlaySVG />
        </RoundedButton>
        <Card.Body className={`${classes.cardBody}`}>
          <Card.Title className="d-flex justify-content-between align-items-center">
            <OverlayTrigger
              placement="top"
              overlay={
                (<Tooltip id={`tooltip-${title}`}>
                  Tooltip on <strong>{title}</strong>.
                </Tooltip>)
              }
            >
              <span title={title} className={classes.filmName}>
                {title}
              </span>
            </OverlayTrigger>
            <RoundedButton onClick={handleAddToWishList}>
              {isInWishList ? <CheckSVG /> : <PlusSVG />}
            </RoundedButton>
          </Card.Title>
          <Card.Text className={classes.cardText}>{overview}</Card.Text>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default MovieItem;
