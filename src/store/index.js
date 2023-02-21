import { configureStore } from "@reduxjs/toolkit";
import movieSlice from "./movieSlice";
import wishListSlice from "./wishListSlice";
import modalSlice from "./modalSlice";
import TVSlice from "./TVSlice";

const store = configureStore({
  reducer: {
    movie: movieSlice,
    tv: TVSlice,
    wishList: wishListSlice,
    modals: modalSlice,
  },
});

export default store;
