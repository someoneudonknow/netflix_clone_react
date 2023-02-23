import React, { useState, useEffect } from "react";
import { Backdrop } from "../../UI";
import MovieModalContainer from "./MovieModalContainer";

const MovieModal = ({ onHide, id, isShow }) => {
  const [showModal, setShowModal] = useState(isShow);

  useEffect(() => {
    if (isShow) {
      setShowModal(true);
    }
  }, [isShow]);

  const handleTransitionEnd = () => {
    if (!isShow) {
      setShowModal(false);
    }
  };
  return (
    <>
      {showModal && (
        <>
          <Backdrop />
          <MovieModalContainer
            isShow={isShow}
            onHide={onHide}
            id={id}
            onTransitionEnd={handleTransitionEnd}
          />
        </>
      )}
    </>
  );
};

export default MovieModal;
