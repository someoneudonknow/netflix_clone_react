import React from "react";
import { useSelector } from "react-redux";
import BackgroundVideo from "../../BackgroundVideo";
import classes from "./ModalHeader.module.scss";
import Title from "../../UI/Title";
import { WhiteButton, RoundedButton } from "../../UI";
import { ExitSVG, PlusSVG, LikeSVG, CheckSVG, ArrowLeftSVG } from "../../SVG";
import defaultImage from "../../../assets/images/Poster Not Available.jpg";
import { useModal } from "../../../hooks";

const ModalHeader = ({
  movieName,
  posterURL,
  onPlayMovie,
  onAddToWishList,
  isAdd,
  onHide,
  type,
}) => {
  const modals = useSelector((state) => state.modals.currentModals);
  const { hideAllModals } = useModal();
  return (
    <BackgroundVideo
      className={classes.container}
      src={
        posterURL
          ? `${process.env.REACT_APP_BASE_IMAGE_780_URL}${posterURL}`
          : defaultImage
      }
    >
      <RoundedButton
        className={`${classes.navigateModalBtn} ${classes.closeBtn}`}
        onClick={hideAllModals}
      >
        <ExitSVG />
      </RoundedButton>
      {modals?.length > 1 && (
        <RoundedButton
          className={`${classes.navigateModalBtn} ${classes.backBtn}`}
          onClick={onHide}
        >
          <ArrowLeftSVG />
        </RoundedButton>
      )}
      <div className={classes.headerContent}>
        <Title fz={1.5} className={classes.tittle}>
          {type == "movie" ? "FILM" : "SERIES"}
        </Title>
        <h1 className={classes.movieName}>{movieName}</h1>
        <div>
          <div className={classes.actions}>
            <WhiteButton onClick={onPlayMovie} className={classes.button}>
              Play
            </WhiteButton>
            <RoundedButton
              onClick={onAddToWishList}
              className={classes.roundedBtn}
            >
              {isAdd ? <CheckSVG /> : <PlusSVG />}
            </RoundedButton>
            <RoundedButton className={classes.roundedBtn}>
              <LikeSVG />
            </RoundedButton>
          </div>
        </div>
      </div>
    </BackgroundVideo>
  );
};

export default ModalHeader;
