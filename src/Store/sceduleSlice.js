import { createSlice } from '@reduxjs/toolkit';

const sceduleSlice = createSlice({
    name: 'scedule',
    initialState: {
        scedule: {
            carId: null,
            isMulti: null,
            dateFrom: null,
            dateTo: null,
            timeFrom: null,
            timeTo: null,
            createdAt: null
        }
    },
    reducers: {
        setCar(state, action) {
            state.scedule.carId = action.payload.carId;
        },
        setIsMulti(state, action) {
            state.scedule.isMulti = action.payload.isMulti;
        },
        setDateFrom(state, action) {
            state.scedule.dateFrom = action.payload.dateFrom;
        },
        setDateTo(state, action) {
            state.scedule.dateTo = action.payload.dateTo;
        },
        setTimeFrom(state, action) {
            state.scedule.timeFrom = action.payload.timeFrom;
        },
        setTimeTo(state, action) {
            state.scedule.timeTo = action.payload.timeTo;
        },
        setCreatedAt(state, action) {
            state.scedule.createdAt = action.payload.createdAt;
        },
        clearScedule(state, action) {
            state.scedule = {};
        }
    }
});
export const { setCar, setIsMulti, setDateFrom, setDateTo, setTimeFrom, setTimeTo, setCreatedAt } = sceduleSlice.actions

export default sceduleSlice.reducer;