import React from "react";
import { useSelector } from "react-redux";
import MovieCard from "../MovieCard/MovieCard";
import classes from "./MyList.module.scss";

const MyList = () => {
  const wishList = useSelector((state) => {
    return state.wishList.currentUserWishList;
  });
  return (
    <>
      {wishList.length > 0 && (
        <div className={classes.list}>
          {wishList?.map((movie) => (
              <MovieCard
                key={movie.id}
                posterURL={movie.posterURL}
                movieName={movie.name}
                genres={movie.genres}
                id={movie.id}
                type={movie.type}
                className={classes.movieCard}
              />
        
          ))}
        </div>
      )}
    </>
  );
};

export default MyList;
