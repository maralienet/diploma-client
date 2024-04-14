import React, { useEffect, useState } from "react";
import axios from "axios";
import Collapsible from 'react-collapsible';

function CarsStats() {
    const [brand, setBrand] = useState('');
    const [gosNumber, setGosNumber] = useState('');
    const [filteredCars, setFilteredCars] = useState(null);
    const [carsList, setCarsList] = useState(null);
    const [routesList, setRoutesList] = useState(null);
    const [carRoutesInfo, setCarRoutesInfo] = useState(null);

    useEffect(() => {
        axios.get("http://localhost:3001/cars").then((res) => {
            setCarsList(res.data);
        });
        axios.get("http://localhost:3001/routings").then((res) => {
            setRoutesList(res.data);
        });
    }, []);

    useEffect(() => {
        if (brand !== '' && gosNumber === '') {
            let filter = carsList.filter(car => car.brand.toLowerCase().startsWith(brand.toLowerCase()));
            filter = setFilteredCars(filter);
        }
        else if (gosNumber !== '' && brand === '') {
            let filter = carsList.filter(car => car.gosNumber.toLowerCase().startsWith(gosNumber.toLowerCase()));
            filter = setFilteredCars(filter);
        }
        else if (gosNumber !== '' && brand !== '') {
            let filter = carsList.filter(car => car.gosNumber.toLowerCase().startsWith(gosNumber.toLowerCase()) && car.brand.toLowerCase().startsWith(brand.toLowerCase()));
            filter = setFilteredCars(filter);
        }
        else
            setFilteredCars(null);
    }, [brand, gosNumber])

    function handleClick(id) {
        axios.get(`http://localhost:3001/routings/bycar/${id}`).then((res) => {
            setCarRoutesInfo(res.data[0]);
        });
    }

    return (
        <div className="carsStats">
            <div className="header">
                <h3>Статистика по машинам</h3>
            </div>
            <div className="body">
                <div className="search">
                    <div className="inputDiv">
                        <label>
                            <input type="text" placeholder="Марка" onChange={(e) => setBrand(e.target.value)} />
                            <span>Марка</span>
                        </label>
                    </div>
                    <div className="inputDiv">
                        <label>
                            <input type="text" placeholder="Гос. номер" onChange={(e) => setGosNumber(e.target.value)} />
                            <span>Гос. номер</span>
                        </label>
                    </div>
                </div>
                <div className="carsList">
                    {
                        !filteredCars ?
                            carsList && carsList.map(car => (
                                <div key={car.id} className="listItem" onClick={() => handleClick(car.id)}>
                                    <Collapsible trigger={`${car.brand} (${car.gosNumber})`}>
                                        <div className="info">
                                            <span>Маршрутов проехано: {carRoutesInfo ? carRoutesInfo.routesCount : 0}</span>
                                            <span>Километров проехано: {carRoutesInfo ? carRoutesInfo.totalLength : 0}</span>
                                        </div>
                                        <div key={car.id}>
                                            {
                                                routesList && routesList.map(route => (route.carId === car.id &&
                                                    <Collapsible key={route.id} trigger={`Маршрут ${route.routeId}`}>
                                                        Маршрут: {route.route}<br />
                                                        Расстояние: {route.length} км<br />
                                                        Длительность: {route.duration}<br />
                                                    </Collapsible>
                                                ))
                                            }
                                        </div>
                                    </Collapsible>
                                </div>
                            ))

                            :
                            filteredCars && filteredCars.map(car => (
                                <div key={car.id} className="listItem" onClick={() => handleClick(car.id)}>
                                    <Collapsible trigger={`${car.brand} (${car.gosNumber})`}>
                                        <div className="info">
                                            <span>Маршрутов проехано: {carRoutesInfo ? carRoutesInfo.routesCount : 0}</span>
                                            <span>Километров проехано: {carRoutesInfo ? carRoutesInfo.totalLength : 0}</span>
                                        </div>
                                        <div key={car.id}>
                                            {
                                                routesList && routesList.map(route => (route.carId === car.id &&
                                                    <Collapsible key={route.id} trigger={`Маршрут ${route.routeId}`}>
                                                        Маршрут: {route.route}<br />
                                                        Расстояние: {route.length} км<br />
                                                        Длительность: {route.duration}<br />
                                                    </Collapsible>
                                                ))
                                            }
                                        </div>
                                    </Collapsible>
                                </div>
                            ))
                    }
                </div>
            </div >
        </div >
    );
}
export default CarsStats;