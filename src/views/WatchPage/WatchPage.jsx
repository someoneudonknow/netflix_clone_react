import { useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { useEffect, useContext } from "react";
import classes from "./WatchPage.module.scss";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../store/Auth/AuthProvider";
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
  const [isLoading, setIsLoading] = useState();
  const [searchParams] = useSearchParams();
  const { currentUser } = useContext(AuthContext);
  const isMovie = searchParams.get("isMovie");
  let url;
  console.log({ isMovie });
  const navigate = useNavigate();

  if (isMovie === "true") {
    const movieId = searchParams.get("id");
    url = `${process.env.REACT_APP_WATCH_BASE_URL}${movieId}`;
  } else {
    const tvId = searchParams.get("id");
    const s = searchParams.get("s");
    const e = searchParams.get("e");

    url = `${process.env.REACT_APP_WATCH_TV_BASE_URL}${tvId}&s=${s}&e=${e}`;
  }

  useEffect(() => {
    setIsLoading(true);
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  const handleGoback = () => {
    navigate(-1);
  };

  console.log(url)
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
          allow="accelerometer;"
          allowFullScreen
          title="embeded movie"
          width="100%"
          height="100%"
          frameborder="0"
          src={url}
        ></iframe>
      </div>
    </>
  );
};

export default WatchPage;
