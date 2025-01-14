import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async thunk to fetch form data
export const fetchGravityForm = createAsyncThunk(
  'gravityForm/fetchGravityForm',
  async (formId) => {
    const response = await fetch(`/api/getGravityForm?formId=${formId}`);
    if (!response.ok) throw new Error('Failed to fetch form data');
    const data = await response.json();
    return data;
  }
);

const gravityFormSlice = createSlice({
  name: 'gravityForm',
  initialState: {
    formData: null,
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGravityForm.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchGravityForm.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.formData = action.payload;
      })
      .addCase(fetchGravityForm.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default gravityFormSlice.reducer;
