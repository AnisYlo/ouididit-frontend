import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuthenticated: false,
  value: { username: '', email: '', token: '', avatar: '', name: '', location: '', date: ''  },
};

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    //fonction pour se Signin 
    login: (state, action) => {
      state.isAuthenticated = true;
      state.value = { ...state.value, ...action.payload };
    },
    //fonction pour se Logout
    logout: (state) => {
      state.isAuthenticated = false;
      state.value = initialState.value;
    },
  },
});

export const {login, logout } = usersSlice.actions;
export default usersSlice.reducer;