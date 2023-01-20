import { useSelector, useDispatch } from "react-redux";
import { useContext } from "react";
import { useState, useEffect, useMemo } from "react";
import { addToWishList, removeFromWishList } from "../store/wishListSlice";
import { AuthContext } from "../store/Auth/AuthProvider";
// import useFireStore from "./useFireStore";
// import { updateDoc, doc } from "firebase/firestore";
// import { db } from "../firebase/config";
// import { replaceWishList } from "../store/wishListSlice";

//TODO: sua lai add to wwishlist

const useWishList = (id) => {
  const wishList = useSelector(state => state.wishList.currentUserWishList); 
  const dispatch = useDispatch();
  const [isInWishList, setIsInWishList] = useState(false);
  
  // const ctx = useContext(AuthContext);
  // const conditions = useMemo(
  //   () => ({
  //     fieldName: "uid",
  //     operator: "==",
  //     value: ctx.currentUser.uid,
  //   }),
  //   [ctx.currentUser.uid]
  // );
  // const document = useFireStore("users", conditions);

  useEffect(() => {
    const isExist = wishList?.find((item) => item.id === id);

    if (isExist) {
      setIsInWishList(true);
    } else {
      setIsInWishList(false);
    }
  }, [wishList, id]);

  useEffect(() => {
    if (wishList) {
      // (async () => {
      //   setIsLoading(true);
      //   const docRef = doc(db, "users", document.docId);
      //   try {
      //     const data = {
      //       wishList,
      //     }
      //     const docR = await updateDoc(docRef, data);
      //   }catch (e) {
      //     console.error(e);
      //   }
      //   setIsLoading(false)
      // })();
      window.localStorage.setItem("wishList", JSON.stringify(wishList));
    }
  }, [dispatch, wishList]);

  const addToList = (data) => {
    if (!isInWishList) {
      dispatch(addToWishList(data));
    } else {
      dispatch(removeFromWishList({ id }));
    }
  };

  return {
    isInWishList,
    addToList,
  };
};

export default useWishList;
