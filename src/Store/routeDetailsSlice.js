import { createSlice } from '@reduxjs/toolkit';

const routeDetailsSlice = createSlice({
    name: 'routeDetails',
    initialState: {
        routeDetails: {}
    },
    reducers: {
        addDetail(state, action) {
            if (action.payload.key === 'car')
                state.routeDetails.car = [{
                    id: action.payload.value.id,
                    gosNumber: action.payload.value.gosNumber,
                    brand: action.payload.value.brand,
                    capacity: action.payload.value.capacity
                }]
            else
                state.routeDetails[action.payload.key] = action.payload.value;
        },
        addCarDetail(state, action) {
            if (!state.routeDetails.car) {
                state.routeDetails.car = [];
            }
            state.routeDetails.car = [...state.routeDetails.car, {
                id: action.payload.value.id,
                gosNumber: action.payload.value.gosNumber,
                brand: action.payload.value.brand,
                capacity: action.payload.value.capacity
            }]
        },

        removeDetail(state, action) {
            delete state.routeDetails[action.payload.key];
        },

        removeCarsDetail(state, action) {
            state.routeDetails.car.id = state.routeDetails.car.filter(car =>
                car.id !== action.payload.id
            )
        },

        clearDetails(state) {
            state.routeDetails = {};
        }
    }
})

export const { addDetail, addCarDetail, removeDetail, removeCarsDetail, clearDetails } = routeDetailsSlice.actions;

export default routeDetailsSlice.reducer;
