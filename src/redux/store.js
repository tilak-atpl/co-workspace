import { configureStore } from '@reduxjs/toolkit';
import propertyReducer from './slices/propertySlice';
// import authReducer from './slices/authSlice';

export const store = configureStore({
  reducer: {
    properties: propertyReducer,
//     auth: authReducer,
  },
});
