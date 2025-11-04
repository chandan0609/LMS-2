import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import bookReducer from './slices/bookSlice';
import categoriesReducer from './slices/categorySlice'
import usersReducer from './slices/userSlice'
import bookDetailReducer from './slices/bookDetailSlice'
const store = configureStore({
  reducer: {
    auth: authReducer,
    books: bookReducer,
    categories: categoriesReducer,
    users : usersReducer,
    bookDetail: bookDetailReducer,
  },
});

export default store;
