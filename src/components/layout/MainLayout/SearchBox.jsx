import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useSearchParams, useLocation } from "react-router-dom";
import classes from "./SearchBox.module.scss";

const SearchBox = () => {
  const [toggleSearchBox, setToggleSearchBox] = useState(false);
  const [enteredSearchBox, setEnteredSearchBox] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const isEntered = enteredSearchBox.trim() != "";
  const inputRef = useRef();
  const firstType = useRef(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (enteredSearchBox.trim() == "") {
      setSearchParams({});
    } else {
      setSearchParams({ q: enteredSearchBox });
    }
  }, [enteredSearchBox]);

  useEffect(() => {
    if (!isEntered) {
      firstType.current = 0;
    }
  }, [isEntered]);

  const handleSearchBoxClick = () => {
    setToggleSearchBox((prevState) => !prevState);
  };

  const handleSearchBoxInput = (e) => {
    firstType.current++;
    setEnteredSearchBox(e.target.value);
    if (e.target.value !== "" && firstType.current <= 1) {
      navigate(`/vn/search?q=${e.target.value}`);
      window.sessionStorage.setItem("lastPage", location.pathname);
    }
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
  return (
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
  );
};

export default SearchBox;
