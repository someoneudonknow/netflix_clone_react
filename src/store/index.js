import { configureStore } from "@reduxjs/toolkit";
import movieSlice from "./movieSlice";
import wishListSlice from "./wishListSlice";
import modalSlice from "./modalSlice";

const store = configureStore({
  reducer: {
    movie: movieSlice,
    wishList: wishListSlice,
    modals: modalSlice,
  },
});

export default store;
