import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addModal } from "../store/modalSlice";


const usePlayTV = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const playTV = (id, season, episode) => {
    dispatch(addModal({id, type: "tv"}));
    navigate(`/vn/watch?isMovie=false&id=${id}&s=${season}&e=${episode}`);
  };

  return playTV;
};

export default usePlayTV;
