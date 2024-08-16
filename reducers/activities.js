import { createSlice } from "@reduxjs/toolkit";

const initialState = {    
    value: [],
};

export const activitiesSlice = createSlice({
    name: 'activities',
    initialState,
    reducers: {     
        //fonction pour ajouter une activité  
        addActivities: (state, action) => { 
            state.value = action.payload;
        },
        //fonction pour quitter une activité
        logoutActivities: (state) => {
            state.value = initialState.value;
        },
    },
})

export const { addActivities, logoutActivities } = activitiesSlice.actions;
export default activitiesSlice.reducer;