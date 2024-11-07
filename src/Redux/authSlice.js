import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: JSON.parse(localStorage.getItem('User')) || null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      localStorage.setItem('User', JSON.stringify(action.payload)); 
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
    logout: (state) => {
      state.user = null;
      localStorage.removeItem('User');
    },
  },
});

export const { setUser, setError, setLoading, logout } = authSlice.actions;
export const selectUser = (state) => state.user.user;
export default authSlice.reducer;
