import { createSlice } from '@reduxjs/toolkit';

const sceduleSlice = createSlice({
    name: 'scedule',
    initialState: {
        scedule: {
            isMulti: false,
            dateFrom: null,
            dateTo: null,
            timeFrom: null,
        }
    },
    reducers: {
        setIsMulti(state, action) {
            state.scedule.isMulti = action.payload;
        },
        setDateFrom(state, action) {
            state.scedule.dateFrom = action.payload;
        },
        setDateTo(state, action) {
            state.scedule.dateTo = action.payload;
        },
        setTimeFrom(state, action) {
            state.scedule.timeFrom = action.payload;
        },
        clearScedule(state, action) {
            state.scedule = {};
        }
    }
});
export const { setIsMulti, setDateFrom, setDateTo, setTimeFrom } = sceduleSlice.actions

export default sceduleSlice.reducer;