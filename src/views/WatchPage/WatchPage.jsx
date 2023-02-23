import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addModal, removeModal, removeAllModals } from "../../store/modalSlice";
import classes from "./WatchPage.module.scss";
import Skeleton from "react-loading-skeleton";

const WatchPageSkeleton = () => {
  return (
    <div className={classes.skeletonWrapper}>
      <nav className={classes.navBarSkeleton}>
        <Skeleton height="5rem" />
      </nav>
      <div className={classes.wrapper}>
        <Skeleton height="100%" />
      </div>
    </div>
  );
};

const WatchPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const isMovie = searchParams.get("isMovie");
  let url;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  if (isMovie === "true") {
    const movieId = searchParams.get("id");
    url = `${process.env.REACT_APP_WATCH_BASE_URL}${movieId}`;
  } else {
    const tvId = searchParams.get("id");
    const s = searchParams.get("s");
    const e = searchParams.get("e");

    url = `${process.env.REACT_APP_WATCH_TV_BASE_URL}${tvId}&s=${s}&e=${e}`;
  }

  const handleIFrameLoad = (e) => {
    setIsLoading(false);
  };

  useEffect(() => {
    const currentModals = JSON.parse(sessionStorage.getItem("modals"));
    dispatch(removeAllModals());

    return () => {
      currentModals.forEach((modal) =>
        dispatch(
          addModal({
            id: modal.id,
            type: modal.type,
            ...(modal.filterBy && { filterBy: modal.filterBy }),
            ...(modal.mediaType && { mediaType: modal.mediaType }),
            ...(modal.name && { name: modal.name }),
          })
        )
      );
    };
  }, []);

  const handleGoback = () => {
    navigate(-1);
  };

  return (
    <>
      {isLoading && <WatchPageSkeleton />}
      <nav className={classes.navBar}>
        <button onClick={handleGoback} className={classes.goBackBtn}>
          <i className="fa-solid fa-arrow-left"></i>
        </button>
      </nav>
      <div className={classes.wrapper}>
        <iframe
          onLoad={handleIFrameLoad}
          allowFullScreen
          title="embeded movie"
          width="100%"
          height="100%"
          src={url}
        ></iframe>
      </div>
    </>
  );
};

export default WatchPage;
