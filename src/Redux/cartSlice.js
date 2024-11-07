import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: [],
  reducers: {
    addToCart: (state, action) => {
      const existingItem = state.find(item => item.id === action.payload.id);
      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
      } else {
        state.push({ ...action.payload, quantity: action.payload.quantity });
      }
    },
  },
});

export const { addToCart } = cartSlice.actions;
export default cartSlice.reducer;