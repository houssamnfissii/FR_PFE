// tourSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Define the initial state
const initialState = {
  tours: [],
  tourDetails: null,
  status: 'idle',
  error: null,
};

// Define the async thunk to fetch tours
const fetchTours = createAsyncThunk('tours/fetchTours', async () => {
  try {
    const response = await axios.get('http://127.0.0.1:8000/api/tours');
    return response.data.data;
  } catch (error) {
    throw error;
  }
});


// Create a tour slice
const tourSlice = createSlice({
  name: 'tours',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTours.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTours.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.tours = action.payload;
      })
      .addCase(fetchTours.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
  },
});

// Export the reducer
export default tourSlice.reducer;

// Export the async thunks
export { fetchTours};
