import { createSlice } from '@reduxjs/toolkit';

const selectedCitiesSlice = createSlice({
    name: 'selectedCities',
    initialState: {
        selectedCities: []
    },
    reducers: {
        addSelectedCity(state, action) {
            state.selectedCities = [...state.selectedCities, {
                id: action.payload.id,
                name: action.payload.name,
                longitude: action.payload.longitude,
                latitude: action.payload.latitude,
                wikiDataId: action.payload.wikiDataId
            }]
        },

        removeSelectedCity(state, action) {
            state.selectedCities = state.selectedCities.filter(city =>
                city.id !== action.payload.id
            )
        },

        clearSelectedCities(state, action) {
            state.selectedCities = [];
        },

        clearSelectedCities_But1(state, action) {
            if (state.selectedCities.length > 1) {
                state.selectedCities = [state.selectedCities[0]];
            }
        },
    }
})
export const { addSelectedCity, removeSelectedCity, clearSelectedCities, clearSelectedCities_But1 } = selectedCitiesSlice.actions;

export default selectedCitiesSlice.reducer;