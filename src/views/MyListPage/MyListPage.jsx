import React, { useEffect, useState } from "react";
import classes from "./MyListPage.module.scss";
import MyList from "../../components/MyList/MyList";
import { getModalInfo, removeModalInfo } from "../../functions";
import { MovieModal, TVShowModal } from "../../components/Modal";

const MyListPage = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [id, setId] = useState();
  const [type, setType] = useState(null);

  useEffect(() => {
    window.sessionStorage.setItem("currentPage", JSON.stringify("myList"));
    return () => {
      window.sessionStorage.removeItem("currentPage");
    };
  }, []);

  useEffect(() => {
    const data = getModalInfo();

    if (data?.isModalOpen && data?.id) {
      setModalOpen(data?.isModalOpen);
      setId(data?.id);
      setType(data?.type);
      document.documentElement.scrollTop = document.body.scrollTop =
        data?.scrollTop || 0;

      removeModalInfo();
    }
  }, []);

  const handleHideModal = () => {
    setModalOpen(false);
  };
  return (
    <>
      {modalOpen && type && type === "movie" ? (
        <MovieModal onHide={handleHideModal} id={id} isShow={modalOpen} />
      ) : (
        <TVShowModal onHide={handleHideModal} id={id} isShow={modalOpen} />
      )}
      <div className={classes.wrapper}>
        <h1 className="display-1 m-0 text-light">My List</h1>
        <MyList />
      </div>
    </>
  );
};

export default MyListPage;
