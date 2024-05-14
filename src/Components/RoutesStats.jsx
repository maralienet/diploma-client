import React, { useEffect, useState } from "react";
import axios from "axios";
import Collapsible from 'react-collapsible';

function RoutesStats() {
    const [number, setNumber] = useState('');
    const [routesList, setRoutesList] = useState([]);
    const [filterdRoutesList, setFilterdRoutesList] = useState([]);
    const [carsList, setCarsList] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:3001/cars").then((res) => {
            setCarsList(res.data);
        });
        axios.get("http://localhost:3001/routings/byroute").then((res) => {
            setRoutesList(res.data);
        });
    }, []);

    useEffect(() => {
        if (number !== '') {
            let filter = routesList.filter(route => route.routeId.toLowerCase().startsWith(number.toLowerCase()));
            filter = setFilterdRoutesList(filter);
        }
        else
            setFilterdRoutesList(null);
    }, [number]);

    return (
        <div className="routeStats">
            <div className="header">
                <h3>Статистика по маршрутам</h3>
            </div>
            <div className="body">
                <div className="search">
                    <div className="inputDiv">
                        <label>
                            <input type="text" placeholder="Код маршрута" onChange={(e) => setNumber(e.target.value)} />
                            <span>Код маршрута</span>
                        </label>
                    </div>
                </div>
                <div className="routesList">
                    {
                        !filterdRoutesList ?
                            routesList && routesList.map(route => (
                                <div key={route.id} className="listItem">
                                    <Collapsible trigger={`Маршрут ${route.routeId}`}>
                                        <div>
                                            Грузовик(и):{
                                                carsList.filter(car => route.cars.includes(car.id)).map(car => (
                                                    <>
                                                        <br />{car.brand} ({car.gosNumber})
                                                    </>
                                                ))
                                            }
                                            <br />
                                            Маршрут: {route.route}<br />
                                            Расстояние: {route.length} км<br />
                                            Продолжительность: {route.duration}<br />
                                            Вес груза: {route.weight} кг<br />
                                        </div>
                                    </Collapsible>
                                </div>
                            ))
                            :
                            filterdRoutesList.length > 0 ? filterdRoutesList.map(route => (
                                <div key={route.id} className="listItem">
                                    <Collapsible trigger={`Маршрут ${route.routeId}`}>
                                        <div>
                                            Грузовик(и):{
                                                carsList.filter(car => route.cars.includes(car.id)).map(car => (
                                                    <>
                                                        <br />{car.brand} ({car.gosNumber})
                                                    </>
                                                ))
                                            }
                                            <br />
                                            Маршрут: {route.route}<br />
                                            Расстояние: {route.length} км<br />
                                            Продолжительность: {route.duration}<br />
                                            Вес груза: {route.weight} кг<br />
                                        </div>
                                    </Collapsible>
                                </div>
                            ))
                                : <div className="nthFound">Ничего не найдено</div>
                    }
                </div>
            </div>
        </div>
    );
}

export default RoutesStats;