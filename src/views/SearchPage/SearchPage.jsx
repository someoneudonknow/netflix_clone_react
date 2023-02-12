import React, { useEffect, useContext, useCallback, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../../store/Auth/AuthProvider";
import { debounce } from "../../functions";
import MovieCard from "../../components/MovieCard/MovieCard";
import { getSearchResults } from "../../utils/api";
import classes from "./SearchPage.module.scss";
import { Loading } from "../../components/UI";

const SearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const ctx = useContext(AuthContext);
  const navigate = useNavigate();
  const lastPage = window.sessionStorage.getItem("lastPage");
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getSearchResult = useCallback(
    debounce(500, async (p) => {
      setIsLoading(true);
      try {
        const results = await getSearchResults(p);
        setSearchResults(results);
        console.log(results);
        console.log("call api");
      } catch (e) {
        console.log(e);
      }
      setIsLoading(false)
    }),
    []
  );

  useEffect(() => {
    if (searchParams.get("q") === "") {
      setSearchParams({});
      if (lastPage) {
        navigate(lastPage);
      } else {
        navigate("/vn/home/" + ctx.currentUser.uid);
      }
    } else {
      getSearchResult(searchParams.get("q"));
    }
  }, [searchParams]);

  if(isLoading) {
    return <Loading/>
  }

  return (
    <div className={classes.searchPage}>
      <div className={classes.movieCardWrapper}>
        {searchResults.length > 0  && searchResults.map((result) => (
          <MovieCard
            key={result?.id}
            id={result?.id}
            posterURL={result?.posterURL}
            movieName={result?.movieName}
            genres={result?.genres}
            type={result?.type}
            className={classes.movieCard}
          />
        ))}
        {!(searchResults.length > 0) && <p className="text-light display-1">No results</p>}
      </div>
    </div>
  );
};

export default SearchPage;
