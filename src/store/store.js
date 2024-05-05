import { configureStore } from '@reduxjs/toolkit';
import tourReducer from '../../src/reducers/TourSlice';

const store = configureStore({
  reducer: {
    tours: tourReducer,
    
  },
});

export default store;