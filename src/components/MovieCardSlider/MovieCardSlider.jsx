import React, { useRef, memo, forwardRef } from "react";
import classes from "./MovieCardSlider.module.scss";
import MovieCard from "../MovieCard/MovieCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";

import "swiper/scss";
import "swiper/scss/navigation";
import "swiper/scss/pagination";

const MovieCardSlider = ({ title, movieList, tv }, ref) => {
  const swiperRef = useRef();

  return (
    <div ref={ref}>
      <h1 className={classes.title}>{title}</h1>
      <Swiper
        modules={[Navigation]}
        className={classes.slider}
        spaceBetween={5}
        slidesPerView={6}
        loop={true}
        slidesPerGroup={5}
        initialSlide={0}
        onBeforeInit={(swiper) => {
          swiperRef.current = swiper;
        }}
      >
        <button 
          className={classes.actionPrev}
          onClick={() => swiperRef.current?.slidePrev()}
        >
          <i className="fa-solid fa-chevron-left"></i>
        </button>
        {movieList?.map((movie, i) => {
          return (
            <SwiperSlide key={movie?.id} className={classes.slideItem}>
              <MovieCard
                type={tv ? 'tv' : 'movie'}
                className={classes.card}
                posterURL={movie?.posterURL}
                movieName={movie.title}
                genres={movie.genresId}
                id={movie?.id}
              />
            </SwiperSlide>
          );
        })}

        <button
          className={classes.actionNext}
          onClick={() => swiperRef.current?.slideNext()}
        >
          <i className="fa-solid fa-chevron-right"></i>
        </button>
      </Swiper>
    </div>
  );
};

export default forwardRef(MovieCardSlider);
