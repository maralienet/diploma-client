import React, { useEffect,useState } from "react";
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

import { draw, clear } from "../Store/drawRouteSlice";
import { clearDetails } from "../Store/routeDetailsSlice";
import { clearSelectedCities, clearSelectedCities_But1 } from "../Store/selectedCitiesSlice";
import { clearCities } from "../Store/citiesSlice";

import ErrorMessage from './ErrorMessage';

function ManageBtns() {
    const dispatch = useDispatch();
    const routeDetails = useSelector(state => state.routeDetails.routeDetails);
    const selectedCities = useSelector(state => state.selectedCities.selectedCities);
    const drawRoute = useSelector(state => state.drawRoute.drawRoute);

    const [error, setError] = useState('');

    function handleDraw() {
        if (routeDetails !== null) {
            if (routeDetails.car && selectedCities.length > 0){
                dispatch(draw());
                setError('');
            }
            else if(!routeDetails.car && selectedCities.length > 0){
                setError('Выберите грузовик для доставки');
            }
            else if(!selectedCities.length > 0 && routeDetails.car){
                setError('Выберите города для доставки');
            }
            else {
                setError('Выберите грузовик и города для доставки');
            }
        }
    }

    function handleClear() {
        dispatch(clearDetails());
        dispatch(clear());
        if (drawRoute.clear) {
            let checks = Array.from(document.getElementsByClassName('carSelect'));
            checks.forEach((item) => item.checked = false);

            if (selectedCities.length > 0) {
                let checks1 = Array.from(document.getElementsByClassName('citySelect'));
                checks1.forEach((item) => item.checked = false);
                if (!drawRoute.draw) {
                    dispatch(clearSelectedCities_But1());
                }
                else {
                    dispatch(clearSelectedCities());
                    dispatch(clearCities());
                }
            }
        }
    }

    return (
        <>
        {error!=='' && <ErrorMessage msg={error} close={() => setError('')}/>}
        <div className="manageBtns">
            <div>
                <button className="drawRoutes" type="button" onClick={() => handleDraw()}>
                    Построить маршрут
                </button>
            </div>
            <div>
                <button className="drawRoutes" type="button" onClick={() => handleClear()}>
                    Сбросить
                </button>
            </div>
        </div>
        </>
    );
}

export default ManageBtns;