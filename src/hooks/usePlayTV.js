import { useNavigate } from "react-router-dom";
import { setModalInfo } from "../functions";

const usePlayTV = () => {
  const navigate = useNavigate();
  
  const playTV = (id, season, episode) => {
    const modalInfo = {
      isModalOpen: true,
      id: id,
      type: "tv"
    }
    setModalInfo(modalInfo);
    navigate(`/vn/watch?isMovie=false&id=${id}&s=${season}&e=${episode}`);
  };

  return playTV;
};

export default usePlayTV;
