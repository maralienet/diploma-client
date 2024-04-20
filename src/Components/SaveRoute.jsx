import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import ErrorMessage from "./ErrorMessage";

function SaveRoute() {
    const routeDetails = useSelector(state => state.routeDetails.routeDetails);
    const selectedCities = useSelector(state => state.selectedCities.selectedCities);
    const drawRoute = useSelector(state => state.drawRoute.drawRoute);
    const [isUnique, setUnique] = useState(true);
    const [codes, setCodes] = useState([]);
    const [saved, setSaved] = useState(false);

    useEffect(() => {
        axios.get('http://localhost:3001/routings/codes').then((res) => {
            setCodes(res.data);
        })
    });

    function handleSave() {
        let cars = routeDetails.car;
        let route = [...selectedCities];
        route.push(route[0]);
        let length = routeDetails.length.replace(/\s|км|м/gi, '');
        let duration = routeDetails.duration;
        let cities = route.map((item, index) => `${++index}. ${item.name}`).join(' ');

        if (cars && route.length && length && duration) {
            const code = generateCode();
            cars.forEach(car => {
                axios.post('http://localhost:3001/routings', {
                    routeId: code,
                    carId: car.id,
                    route: cities,
                    length: length,
                    duration: duration
                }).
                    then(function (res) {
                        console.log(res);
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
                return generateCode(); // Рекурсивный вызов с оператором return
            }
        }
        return cod;
    }

    return (
        <>
            <div className="saveRoute">
                <button className={!drawRoute.draw ? "invisible" : ''} disabled={!isUnique ? 'disabled' : ''} type='button' onClick={() => handleSave()}>Сохранить маршрут</button>
            </div>
            {saved && <ErrorMessage msg='Маршрут сохранён успешно' close={() => setSaved(false)} />}
        </>
    );
}

export default SaveRoute;