import React, {useState, useEffect} from "react";
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

import { addDetail } from "../Store/routeDetailsSlice";

function CarsSelect() {
    const dispatch = useDispatch();
    const [cars, setCars] = useState([]);
    useEffect(() => {
        axios.get(`http://localhost:3001/cars`).then((res) => {
            setCars(res.data);
        });
    }, []);

    function HandleChange(car) {
        dispatch(addDetail({ key: 'car', value: car }));
    }

    return (
        <div className="carSlct deliManage">
            <fieldset>
                <div className="header">
                    Выбор грузовика
                </div>
                {
                    cars.map(car => (
                        <div key={car.id} className="inputRadio">
                            <input type="radio" className="carSelect" name='car' id={car.gosNumber} value={`${car.brand} (${car.gosNumber})`} onClick={(e) => HandleChange(e.target.value)} />
                            <label for={car.gosNumber}>{`${car.brand} (${car.gosNumber})`}</label>
                        </div>
                    ))
                }
            </fieldset>
        </div>
    );
}

export default CarsSelect;