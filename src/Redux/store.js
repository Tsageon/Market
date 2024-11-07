import { configureStore, combineReducers } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import itemsReducer from './itemSlice';
import cartReducer from './cartSlice'


const rootReducer = combineReducers({
  user: authReducer,
  items: itemsReducer,
  cart: cartReducer,
});

export const store = configureStore({
  reducer: rootReducer, 
});
