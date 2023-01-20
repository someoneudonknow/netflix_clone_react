import { createAsyncThunk } from "@reduxjs/toolkit";
import { replaceWishList } from "./wishListSlice";

export const fetchWishList = async () => {
    return (dispatch) => {
      const fetchData = async () => {
        
      }
    }
}

export const addToWishList = createAsyncThunk(
  "wishList/add",
  async (data, { rejectWithValue }) => {

  }
);
