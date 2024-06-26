import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useDispatch } from 'react-redux';

import { addCarDetail, addDetail, removeCarsDetail } from "../Store/routeDetailsSlice";

function CarsSelect() {
    const dispatch = useDispatch();
    const [cars, setCars] = useState([]);
    const [isMultiChoice, setMultiChoice] = useState(false);

    useEffect(() => {
        axios.get(`https://diploma-server-1.onrender.com/cars?active=true`).then((res) => {
            setCars(res.data);
        });
    }, []);

    function handleChange(car) {
        if (document.getElementById(car.gosNumber).checked) {
            if (isMultiChoice)
                dispatch(addCarDetail({ key: 'car', value: car }));
            else
                dispatch(addDetail({ key: 'car', value: car }));
        }
        else
            dispatch(removeCarsDetail(car.id));
    }

    return (
        <div className="carSlct deliManage">
            <fieldset>
                <div className="header">
                    Выбор грузовика
                </div>
                <div className="multi">
                    <input type='checkbox' id='multi' onChange={() => setMultiChoice(!isMultiChoice)} />
                    <label htmlFor="multi">Выбор нескольких грузовиков</label>
                </div>
                <div className="cars">
                    {
                        !isMultiChoice ?
                            cars.map(car => (
                                <div key={car.id} className="inputRadio">
                                    <input type="radio" className="carSelect" name='car' id={car.gosNumber} value={`${car.brand} (${car.gosNumber})`} onChange={() => handleChange(car)} />
                                    <label htmlFor={car.gosNumber}>{`${car.brand} (${car.gosNumber})`}</label>
                                </div>
                            ))
                            :
                            cars.map(car => (
                                <div key={car.id} className="inputChkbox">
                                    <input type="checkbox" className="carSelect" name='car' id={car.gosNumber} value={`${car.brand} (${car.gosNumber})`} onChange={(e) => handleChange(car)} />
                                    <label htmlFor={car.gosNumber}>{`${car.brand} (${car.gosNumber})`}</label>
                                </div>
                            ))
                    }
                </div>
            </fieldset>
        </div>
    );
}

export default CarsSelect;