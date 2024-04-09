import { createSlice } from '@reduxjs/toolkit';

const routeDetailsSlice = createSlice({
    name: 'routeDetails',
    initialState: {
        routeDetails: {}
    },
    reducers: {
        addDetail(state, action) {
            if (action.payload.key === 'car')
                state.routeDetails[action.payload.key] = [action.payload.value];
            else
                state.routeDetails[action.payload.key] = action.payload.value;
        },
        addCarDetail(state, action) {
            if (!state.routeDetails[action.payload.key])
                state.routeDetails[action.payload.key] = [action.payload.value];
            else
                state.routeDetails[action.payload.key] = [...state.routeDetails[action.payload.key], action.payload.value];
        },

        removeDetail(state, action) {
            delete state.routeDetails[action.payload.key];
        },

        removeCarsDetail(state, action) {
            state.routeDetails['car'] = state.routeDetails['car'].filter(car =>
                car !== action.payload
            )
        },

        clearDetails(state) {
            state.routeDetails = {};
        }
    }
})

export const { addDetail, addCarDetail, removeDetail, removeCarsDetail, clearDetails } = routeDetailsSlice.actions;

export default routeDetailsSlice.reducer;
