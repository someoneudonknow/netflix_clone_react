import React, { useContext, useEffect } from "react";
import classes from "./MainNavigation.module.scss";
import demoImage from "../../../assets/images/demoNotifiImage.png";
import { NavLink, Link } from "react-router-dom";
import { useState, useRef } from "react";
import { Wrapper } from "../../UI";
import avatar from "../../../assets/images/avatar_demo.png";
import logo from "../../../assets/images/netflix_logo.png";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../store/Auth/AuthProvider";
import { auth } from "../../../firebase/config";
// TODO: split this file into separate.

const DUMMY_NOTIFICATIONS = [
  // {
  //   id: "n1",
  //   title: "Ra mắt vào ngày 6 tháng 11 Phát trailer",
  //   time: "Hôm nay",
  //   image: demoImage,
  // },
  // {
  //   id: "n2",
  //   title: "Ra mắt vào ngày 6 tháng 11 Phát trailer",
  //   time: "Hôm nay",
  //   image: demoImage,
  // },
];

const NotificationItem = ({ title, time, image }) => {
  return (
    <li className={classes.notifiItem}>
      <img src={image} alt="notification image" />
      <div className={classes.notifiContent}>
        <h3>{title}</h3>
        <p>{time}</p>
      </div>
    </li>
  );
};

const NotificationList = ({ notifications }) => {
  return (
    <ul>
      {!notifications && <p>Nothing</p>}
      {notifications &&
        notifications.map((notifiItem) => (
          <NotificationItem
            key={notifiItem.id}
            title={notifiItem.title}
            time={notifiItem.time}
            image={notifiItem.image}
          />
        ))}
    </ul>
  );
};

const AvatarDropdown = ({userName, userAvatar}) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      auth.signOut();
      navigate("/vn/login_register/login", { replace: true });
    } catch (error) {
      console.error(error?.message)
    }
  };

  return (
    <div className={classes.dropdownMenu}>
      <ul>
        <li>
          <img src={userAvatar} alt="avatar" />
          <a href="#">
            <p className="text-truncate" style={{maxWidth: "14rem"}}>{userName}</p>
          </a>
        </li>
        <li>
          <i className="fa-regular fa-pen-to-square"></i>
          <a href="#">Manage Profiles</a>
        </li>
        <li>
          <i className="fa-regular fa-user"></i>
          <a href="#">Account</a>
        </li>
        <li>
          <i className="fa-regular fa-circle-question"></i>
          <a href="#">Help Center</a>
        </li>
      </ul>
      <a onClick={handleLogout} className={classes.logout}>
        Sign out of Netflix
      </a>
    </div>
  );
};

const MainNavigation = () => {
  const [toggleSearchBox, setToggleSearchBox] = useState(false);
  const [enteredSearchBox, setEnteredSearchBox] = useState("");
  const [isAvatarHover, setIsAvatarHover] = useState(false);
  const [showNavBackground, setShowNavBackground] = useState(false);
  const inputRef = useRef();
  const isEntered = enteredSearchBox.trim() != "";
  const {currentUser} = useContext(AuthContext)

  const userId = currentUser.uid;
  const userName = currentUser.displayName || currentUser.email;
  const avatarSrc = currentUser.photoURL || avatar;

  useEffect(() => {
    const handleShowBackground = () => {
      if(document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
        setShowNavBackground(true);
      }else{
        setShowNavBackground(false);
      }
    }
    window.addEventListener('scroll', handleShowBackground)
  
    return () => {
      window.removeEventListener('scroll', handleShowBackground)
    }
  }, [setShowNavBackground, document.body.scrollTop])
  

  const handleSearchBoxClick = () => {
    setToggleSearchBox((prevState) => !prevState);
  };

  const handleSearchBoxInput = (e) => {
    setEnteredSearchBox(e.target.value);
  };

  const handleInputBlur = () => {
    if (!isEntered) {
      setToggleSearchBox(false);
    }
  };

  const handleCancelClick = () => {
    if (isEntered) {
      setEnteredSearchBox("");
      inputRef.current.focus();
    } else {
      setToggleSearchBox((prevState) => !prevState);
    }
  };

  const handleMouseEnter = () => {
    setIsAvatarHover(true);
  };

  const handleMouseLeave = () => {
    setIsAvatarHover(false);
  };

  return (
    <header>
      <div className={`${classes.container} ${showNavBackground ? classes.showBackground : ""}`}>
        <Wrapper>
          <nav>
            <ul className={classes.firstList}>
              <li>
                <Link to={`/vn/home/${userId}`} className={classes.navLogo}>
                  <img src={logo} alt="main logo" />
                </Link>
              </li>
              <li>
                <NavLink
                  to={`/vn/home/${userId}`}
                  className={(navData) =>
                    navData.isActive ? classes.active : ""
                  }
                >
                  Movies
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/vn/TVShow"
                  className={(navData) =>
                    navData.isActive ? classes.active : ""
                  }
                >
                  TV Shows
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/vn/trending"
                  className={(navData) =>
                    navData.isActive ? classes.active : ""
                  }
                >
                  Trending
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/vn/myList"
                  className={(navData) =>
                    navData.isActive ? classes.active : ""
                  }
                >
                  My List
                </NavLink>
              </li>
            </ul>
            <ul className={classes.secondList}>
              <li>
                <div
                  className={`${classes.searchBox} ${
                    toggleSearchBox ? classes.searchActive : ""
                  }`}
                >
                  <button onClick={handleSearchBoxClick}>
                    <i className="fa-solid fa-magnifying-glass"></i>
                  </button>
                  <div className={classes.inputField}>
                    {toggleSearchBox && (
                      <input
                        ref={inputRef}
                        onChange={handleSearchBoxInput}
                        onBlur={handleInputBlur}
                        value={enteredSearchBox}
                        type="text"
                        placeholder="Titles, people, genres,..."
                        autoFocus
                      />
                    )}
                    {toggleSearchBox && (
                      <button onClick={handleCancelClick}>
                        {isEntered && <i className="fa-solid fa-xmark"></i>}
                      </button>
                    )}
                  </div>
                </div>
              </li>
              <li>
                <p className="text-truncate" style={{maxWidth: "14rem"}}>{userName}</p>
              </li>
              <li className={classes.notification}>
                <i className="fa-solid fa-bell"></i>
                <div className={classes.notificationBox}>
                  <NotificationList notifications={DUMMY_NOTIFICATIONS} />
                </div>
              </li>
              <li
                style={{ position: "relative" }}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <div className={classes.avatar}>
                  <img src={(avatarSrc || avatar)} alt="user avatar" />
                  <i
                    style={
                      isAvatarHover
                        ? { transform: "rotate(180deg)" }
                        : { transform: "rotate(360deg)" }
                    }
                    className="fa-solid fa-caret-up"
                  ></i>
                </div>
                {isAvatarHover && <AvatarDropdown userName={userName} userAvatar={avatarSrc}/>}
              </li>
            </ul>
          </nav>
        </Wrapper>
      </div>
    </header>
  );
};

export default MainNavigation;
