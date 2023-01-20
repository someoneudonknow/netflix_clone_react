import { configureStore } from "@reduxjs/toolkit";
import movieSlice from "./movieSlice";
import wishListSlice from "./wishListSlice";

const store = configureStore({
  reducer: {
    movie: movieSlice,
    wishList: wishListSlice
  },
});

export default store;
