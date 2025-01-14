// menuSlice.js

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


export const fetchProductData = createAsyncThunk("get-products", async () => {
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_SITE_URL}/api/get-products`);
    return response.data;
  } catch (error) {
    throw error;
  }
});
//SDS


const productslice = createSlice({
  name: "products",
  initialState: {
    data: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProductData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchProductData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default productslice.reducer;
