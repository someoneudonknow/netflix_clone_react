import { createSlice } from "@reduxjs/toolkit";

const wishListSlice = createSlice({
    name: 'wishList',
    initialState: {
        currentUserWishList: JSON.parse(localStorage.getItem("wishList")) || [],
        changed: false,
    },
    reducers: {
        replaceWishList: (state, { payload }) => {
            state.currentUserWishList = payload.currentUserWishList;
        },
        addToWishList: (state, {payload}) => {
            const data = payload.movie;
            state.currentUserWishList.push(data);
            state.changed = true;
        },
        removeFromWishList: (state, {payload}) => {
            const filmId = payload.id;

            state.currentUserWishList = state.currentUserWishList.filter((movie) => {
                return movie.id !== filmId;
            })
            state.changed = true;
        }
    }
});

export const { replaceWishList, addToWishList, removeFromWishList} = wishListSlice.actions;
export default wishListSlice.reducer;