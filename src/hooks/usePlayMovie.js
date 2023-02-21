import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addModal } from "../store/modalSlice";

const usePlayMovie = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const playMovie = (id) => {
    dispatch(addModal({id, type: "movie"}));
    navigate(`/vn/watch?isMovie=true&id=${id}`);
  };

  return playMovie;
};

export default usePlayMovie;
