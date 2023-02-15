import { useNavigate } from "react-router-dom";

const usePlayTV = () => {
  const navigate = useNavigate();

  const playTV = (id, season, episode) => {
    navigate(`/vn/watch?isMovie=false&id=${id}&s=${season}&e=${episode}`);
  };

  return playTV;
};

export default usePlayTV;
