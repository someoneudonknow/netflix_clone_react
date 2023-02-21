import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { auth } from "../../../firebase/config";
import classes from "./AvatarDropDown.module.scss";

const AvatarDropDownBox = ({ userName, userAvatar }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await auth.signOut();
      navigate("/vn/login_register/login", { replace: true });
    } catch (error) {
      console.error(error?.message);
    }
  };

  return (
    <div className={classes.dropdownMenu}>
      <ul>
        <li className={classes.dropdownMenuItem}>
          <img className={classes.dropdownAvt} src={userAvatar} alt="avatar" />
          <a href="#">
            <p className="text-truncate" style={{ maxWidth: "14rem" }}>
              {userName}
            </p>
          </a>
        </li>
        <li className={classes.dropdownMenuItem}>
          <i className="fa-regular fa-pen-to-square"></i>
          <Link to="/vn/profile">Manage Profiles</Link>
        </li>
        <li className={classes.dropdownMenuItem}>
          <i className="fa-regular fa-user"></i>
          <a href="#">Account</a>
        </li>
        <li className={classes.dropdownMenuItem}>
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

const AvatarDropDown = ({ userName, userAvatar }) => {
  const [isAvatarHover, setIsAvatarHover] = useState(false);

  const handleMouseEnter = () => {
    setIsAvatarHover(true);
  };

  const handleMouseLeave = () => {
    setIsAvatarHover(false);
  };

  return (
    <div
      style={{ position: "relative" }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className={classes.avatar}>
        <img src={userAvatar} alt="user avatar" />
        <i
          style={
            isAvatarHover
              ? { transform: "rotate(180deg)" }
              : { transform: "rotate(360deg)" }
          }
          className="fa-solid fa-caret-up"
        ></i>
      </div>
      {isAvatarHover && (
        <AvatarDropDownBox userName={userName} userAvatar={userAvatar} />
      )}
    </div>
  );
};

export default AvatarDropDown;
