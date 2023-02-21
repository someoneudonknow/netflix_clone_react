import { createSlice } from "@reduxjs/toolkit";

const TVSlice = createSlice({
  name: "tv",
  initialState: {
    tvGenresInfo: [],
  },
  reducers: {
    replaceTVGenres: (state, { payload }) => {
      state.tvGenresInfo = payload;
    },
  },
});

export const { replaceTVGenres } = TVSlice.actions;
export default TVSlice.reducer;
