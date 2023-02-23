import React, { useContext, useEffect } from "react";
import classes from "./MainNavigation.module.scss";
import { NavLink, Link } from "react-router-dom";
import { useState } from "react";
import { Wrapper } from "../../UI";
import avatar from "../../../assets/images/avatar_demo.png";
import logo from "../../../assets/images/netflix_logo.png";
import { AuthContext } from "../../../store/Auth/AuthProvider";
import SearchBox from "./SearchBox";
import NotificationList from "./NotificationsList";
import AvatarDropDown from "./AvatarDropDown";

const MainNavigation = () => {
  const [showNavBackground, setShowNavBackground] = useState(false);
  const { currentUser } = useContext(AuthContext);

  const userId = currentUser.uid;
  const userName = currentUser.displayName || currentUser.email;
  const avatarSrc = currentUser.photoURL || avatar;

  useEffect(() => {
    const handleShowBackground = () => {
      if (
        document.body.scrollTop > 80 ||
        document.documentElement.scrollTop > 80
      ) {
        setShowNavBackground(true);
      } else {
        setShowNavBackground(false);
      }
    };
    window.addEventListener("scroll", handleShowBackground);

    return () => {
      window.removeEventListener("scroll", handleShowBackground);
    };
  }, [setShowNavBackground, document.body.scrollTop]);

  return (
    <header>
      <div
        className={`${classes.container} ${
          showNavBackground ? classes.showBackground : ""
        }`}
      >
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
                <SearchBox />
              </li>
              <li>
                <p className="text-truncate" style={{ maxWidth: "14rem" }}>
                  {userName}
                </p>
              </li>
              <li>
                <NotificationList />
              </li>
              <li>
                <AvatarDropDown userName={userName} userAvatar={avatarSrc} />
              </li>
            </ul>
          </nav>
        </Wrapper>
      </div>
    </header>
  );
};

export default MainNavigation;