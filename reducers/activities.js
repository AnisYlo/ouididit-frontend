import { createSlice } from "@reduxjs/toolkit";

const initialState = {    
    value: []    
};

export const activitiesSlice = createSlice({
    name: 'activities',
    initialState,
    reducers: {       
        addActivities: (state, action) => { 
            state.value = action.payload;
        },
        logoutActivities: (state) => {
            state.value = initialState.value;
        },
    },
})

export const { addActivities, logoutActivities } = activitiesSlice.actions;
export default activitiesSlice.reducer;