import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import ErrorMessage from "./ErrorMessage";

import { addDetail } from "../Store/routeDetailsSlice";
import { removeCarsDetail } from '../Store/routeDetailsSlice';


function WeightSelect() {
    const dispatch = useDispatch();
    const cars = useSelector(state => state.routeDetails.routeDetails.car);
    const [weight, setWeight] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        handleChange();
    }, [weight, cars]);

    function handleChange() {
        if (weight.length > 0 && cars) {
            cars.forEach(car => {
                if (car.capacity < weight) {
                    setError(`Грузоподъёмность машины ${car.brand} (${car.gosNumber}) не рассчитана на вес выше ${car.capacity} кг`);
                    dispatch(removeCarsDetail(car.id));
                    document.getElementById(car.gosNumber).checked = false;
                }
            });
        }
        dispatch(addDetail({ key: 'weight', value: weight }));
    }

    return (
        <div className="weightSlct deliManage">
            {error && <ErrorMessage msg={error} close={() => setError('')} />}
            <fieldset>
                <div className="header">
                    Ввод веса груза
                </div>
                <div className="search">
                    <div className="inputDiv">
                        <label>
                            <input type="number" min={1} placeholder="Вес груза (в кг)" onChange={(e) => setWeight(e.target.value)} />
                            <span>Вес груза (в кг)</span>
                        </label>
                    </div>
                </div>
            </fieldset>
        </div>
    );
}

export default WeightSelect;