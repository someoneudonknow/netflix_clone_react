import defaultImg from "../assets/images/Poster Not Available.jpg";

const checkIsRelease = (releaseDate) => {
  const releaseTime = new Date(releaseDate).getTime();
  const now = Date.now();
  const eslapedTime = releaseTime - now;
  const isReleased = eslapedTime <= 0;

  return isReleased;
};

export const getGenres = async () => {
  const response = await fetch(
    `${process.env.REACT_APP_BASE_URL}/genre/movie/list?api_key=${process.env.REACT_APP_API_KEY}`
  );
  const genresList = await response.json();

  return genresList;
};

export const getTrending = async (time, type) => {
  const response = await fetch(
    `${process.env.REACT_APP_BASE_URL}/trending/${type}/${time}?api_key=${process.env.REACT_APP_API_KEY}`
  );
  if (!response.ok) {
    throw new Error("Something went wrong!!");
  }
  const { results: trendingMovie } = await response.json();

  const transformedData = trendingMovie.map((movie) => {
    return {
      isAdult: movie.adult,
      title: movie.title || movie?.name,
      description: movie.overview,
      id: movie.id,
      posterURL: movie.backdrop_path || movie.poster_path,
      genresId: movie?.genre_ids,
    };
  });

  return transformedData;
};

export const getLastest = async () => {
  const response = await fetch(
    `${process.env.REACT_APP_BASE_URL}/movie/latest?api_key=${process.env.REACT_APP_API_KEY}`
  );
  if (!response.ok) {
    throw new Error("Something went wrong!!");
  }
  const lastestMovie = await response.json();

  const transformedData = {
    isAdult: lastestMovie.adult,
    title: lastestMovie.title,
    description: lastestMovie.overview,
    id: lastestMovie.id,
    posterURL: lastestMovie.backdrop_path,
  };

  return transformedData;
};

export const getMoviesByGenres = async (genresId, page) => {
  const response = await fetch(
    `${process.env.REACT_APP_BASE_URL}/discover/movie?api_key=${
      process.env.REACT_APP_API_KEY
    }${new URLSearchParams({
      with_genres: genresId,
      page: page,
    })}`
  );
  const movieList = await response.json();

  const transformedData = movieList?.results.map((movie) => {
    return {
      isAdult: movie.adult,
      title: movie.title,
      description: movie.overview,
      id: movie.id,
      posterURL: movie.backdrop_path || movie.poster_path,
      genresId: movie?.genre_ids,
    };
  });

  return transformedData;
};

export const getMovieById = async (id) => {
  const response = await fetch(
    `${process.env.REACT_APP_BASE_URL}/movie/${id}?api_key=${process.env.REACT_APP_API_KEY}`
  );

  const movie = await response.json();

  return movie;
};

export const getCastById = async (id) => {
  const response = await fetch(
    `${process.env.REACT_APP_BASE_URL}/movie/${id}/credits?api_key=${process.env.REACT_APP_API_KEY}}`
  );

  const castList = await response.json();

  return castList;
};

export const getCollectionById = async (collectionId) => {
  const response = await fetch(
    `${process.env.REACT_APP_BASE_URL}/collection/${collectionId}?api_key=${process.env.REACT_APP_API_KEY}`
  );

  const collectionList = await response.json();

  let transformedCollectionData = collectionList?.parts.map((item) => {
    const isReleased = checkIsRelease(item?.release_date);

    return {
      id: item?.id,
      title: item?.title,
      overview: isReleased
        ? item?.overview
        : `Available ${item?.release_date || "soon"}`,
      posterURL:
        item?.backdrop_path ||
        collectionList?.backdrop_path ||
        collectionList?.poster_path,
      duration: null,
      unReleased: !isReleased,
      genresId: item?.genre_ids,
    };
  });

  return transformedCollectionData;
};

export const getSimilarMovies = async (id) => {
  const response = await fetch(
    `${process.env.REACT_APP_BASE_URL}/movie/${id}/similar?api_key=${
      process.env.REACT_APP_API_KEY
    }&page=${Math.floor(Math.random() * 3) + 1}`
  );

  const similarMovieList = await response.json();

  const transformedData = similarMovieList?.results.map((movie) => {
    return {
      posterURL: movie?.backdrop_path || movie?.poster_path,
      releaseYear: movie?.release_date?.substring(
        -1,
        movie?.release_date?.indexOf("-")
      ),
      overview: movie?.overview,
      duration: null,
      id: movie?.id,
      title: movie?.title,
      genresId: movie?.genre_ids,
    };
  });

  return transformedData;
};

