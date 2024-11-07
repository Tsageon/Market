import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: [],
  reducers: {
    addToCart: (state, action) => {
      const { id, name, description, price, quantity } = action.payload;
    
      if (id && name && price && quantity) {
        const existingItem = state.find(item => item.id === id);
        if (existingItem) {
          existingItem.quantity += quantity;
        } else {
          state.push({ id, name, description, price, quantity });
        }
      } else {
        console.log('Invalid item data in payload:', action.payload);
      }
    },    
  },
});

export const { addToCart } = cartSlice.actions;
export default cartSlice.reducer;