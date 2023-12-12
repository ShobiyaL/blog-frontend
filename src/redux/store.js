import { configureStore, combineReducers } from '@reduxjs/toolkit';
import user from './slices/user';
import blog from './slices/blog';
const reducer = combineReducers({
  user,
  blog,
});

export const store = configureStore({
  reducer,
});