//TV show

export const getTVShowByGenres = async (genresId, page) => {
  const response = await fetch(
    `${process.env.REACT_APP_BASE_URL}/discover/tv?api_key=${
      process.env.REACT_APP_API_KEY
    }${new URLSearchParams({
      with_genres: genresId,
      page: page,
    })}`
  );

  const TVShow = await response.json();

  const transformedData = TVShow?.results.map((TVShow) => {
    return {
      title: TVShow.name,
      description: TVShow.overview,
      id: TVShow.id,
      posterURL: TVShow.backdrop_path || TVShow.poster_path,
      genresId: TVShow?.genre_ids,
    };
  });
  return transformedData;
};

export const getTVById = async (id) => {
  const response = await fetch(
    `${process.env.REACT_APP_BASE_URL}/tv/${id}?api_key=${process.env.REACT_APP_API_KEY}`
  );

  const data = await response.json();

  const transformedData = {
    id: data?.id,
    title: data?.name,
    episodeDuration: data?.episode_run_time,
    genres: data?.genres,
    overview: data?.overview,
    posterURL: data?.backdrop_path || data?.poster_url,
    creators: data?.created_by,
    seasonNumber: data?.number_of_seasons,
    seasonsDetails: data?.seasons,
    releaseDate: data?.first_air_date,
  };

  return transformedData;
};

export const getSimilarTVShows = async (id) => {
  const response = await fetch(
    `${process.env.REACT_APP_BASE_URL}/tv/${id}/similar?api_key=${
      process.env.REACT_APP_API_KEY
    }&page=${Math.floor(Math.random() * 3) + 1}`
  );

  const data = await response.json();

  const transformedData = data?.results.map((tv) => {
    return {
      posterURL: tv.backdrop_path || tv.poster_path,
      title: tv.name || tv.original_name,
      genresId: tv.genre_ids,
      id: tv.id,
      releaseYear: tv?.first_air_date?.substring(
        0,
        tv?.first_air_date?.indexOf("-")
      ),
      overview: tv?.overview || "Unreleased",
    };
  });

  return transformedData;
};

export const getTVShowCastById = async (id) => {
  const response = await fetch(
    `${process.env.REACT_APP_BASE_URL}/tv/${id}/credits?api_key=${process.env.REACT_APP_API_KEY}`
  );

  const data = await response.json();

  return data;
};

export const getEpisodesByIdAndNumber = async (id, number) => {
  const response = await fetch(
    `${process.env.REACT_APP_BASE_URL}/tv/${id}/season/${number}?api_key=${process.env.REACT_APP_API_KEY}`
  );

  const data = await response.json();

  const transformedData = data?.episodes?.map((episode) => {
    const isReleased = checkIsRelease(episode?.air_date);
    return {
      episodeNumber: episode?.episode_number,
      id: episode?.id,
      title: episode?.name,
      overview: isReleased
        ? episode?.overview
        : `Available ${episode?.air_date}`,
      seasonNumber: episode?.season_number,
      posterURL: episode?.still_path,
      unReleased: !isReleased,
    };
  });

  return transformedData;
};

export const getSearchResults = async (q, page = 1, adult = false) => {
  const response = await fetch(
    `${process.env.REACT_APP_BASE_URL}/search/multi?api_key=${
      process.env.REACT_APP_API_KEY
    }&query=${encodeURIComponent(q)}&page=${page}&include_adult=${!!adult}`
  );

  const results = await response.json();

  const transformedResults = results?.results.map((d) => {
    return {
      posterURL: d.backdrop_path || d.poster_path || defaultImg,
      movieName: d.name || d.title,
      genres: d.genre_ids || [],
      id: d.id,
      type: d.media_type,
    };
  });

  return transformedResults;
};

export const getUpcoming = async () => {
  const respone = await fetch(
    `${process.env.REACT_APP_BASE_URL}/movie/upcoming?api_key=${process.env.REACT_APP_API_KEY}`
  );

  const results = await respone.json();

  const transformedResults = results?.results?.map(result => ({
    id: result.id,
    title: result.title || result.original_title,
    releaseDate: result.release_date,
    posterURL: result.backdrop_path || result.poster_path
  }));

  return transformedResults;
};
