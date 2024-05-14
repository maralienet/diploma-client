import { configureStore } from '@reduxjs/toolkit';

import citiesReducer from './citiesSlice'
import selectedCitiesReducer from './selectedCitiesSlice';
import drawRouteReducer from './drawRouteSlice';
import routeDetailsReducer from './routeDetailsSlice';
import sceduleReducer from './sceduleSlice';

export default configureStore({
    reducer: {
        cities: citiesReducer,
        selectedCities: selectedCitiesReducer,
        drawRoute: drawRouteReducer,
        routeDetails: routeDetailsReducer,
        scedule: sceduleReducer,
    }
})