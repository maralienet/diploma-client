import React, { useEffect, useState } from "react";
import axios from "axios";
import Collapsible from "react-collapsible";

function PlannedRoutes() {
    let moment = require('moment');
    const [scedule, setScedule] = useState(null);
    const [car, setCar] = useState('');
    const [routeCode, setRouteCode] = useState('');
    const [filteredScedule, setFilteredScedule] = useState(null);

    useEffect(() => {
        axios.get("http://localhost:3001/scedule/planned").then((res) => {
            setScedule(groupCars(res.data));
        });
    }, []);

    function groupCars(cars) {
        let groupedData = cars.reduce((acc, curr) => {
            if (!acc[curr.routeId]) {
                acc[curr.routeId] = { ...curr, car: [curr.car] };
            } else {
                acc[curr.routeId].car.push(curr.car);
            }
            return acc;
        }, {});
        groupedData = Object.values(groupedData);
        return groupedData;
    }

    useEffect(() => {
        if (car !== '' && routeCode === '') {
            let filter = scedule.filter(item => item.car.some(carItem => carItem.toLowerCase().includes(car.toLowerCase())));
            setFilteredScedule(filter);
        }
        else if (car === '' && routeCode !== '') {
            let filter = scedule.filter(item => item.routeId.toLowerCase().startsWith(routeCode.toLowerCase()));
            setFilteredScedule(filter);
        }
        else if (car !== '' && routeCode !== '') {
            let filter = scedule.filter(item => item.car.some(carItem => carItem.toLowerCase().includes(car.toLowerCase())) && item.routeId.toLowerCase().startsWith(routeCode.toLowerCase()));
            setFilteredScedule(filter);
        }
        else
            setFilteredScedule(null);
    }, [car, routeCode]);

    return (
        <div className="activeRoutes">
            <div className="header">
                <h3>Запланированные маршруты</h3>
            </div>
            <div className="body">
                <div className="search">
                    <div className="inputDiv">
                        <label>
                            <input type="text" placeholder="Грузовик" onChange={(e) => setCar(e.target.value)} />
                            <span>Грузовик (по гос. номеру)</span>
                        </label>
                    </div>
                    <div className="inputDiv">
                        <label>
                            <input type="text" placeholder="Код маршрута" onChange={(e) => setRouteCode(e.target.value)} />
                            <span>Код маршрута</span>
                        </label>
                    </div>
                </div>
                <div className="sceduleList">
                    {
                        !filteredScedule ?
                            scedule && scedule.map(item => (
                                <div key={item.id} className="listItem">
                                    <Collapsible trigger={`Маршрут ${item.routeId}`}>
                                        Маршрут: {item.route}<br />
                                        Начало маршрута: {moment(item.dateFrom).format("DD.MM.YYYY")}<br />
                                        {item.dateTo &&
                                            `Конец маршрута: ${moment(item.dateTo).format("DD.MM.YYYY")}`}
                                        {item.dateTo && <br />}
                                        Интервал времени доставки: {item.timeFrom} - {item.timeTo}<br />
                                        Грузовик(и):<br />
                                        {item.car.map(car => (
                                            <>{car}<br /></>
                                        ))}
                                    </Collapsible>
                                </div>
                            ))
                            :
                            filteredScedule.length > 0 ? filteredScedule.map(item => (
                                <div key={item.id} className="listItem">
                                    <Collapsible trigger={`Маршрут ${item.routeId}`}>
                                        Маршрут: {item.route}<br />
                                        Начало маршрута: {moment(item.dateFrom).format("DD.MM.YYYY")}<br />
                                        {item.dateTo &&
                                            `Конец маршрута: ${moment(item.dateTo).format("DD.MM.YYYY")}`}
                                        {item.dateTo && <br />}
                                        Интервал времени доставки: {item.timeFrom} - {item.timeTo}<br />
                                        Грузовик(и):<br />
                                        {item.car.map(car => (
                                            <>{car}<br /></>
                                        ))}
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

export default PlannedRoutes;