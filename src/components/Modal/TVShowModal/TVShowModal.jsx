import React, { useState, useEffect, memo } from "react";
import { Backdrop } from "../../UI";
import TVShowModalContainer from "./TVShowModalContainer";

const TVShowModal = ({ onHide, id, isShow }) => {
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
          <TVShowModalContainer
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

export default memo(TVShowModal);
