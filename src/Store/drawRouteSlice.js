import { createSlice } from '@reduxjs/toolkit';

const drawRouteSlice = createSlice({
    name: 'drawRoute',
    initialState: {
        drawRoute: {
            draw: false,
            clear: false
        }
    },
    reducers: {
        draw(state, action) {
            state.drawRoute.draw = true;
            state.drawRoute.clear = false;
        },

        clear(state, action) {
            state.drawRoute.draw = false;
            state.drawRoute.clear = true;
        },

        
    }
})
export const { draw, clear,  } = drawRouteSlice.actions;

export default drawRouteSlice.reducer;