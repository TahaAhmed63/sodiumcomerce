// menuSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const pagesData = createAsyncThunk('/fetchpagesdata', async () => {
  try {
    const response = await axios.get('http://localhost/metaweb/wp-json/wp/v2/pages');
    return response.data;
  } catch (error) {
    throw error;
  }
});

const pageSlice = createSlice({
  name: 'page',
  initialState: {
    data: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(pagesData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(pagesData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(pagesData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default pageSlice.reducer;
