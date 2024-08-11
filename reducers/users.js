import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuthenticated: false,
  value: { username: '', email: '', token: '', avatar: '', name: '', location: '', date: ''  },
};

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    login: (state, action) => {
      state.isAuthenticated = true;
      state.value = { ...state.value, ...action.payload };
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.value = initialState.value;
    },
  },
});

export const {login, logout } = usersSlice.actions;
export default usersSlice.reducer;