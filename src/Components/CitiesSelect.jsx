import React, { useState, useEffect } from "react";
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

import { addSelectedCity, removeSelectedCity } from "../Store/selectedCitiesSlice";

function CitiesSelect() {
    const dispatch = useDispatch();
    const cities = useSelector(state => state.cities.cities);
    const [cityName, setCityName] = useState('');
    const [filteredCities, setFilteredCities] = useState(null);

    useEffect(() => {
        let checks = Array.from(document.getElementsByClassName('citySelect'));
        checks.forEach((item) => item.checked = false)
    });

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
                <div className="header" onClick={() => console.log(cities)}>
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
                {filteredCities && filteredCities.length === 0 &&
                    <div className="addCity">
                        <div>Ничего не найдено</div>
                        <div></div>
                    </div>
                }
            </fieldset>
        </div>
    );
}

export default CitiesSelect;