import { createSlice } from "@reduxjs/toolkit";

const initialState = {    
    value: [],
};

export const chatsSlice = createSlice({
    name: 'chats',
    initialState,
    reducers: {       
        addChats: (state, action) => { 
            state.value = action.payload;
        },

        logoutChats: (state) => {
            state.value = initialState.value;
        },
    },
})

export const { addChats, logoutChats } = chatsSlice.actions;
export default chatsSlice.reducer;