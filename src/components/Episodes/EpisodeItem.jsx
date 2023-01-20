import React from "react";
import classes from "./EpisodeItem.module.scss";
import { RoundedButton } from "../UI";
import Skeleton from "react-loading-skeleton";
import { PlaySVG } from "../SVG";
import notAvailableImg from "../../assets/images/Poster Not Available.jpg";

export const EpisodeItemSkeleton = () => {
  return (
    <li className={`${classes.skeletonWrapper}`}>
      <div className={classes.skeletonImg}>
        <Skeleton height="100%" width="100%" />
      </div>
      <div className={classes.skeletonContent}>
        <div className={classes.skeletonTitle}>
          <Skeleton height="100%" width="100%" />
        </div>
        <p className={classes.skeletonDesc}>
          <Skeleton count={4} width="100%" />
        </p>
      </div>
    </li>
  );
};

const EpisodeItem = ({
  name,
  posterURL,
  desc,
  length,
  index,
  onClick,
  isUnReleased,
  seasonNumber,
  episodeNumber,
  defaultImage,
}) => {
  const handlePlayMovie = () => {
    onClick(seasonNumber, episodeNumber);
  };

  return (
    <>
      {(
        <li
          onClick={handlePlayMovie}
          className={`${classes.episode} ${
            isUnReleased ? classes.unRealeased : ""
          }`}
        >
          <div className={classes.episodeContent}>
            <span className={classes.number}>{index + 1}</span>
            <div className={classes.imgWrapper}>
              <img
                src={
                  posterURL
                    ? `${process.env.REACT_APP_BASE_IMAGE_URL}${posterURL}`
                    : defaultImage
                    ? defaultImage
                    : notAvailableImg
                }
                alt="movie poster"
                loading="lazy"
              />
              <RoundedButton className={classes.playBtn}>
                <PlaySVG />
              </RoundedButton>
            </div>
            <div className={classes.titleAndDescWrapper}>
              <div className={classes.title}>
                <span>{name}</span>
                {length && (
                  <span className={classes.episodeLength}>{length + "m"}</span>
                )}
              </div>
              <p className={classes.desc}>{desc}</p>
            </div>
          </div>
        </li>
      ) || <EpisodeItemSkeleton />}
    </>
  );
};

export default EpisodeItem;
