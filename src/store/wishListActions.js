import { updateDoc, doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/config";
import { replaceWishList } from "./wishListSlice";

export const getWishList = (docId) => {
  return async (dispatch) => {
    try {
      const docRef = doc(db, "users", docId);
      const docData = await getDoc(docRef);
      const wishList = docData.data().wishList;
      dispatch(replaceWishList({currentUserWishList: wishList}))
    }catch (e) {
      console.error(e);
    }
  };
};

export const updateList = (wishList, docId) => {
  return async (dispatch) => {
    const docRef = doc(db, "users", docId);
    try {
      const data = {
        wishList,
      };
      await updateDoc(docRef, data);
    } catch (e) {
      console.error(e);
    }
  };
};
