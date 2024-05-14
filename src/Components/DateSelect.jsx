import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import axios from "axios";

import { setIsMulti, setDateFrom, setDateTo, setTimeFrom } from "../Store/sceduleSlice";
import ErrorMessage from "./ErrorMessage";
import { removeCarsDetail } from '../Store/routeDetailsSlice';

function DateSelect() {
    const dispatch = useDispatch();
    const moment = require('moment');
    const today = moment().format('YYYY-MM-DD');
    const cars = useSelector(state => state.routeDetails.routeDetails.car);
    const [allCars, setAllCars] = useState([]);
    const [scedActive, setScedActive] = useState([]);
    const [scedPlan, setScedPlan] = useState([]);
    const [isMulti, setMulti] = useState(false);
    const [dateFrom, _setDateFrom] = useState();
    const [dateTo, _setDateTo] = useState();
    const [timeFrom, _setTimeFrom] = useState();
    const [error, setError] = useState('');

    useEffect(() => {
        axios.get('http://localhost:3001/scedule/active').then((res) => setScedActive(res.data))
        axios.get('http://localhost:3001/scedule/planned').then((res) => setScedPlan(res.data))
        axios.get('http://localhost:3001/cars').then((res) => setAllCars(res.data))
    }, []);

    useEffect(() => {
        if (dateFrom === today)
            isOccupiedNow();
        else
            isOccupiedThen();
    }, [dateFrom, dateTo, timeFrom, cars]);

    function isOccupiedNow() {
        let carsIds = [];
        if (cars) carsIds = cars.map(car => car.id);
        scedActive.forEach(item => {
            if (carsIds.includes(item.carId)) {
                setError(`На выбранную дату грузовик ${item.car} занят`);
                dispatch(removeCarsDetail(item.carId))
                let car = allCars.filter(car => car.id === item.carId)[0];
                document.getElementById(car.gosNumber).checked = false;
            }
        });
    }
    function isOccupiedThen() {
        let carsIds = [];
        if (cars) carsIds = cars.map(car => car.id);
        let sced = scedPlan.filter(item => moment(item.dateFrom).isSame(dateFrom));
        sced.forEach(item => {
            if (carsIds.includes(item.carId)) {
                setError(`На выбранную дату грузовик ${item.car} занят`);
                dispatch(removeCarsDetail(item.carId))
                let car = allCars.filter(car => car.id === item.carId)[0];
                document.getElementById(car.gosNumber).checked = false;
            }
        });
    }

    function handleSetMulti(isMulti) {
        setMulti(isMulti);
        dispatch(setIsMulti(isMulti));
    }

    function handleSetDateFrom(date) {
        _setDateFrom(date);
        dispatch(setDateFrom(date));
    }

    function handleDateTo(date) {
        _setDateTo(date);
        dispatch(setDateTo(date));
    }

    function handleTimeFrom(time) {
        _setTimeFrom(time);
        dispatch(setTimeFrom(time));
    }

    return (
        <div className="deliManage dateSelect">
            {error && <ErrorMessage msg={error} close={() => setError('')} />}
            <fieldset>
                <div className="header">
                    Выбор даты доставки
                </div>
                <div className="multi">
                    <input type='checkbox' id='multiD' onChange={(e) => handleSetMulti(e.target.checked)} />
                    <label htmlFor="multiD">Многодневная доставка</label>
                </div>
                <div className="inputs">
                    <div className="date">
                        <div className="dateInput">
                            <label htmlFor='dateFrom'>Стартовая дата</label>
                            <input type="date" min={today} name='dateFrom' id='dateFrom' onChange={(e) => handleSetDateFrom(e.target.value)} />
                        </div>
                        {isMulti &&
                            <div className="dateInput dateTo">
                                <label htmlFor='dateTo'>Конечная дата</label>
                                <input type="date" min={moment(dateFrom).add(1, 'd').format('YYYY-MM-DD')} name='dateTo' id='dateTo' onChange={(e) => handleDateTo(e.target.value)} />
                            </div>
                        }
                    </div>
                    <div className="time">
                        <div className="dateInput">
                            <label htmlFor='timeFrom'>Время начала</label>
                            <input type="time" name='timeFrom' id='timeFrom' onChange={(e) => handleTimeFrom(e.target.value)} />
                        </div>
                    </div>
                </div>
            </fieldset>
        </div>
    );
}

export default DateSelect;