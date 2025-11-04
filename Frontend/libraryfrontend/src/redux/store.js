import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import bookReducer from './slices/bookSlice';
import categoriesReducer from './slices/categorySlice'
import usersReducer from './slices/userSlice'
const store = configureStore({
  reducer: {
    auth: authReducer,
    books: bookReducer,
    categories: categoriesReducer,
    users : usersReducer
  },
});

export default store;
