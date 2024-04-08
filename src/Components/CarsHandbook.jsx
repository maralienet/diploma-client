import React, { useEffect, useState } from "react";
import axios from "axios";
import Collapsible from 'react-collapsible';

function CarsHandbook() {
    const [brand, setBrand] = useState('');
    const [gosNumber, setGosNumber] = useState('');
    const [carsList, setCarsList] = useState(null);
    const [filteredCars, setFilteredCars] = useState(null);

    useEffect(() => {
        axios.get("http://localhost:3001/cars").then((res) => {
            const carsByBrand = res.data.reduce((acc, car) => {
                if (!acc[car.brand]) {
                    acc[car.brand] = [];
                }
                acc[car.brand].push(car);
                return acc;
            }, {});
            setCarsList(carsByBrand);
        });
    }, []);

    useEffect(() => {
        if (brand !== '' && gosNumber === '')
        {
            let filter = carsList.filter(car => car.brand === brand);
            setFilteredCars(filter);
        }
        else if (gosNumber !== '' && brand === '')
            setFilteredCars(carsList.filter(car => car.gosNumber === gosNumber))
        else if (gosNumber !== '' && brand !== '')
            setFilteredCars(carsList.filter(car => car.gosNumber === gosNumber && car.brand === brand))
    }, [brand, gosNumber])

    return (
        <div className="carsHandbook">
            <div className="header">
                <h3>Справочник автомобилей</h3>
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
                    <div className="submit">
                        <button type="submit">Найти</button>
                    </div>
                </div>
                <div className="carsList">
                    {
                        carsList && Object.entries(carsList).map(([brand, cars], index) => (
                            <div key={index} className="listItem">
                                <Collapsible trigger={brand}>
                                    {
                                        cars.map((car, index) => (
                                            <div key={car.id}>
                                                <span className="numeration">Машина №{index + 1}</span><br />
                                                Марка: {car.brand}<br />
                                                Гос. номер: {car.gosNumber}<br />
                                                Грузоподъёмность: {car.capacity > 1000 ? `${car.capacity / 1000}т` : `${car.capacity}кг`}
                                            </div>
                                        ))
                                    }
                                </Collapsible>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    );
}

export default CarsHandbook;