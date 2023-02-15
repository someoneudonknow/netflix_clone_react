import { useNavigate } from "react-router-dom";

const usePlayMovie = () => {
  const navigate = useNavigate();

  const playMovie = (id) => {
    navigate(`/vn/watch?isMovie=true&id=${id}`);
  };

  return playMovie;
};

export default usePlayMovie;
