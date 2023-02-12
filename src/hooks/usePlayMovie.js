import { useNavigate } from "react-router-dom";
import { setModalInfo } from "../functions";

const usePlayMovie = () => {
  const navigate = useNavigate();

  const playMovie = (id) => {
    const modalInfo = {
      isModalOpen: true,
      id: id,
      type: "movie"
    }
    setModalInfo(modalInfo);
    navigate(`/vn/watch?isMovie=true&id=${id}`);
  };

  return playMovie;
};

export default usePlayMovie;
