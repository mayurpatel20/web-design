import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isAuthenticated: false,
    role: null,
  },
  reducers: {
    login(state, action) {
      state.isAuthenticated = true;
      state.role = action.payload.role; // e.g., 'admin' or 'employee'
      localStorage.setItem('authToken', true); // Simulate token storage
      localStorage.setItem('role', action.payload.role);
    },
    logout(state) {
      state.isAuthenticated = false;
      state.role = null;
      localStorage.removeItem('authToken');
      localStorage.removeItem('role');
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
