import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    
    value: []
    
};
export const activitiesSlice = createSlice({
   
    name: 'activities',
    initialState,
    reducers: {
       
        addActivities: (state, action) => { 
            state.value.push(action.payload)
          },
          
    },
})

export const { addActivities } = activitiesSlice.actions;
export default activitiesSlice.reducer;