import React, { useEffect, useState } from "react";
import axios from "axios";
import Collapsible from 'react-collapsible';

function RoutesStats() {
    const [number, setNumber] = useState(null);
    const [routesList, setRoutesList] = useState(null);
    const [filterdRoutesList, setFilterdRoutesList] = useState(null);
    const [carsList, setCarsList] = useState(null);

    useEffect(() => {
        axios.get("http://localhost:3001/cars").then((res) => {
            setCarsList(res.data);
        });
        axios.get("http://localhost:3001/routings/byroute").then((res) => {
            setRoutesList(res.data);
        });
    }, []);

    useEffect(() => {
        if (number) {
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
                            <input type="text" placeholder="Номер" onChange={(e) => setNumber(e.target.value)} />
                            <span>Номер</span>
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
                                        </div>
                                    </Collapsible>
                                </div>
                            ))
                            :
                            filterdRoutesList && filterdRoutesList.map(route => (
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
                                        </div>
                                    </Collapsible>
                                </div>
                            ))
                    }
                </div>
            </div>
        </div>
    );
}

export default RoutesStats;