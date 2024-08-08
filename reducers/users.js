import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: { username: '', email: '', token: '', avatar: '' },
};

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    userInfo: (state, action) => {
      console.log('reducer', action.payload)
      state.value.token = action.payload.data.token
        state.value.username = action.payload.data.username
        state.value.email = action.payload.data.email
        state.value.avatar = action.payload.data.avatar
        console.log('resultat', state.value)
      },
    logout: (state) => {
      state.value.nickname = '';
      state.value.token = ''
    }
  },
});

export const {logout, userInfo} = usersSlice.actions;
export default usersSlice.reducer;
