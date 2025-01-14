// menuSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchMenuData = createAsyncThunk('menu/fetchMenuData', async () => {
  try {
    const response = await axios.get('http://localhost/metaweb/wp-json/wp/v2/mymenu');
    return response.data;
  } catch (error) {
    throw error;
  }
});

const menuSlice = createSlice({
  name: 'menu',
  initialState: {
    data: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMenuData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchMenuData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchMenuData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default menuSlice.reducer;
