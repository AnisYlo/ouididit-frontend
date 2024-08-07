import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: { email: '', password: '', token: '' },
};

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    userConnect: (state, action) => {
        state.value.nickname = action.payload;
      },
    logout: (state) => {
      state.value.nickname = null;
      state.value.token = null
    }
  },
});

export const {userConnect, logout} = usersSlice.actions;
export default usersSlice.reducer;
