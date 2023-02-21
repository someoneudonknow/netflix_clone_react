import React, { useState, useEffect } from "react";
import { Spinner } from "react-bootstrap";
import { useDispatch } from "react-redux";
import classes from "./NotificationsList.module.scss";
import { getUpcoming } from "../../../utils/api";
import noImage from "../../../assets/images/Poster Not Available.jpg";
import { addModal } from "../../../store/modalSlice";

const NotificationList = () => {
  const [upcoming, setUpcoming] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const getUpcomingMovies = async () => {
      setIsLoading(true);
      try {
        const upcomingMovies = await getUpcoming();
        setUpcoming(upcomingMovies);
      } catch (e) {
        console.log(e);
      }
      setIsLoading(false);
    };
    getUpcomingMovies();
  }, []);

  const handleMouseEntered = () => {
    setIsHovered(true);
  };

  const handleMouseLeaved = () => {
    setIsHovered(false);
  };

  return (
    <div
      onMouseEnter={handleMouseEntered}
      onMouseLeave={handleMouseLeaved}
      className={classes.notification}
    >
      {upcoming.length > 0 && (
        <small className={classes.newFilm}>{upcoming.length}</small>
      )}
      <i className="fa-solid fa-bell"></i>
      {isHovered && (
        <NotificationBox notifications={upcoming} isLoading={isLoading} />
      )}
    </div>
  );
};

const NotificationBox = ({ notifications, isLoading }) => {
  return (
    <div className={classes.notificationBox}>
      {isLoading && (
        <div className={classes.spinnerWrapper}>
          <Spinner animation="border" variant="light" />
        </div>
      )}
      <ul className={classes.notiListWrapper}>
        {!isLoading &&
          notifications.map((notifiItem) => (
            <NotificationItem
              key={notifiItem.id}
              title={notifiItem.title}
              time={notifiItem.releaseDate}
              image={notifiItem.posterURL}
              id={notifiItem.id}
            />
          ))}
      </ul>
    </div>
  );
};

const NotificationItem = ({ title, time, image, id }) => {
  const releaseDate = new Date(time);
  const now = Date.now();
  const gap = releaseDate - now;
  const daysGap = Math.floor(gap / (60 * 60 * 24) / 1000);
  let dateContent = "";
  const dispatch = useDispatch();

  if (daysGap < 0) {
    const timeGap = Math.abs(daysGap);

    if (timeGap > 30 && timeGap < 365) {
      const monthsGone = Math.floor(timeGap / 30);
      dateContent = `${monthsGone} months ago`;
    } else if (timeGap > 365) {
      const yearsGone = Math.floor(timeGap / 365);
      dateContent = `${yearsGone} years ago`;
    } else {
      const daysGone = Math.floor(timeGap);
      dateContent = `${daysGone} days ago`;
    }
  } else if (daysGap > 0) {
    if (daysGap <= 7 && daysGap < 30) {
      dateContent = `${daysGap} days left until release`;
    } else if (daysGap > 30) {
      const remainMonths = Math.floor(daysGap / 30);
      dateContent = `${remainMonths} months left until release`;
    }
  }

  const handleNotifiItemClicked = () => {
    if (daysGap > 0) return;
    dispatch(addModal({ id, type: "movie" }));
  };

  return (
    <li onClick={handleNotifiItemClicked} className={classes.notifiItem}>
      <img
        src={
          image ? `${process.env.REACT_APP_BASE_IMAGE_URL}${image}` : noImage
        }
        alt="notification image"
      />
      <div className={classes.notifiContent}>
        <h3>{title}</h3>
        <p>{dateContent}</p>
      </div>
    </li>
  );
};

export default NotificationList;
