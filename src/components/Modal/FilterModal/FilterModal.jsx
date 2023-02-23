import React, { useState, useEffect } from "react";
import { Backdrop } from "../../UI";
import FilterModalContainer from "./FilterModalContainer";

const FilterModal = ({ onHide, id, isShow, filterBy, mediaType, title }) => {
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
          <FilterModalContainer
            onHide={onHide}
            id={id}
            isShow={isShow}
            filterBy={filterBy}
            type={mediaType}
            onTransitionEnd={handleTransitionEnd}
            title={title}
          />
        </>
      )}
    </>
  );
};

export default FilterModal;
