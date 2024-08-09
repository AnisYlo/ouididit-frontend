import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: { username: '', email: '', token: '', avatar: '', name: '', location: '', date: ''  },
};

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    userInfo: (state, action) => {
        state.value.token = action.payload.token
        state.value.username = action.payload.username
        state.value.email = action.payload.email
        state.value.avatar = action.payload.avatar
      },
    logout: (state) => {
      state.value.nickname = '';
      state.value.token = ''
    },
  //   activity: (state, action) => { 
  //     state.value.location = action.payload.location
  //     state.value.name = action.payload.location
  //     state.value.date = action. payload.date
  //   }
  },
});

export const {logout, userInfo, } = usersSlice.actions;
export default usersSlice.reducer;
