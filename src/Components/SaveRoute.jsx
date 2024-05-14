import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import ErrorMessage from "./ErrorMessage";
import useCookie from "./useCookie";

function SaveRoute() {
    const id = useCookie('userid');
    const routeDetails = useSelector(state => state.routeDetails.routeDetails);
    const selectedCities = useSelector(state => state.selectedCities.selectedCities);
    const drawRoute = useSelector(state => state.drawRoute.drawRoute);
    const scedule = useSelector(state => state.scedule.scedule);
    const [isUnique, setUnique] = useState(true);
    const [codes, setCodes] = useState([]);
    const [code, setCode] = useState(null);
    const [saved, setSaved] = useState(false);
    const moment = require('moment');

    useEffect(() => {
        axios.get('http://localhost:3001/routings/codes').then((res) => {
            setCodes(res.data);
        })
    }, []);

    function handleSave() {
        let cars = routeDetails.car;
        let route = [...selectedCities];
        route.push(route[0]);
        let length = routeDetails.length.replace(/\s|км|м/gi, '');
        let duration = routeDetails.duration;
        let weight = routeDetails.weight;
        let cities = route.map((item, index) => `${++index}. ${item.name}`).join(' ');
        let time = duration.replaceAll(' ', '');
        let hours = parseInt(time.substr(0, time.indexOf('ч')));
        let minutes = parseInt(time.substr(time.indexOf('ч') + 1, time.indexOf("мин") - 2));
        let totalMinutes = hours * 60 + minutes;
        let timeTo = moment(scedule.timeFrom, "HH:mm").add(totalMinutes, 'minutes').format('HH:mm');
        if (id && cars && route.length && length && duration && timeTo) {
            const code = generateCode();
            setCode(code);
            cars.forEach(car => {
                axios.post('http://localhost:3001/routings', {
                    routeId: code,
                    carId: car.id,
                    route: cities,
                    length: length,
                    duration: duration,
                    weight: weight,
                    userId: id
                }).
                    then(function (res) {
                        axios.get(`http://localhost:3001/routings/lastRouteByCar/${car.id}`).then((res) => {
                            let routeId = res.data;
                            axios.post('http://localhost:3001/scedule', {
                                carId: car.id,
                                isMulti: scedule.isMulti,
                                dateFrom: scedule.dateFrom,
                                dateTo: scedule.dateTo,
                                timeFrom: scedule.timeFrom,
                                timeTo: timeTo,
                                routeId: routeId
                            })
                        })
                        setSaved(true);
                        setUnique(false);
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            })
        }
    }

    function generateCode() {
        // Генерация четырех случайных чисел
        let numbers = '';
        for (let i = 0; i < 4; i++) {
            numbers += Math.floor(Math.random() * 10);
        }
        // Генерация двух случайных букв
        let letters = '';
        for (let i = 0; i < 2; i++) {
            letters += String.fromCharCode(Math.floor(Math.random() * 26) + 65);
        }
        // Возвращение сгенерированного шифра
        let cod = numbers + letters;
        for (let i = 0; i < codes.length; i++) {
            if (codes[i] === cod) {
                return generateCode();
            }
        }
        return cod;
    }

    return (
        <>
            <div className="saveRoute">
                <button className={!drawRoute.draw ? "invisible" : ''} disabled={!isUnique ? 'disabled' : ''} type='button' onClick={() => handleSave()}>Сохранить маршрут</button>
            </div>
            {saved && <ErrorMessage msg={`Маршрут сохранён успешно под номером ${code}`} close={() => setSaved(false)} />}
        </>
    );
}

export default SaveRoute;