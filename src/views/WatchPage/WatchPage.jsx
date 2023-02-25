import { useState, useEffect, useContext } from "react";
import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addModal, removeAllModals } from "../../store/modalSlice";
import classes from "./WatchPage.module.scss";
import Skeleton from "react-loading-skeleton";
import netflixLogo from "../.././assets/images/netflix_logo.png"
import { AuthContext } from "../../store/Auth/AuthProvider";

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
  const ctx = useContext(AuthContext);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const id = searchParams.get("id");
  if (isMovie === "true") { 
    url = `${process.env.REACT_APP_WATCH_BASE_URL}${id}`;
  } else {
    const s = searchParams.get("s");
    const e = searchParams.get("e");

    url = `${process.env.REACT_APP_WATCH_TV_BASE_URL}${id}&s=${s}&e=${e}`;
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
    navigate(`/vn/home/${ctx?.currentUser?.uid}`);
  };

  return (
    <>
      {isLoading && <WatchPageSkeleton />}
      <nav className={classes.navBar}>
        <button onClick={handleGoback} className={classes.goBackBtn}>
          <img src={netflixLogo} alt="page-logo"/>
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
