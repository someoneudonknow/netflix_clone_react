import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect, useMemo, useCallback } from "react";
import { addToWishList, removeFromWishList } from "../store/wishListSlice";

//TODO: sua lai add to wwishlist
const useWishList = (id) => {
  const wishList = useSelector(state => state.wishList.currentUserWishList); 
  const dispatch = useDispatch();
  const [isInWishList, setIsInWishList] = useState(false);

  useEffect(() => {
    const isExist = wishList?.find((item) => item.id === id);
    if (isExist) {
      setIsInWishList(true);
    } else {
      setIsInWishList(false);
    }
  }, [wishList, id]);

  const addToList = useCallback((data) => {
    if (!isInWishList) {
      dispatch(addToWishList(data));
    } else {
      dispatch(removeFromWishList({ id }));
    }
  }, [isInWishList]);

  return {
    isInWishList,
    addToList,
  };
};

export default useWishList;
