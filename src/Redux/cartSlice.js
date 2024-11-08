import { createSlice } from '@reduxjs/toolkit';

const getCartFromLocalStorage = (userId) => {
  const savedCart = localStorage.getItem(`Cart_${userId}`);
  return savedCart ? JSON.parse(savedCart) : [];
};

const getUserFromLocalStorage = () => {
  const savedUser = localStorage.getItem('userId');
  return savedUser ? JSON.parse(savedUser) : null;
};

const saveCartToLocalStorage = (cart, userId) => {
  localStorage.setItem(`Cart_${userId}`, JSON.stringify(cart));
};

const saveUserToLocalStorage = (user) => {
  localStorage.setItem('userId', JSON.stringify(user));
};

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cart: [],
    userId: getUserFromLocalStorage()?.id || null, 
    isAuthenticated: !!getUserFromLocalStorage(),
  },
  reducers: {
    setUser: (state, action) => {
      const user = action.payload;
      state.userId = user.id;
      state.isAuthenticated = true;
      state.cart = getCartFromLocalStorage(user.id);
      saveUserToLocalStorage(user); 
    },
    addToCart: (state, action) => {
      const { id, Name, Description, Price, Quantity, Image } = action.payload;
      const existingItem = state.cart.find(item => item.id === id);
      if (existingItem) {
        existingItem.Quantity += Quantity;
      } else {
        state.cart.push({
          id,
          Name,
          Description,
          Price,
          Quantity: Quantity || 1, 
          Image,
        });
      }
      if (state.userId) {
        saveCartToLocalStorage(state.cart, state.userId); 
      }
    },
    removeFromCart: (state, action) => {
      const updatedCart = state.cart.filter(item => item.id !== action.payload);
      state.cart = updatedCart;
      if (state.userId) {
        saveCartToLocalStorage(updatedCart, state.userId); 
      }
    },
    clearCart: (state) => {
      state.cart = [];
      if (state.userId) {
        saveCartToLocalStorage([], state.userId); 
      }
    },
    logout: (state) => {
      state.userId = null;
      state.isAuthenticated = false;
      state.cart = [];
      localStorage.removeItem('userId'); 
      localStorage.removeItem(`Cart_${state.userId}`); 
    }
  },
});

export const { setUser, addToCart, removeFromCart, clearCart, logout } = cartSlice.actions;
export default cartSlice.reducer;
