import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'user',
  initialState: {
    user: null, 
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
    },
  },
});

export const { setUser, logout } = authSlice.actions;
export const selectUser = (state) => state.user.user;
export default authSlice.reducer;