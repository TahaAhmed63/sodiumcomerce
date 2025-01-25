// menuSlice.js

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


export const fetchCatagoiesData = createAsyncThunk("catagories", async () => {
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_SITE_URL}/api/catagories`);
    return response.data;
  } catch (error) {
    throw error;
  }
});
//SDS


const catagoriesslice = createSlice({
  name: "catagories",
  initialState: {
    data: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCatagoiesData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCatagoiesData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchCatagoiesData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default catagoriesslice.reducer;
