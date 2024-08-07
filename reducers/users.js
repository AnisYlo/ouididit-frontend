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
  },
});

export const {userConnect} = usersSlice.actions;
export default usersSlice.reducer;
