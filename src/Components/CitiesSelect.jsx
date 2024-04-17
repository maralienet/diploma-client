import React, { useState, useEffect } from "react";
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

import { addSelectedCity, removeSelectedCity } from "../Store/selectedCitiesSlice";

import add from '../pics/add.png';
import loading from '../pics/loading.gif';
import AddCity from "./AddCity";

function CitiesSelect() {
    const dispatch = useDispatch();
    const cities = useSelector(state => state.cities.cities);
    const selectedCities = useSelector(state => state.selectedCities.selectedCities);
    const [cityName, setCityName] = useState('');
    const [filteredCities, setFilteredCities] = useState(null);
    const [isAddCity, setAddCity] = useState(null);

    useEffect(() => {
        let checks = Array.from(document.getElementsByClassName('citySelect'));
        checks.forEach((item) => item.checked = false);
        console.log(cities)
    }, []);

    function handleChange(city) {
        if (document.getElementById(city.wikiDataId).checked) {
            dispatch(addSelectedCity(city));
        }
        else {
            dispatch(removeSelectedCity(city));
        }
    }

    useEffect(() => {
        if (cityName !== '') {
            let filter = cities.filter(city => city.name.toLowerCase().startsWith(cityName.toLowerCase()));
            setFilteredCities(filter);
        }
        else
            setFilteredCities(null);
    }, [cityName])

    return (
        <div className="citySlct deliManage">
            <fieldset>
                <div className="header">
                    Населённые пункты
                </div>
                <div className="search">
                    {cities.length > 0 &&
                        <div className="inputDiv">
                            <label>
                                <input type="text" placeholder="Поиск" onChange={(e) => setCityName(e.target.value)} />
                                <span>Поиск</span>
                            </label>
                        </div>}
                </div>
                <div className="cities">
                    {
                        cities.length === 0 && selectedCities.length === 1 &&
                        <div className="loading">
                            <img src={loading} />
                            <span>
                                Поиск...
                            </span>
                        </div>
                    }
                    {
                        !filteredCities ?
                            cities.map((city) => (
                                <div key={city.id} className="inputChkbox">
                                    <input type="checkbox" className="citySelect" name='city' id={city.wikiDataId} onChange={() => handleChange({
                                        id: city.id,
                                        name: city.name,
                                        longitude: city.longitude,
                                        latitude: city.latitude,
                                        wikiDataId: city.wikiDataId
                                    })} />
                                    <label htmlFor={city.wikiDataId}>{city.name}</label>
                                </div>
                            ))
                            :
                            filteredCities.map((city) => (
                                <div key={city.id} className="inputChkbox">
                                    <input type="checkbox" className="citySelect" name='city' id={city.wikiDataId} onChange={() => handleChange({
                                        id: city.id,
                                        name: city.name,
                                        longitude: city.longitude,
                                        latitude: city.latitude,
                                        wikiDataId: city.wikiDataId
                                    })} />
                                    <label htmlFor={city.wikiDataId}>{city.name}</label>
                                </div>
                            ))
                    }
                </div>
                {selectedCities.length >= 1 && cities.length > 0 &&
                    <div className="addCity">
                        <div className="add" onClick={() => setAddCity(true)}>
                            <img src={add} /> Добавить
                        </div>
                        {isAddCity && <AddCity cityName={cityName} close={() => setAddCity(false)} />}
                    </div>
                }
            </fieldset>
        </div>
    );
}

export default CitiesSelect;