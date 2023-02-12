import { createSlice } from "@reduxjs/toolkit";

const movieSlice = createSlice({
  name: "movie",
  initialState: {
    genresInfo: [],
  },
  reducers: {
    replaceGenres: (state, { payload }) => {
      state.genresInfo = payload;
    },
  },
});

export const { replaceGenres } = movieSlice.actions;
export default movieSlice.reducer;
