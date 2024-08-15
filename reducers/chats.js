import { createSlice } from "@reduxjs/toolkit";

const initialState = {    
    value: [],
};

export const chatsSlice = createSlice({
    name: 'chats',
    initialState,
    reducers: {       
        addChats: (state, action) => { 
            
            // Function to return last message for a chat {message} or null
            const getLastMessage = chat => {          
                const lastMessage = chat.messages.findLast(mess => mess.type === 'Message'); 

                if(lastMessage)  {
                    return lastMessage
                }
                else 
                    return null
            };
            
            // Sort chats by last message date
            const sortedChats = action.payload.sort((a, b) => {
                const lastMessageA = getLastMessage(a);
                const lastMessageB = getLastMessage(b);
                
                // If a chat has no messages, it is placed after those that have messages.
                if (lastMessageA === null) return 1;
                if (lastMessageB === null) return -1;
                
                // If else, compare dates
                const dateA = new Date(lastMessageA.createdAt);
                const dateB = new Date(lastMessageB.createdAt); 
                return dateB - dateA;
            });

            state.value = sortedChats ;
        },

        logoutChats: (state) => {
            state.value = initialState.value;
        },
    },
})

export const { addChats, logoutChats } = chatsSlice.actions;
export default chatsSlice.reducer;