import axios from "axios";
import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import ErrorMessage from './ErrorMessage';

import { addSelectedCity } from "../Store/selectedCitiesSlice";


function AddCity({ close, cityName }) {
    const dispatch = useDispatch();
    const [citiesList, setCitiesList] = useState([]);
    const [city, setCity] = useState(cityName);
    const [region, setRegion] = useState('');
    const [district, setDistrict] = useState('');
    const [result, setResult] = useState('');
    const [selected, setSelected] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        axios.get("http://localhost:3001/cities").then((res) => {
            setCitiesList(res.data);
        });
    });

    useEffect(() => {
        //only city
        if (city !== '' && district === '' && region === '') {
            let filter = citiesList.filter(_city => _city.name.toLowerCase().startsWith(city.toLowerCase()));
            setResult(filter);
        }
        //only region
        else if (region !== '' && city === '' && district === '') {
            let filter = citiesList.filter(_city => _city.region.toLowerCase().startsWith(region.toLowerCase()));
            setResult(filter);
        }
        //only dist
        else if (district !== '' && city === '' && region === '') {
            let filter = citiesList.filter(_city => _city.district.toLowerCase().startsWith(district.toLowerCase()));
            setResult(filter);
        }
        //city + dist
        else if (district !== '' && city !== '' && region === '') {
            let filter = citiesList.filter(_city => _city.district.toLowerCase().startsWith(district.toLowerCase()) && _city.name.toLowerCase().startsWith(city.toLowerCase()));
            setResult(filter);
        }
        //city + region
        else if (district === '' && city !== '' && region !== '') {
            let filter = citiesList.filter(_city => _city.region.toLowerCase().startsWith(region.toLowerCase()) && _city.name.toLowerCase().startsWith(city.toLowerCase()));
            setResult(filter);
        }
        //dist + region
        else if (district !== '' && city === '' && region !== '') {
            let filter = citiesList.filter(_city => _city.region.toLowerCase().startsWith(region.toLowerCase()) && _city.district.toLowerCase().startsWith(district.toLowerCase()));
            setResult(filter);
        }
        //all in
        else if (district !== '' && city !== '' && region !== '') {
            let filter = citiesList.filter(_city => _city.name.toLowerCase().startsWith(city.toLowerCase()) && _city.region.toLowerCase().startsWith(region.toLowerCase()) && _city.district.toLowerCase().startsWith(district.toLowerCase()));
            setResult(filter);
        }
        else
            setResult(null);
    }, [city, region, district]);

    function handleSubmit() {
        if (selected) {
            dispatch(addSelectedCity({
                id: selected.id,
                name: selected.name,
                longitude: selected.longitude,
                latitude: selected.latitude,
                wikiDataId: selected.wikiDataId
            }));
        }
        else {
            setError('Выберите город');
        }
    }


    return (
        <div className="overlay">
            <div className="addCityWin">
                <div className="close" onClick={close}>
                    <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 1L16 16" stroke="#9E9E9E" strokeWidth="2"></path>
                        <path d="M1 16L16 1" stroke="#9E9E9E" strokeWidth="2"></path>
                    </svg>
                </div>
                <h3>Добавление города</h3>
                <form>
                    <div className="inputDiv">
                        <label>
                            <input type="text" placeholder="Название" defaultValue={cityName} onChange={(e) => setCity(e.target.value)} />
                            <span>Название</span>
                        </label>
                    </div>
                    <div className="inputDiv">
                        <label>
                            <input type="text" placeholder="Область" onChange={(e) => setRegion(e.target.value)} />
                            <span>Область</span>
                        </label>
                    </div>
                    <div className="inputDiv">
                        <label>
                            <input type="text" placeholder="Район" onChange={(e) => setDistrict(e.target.value)} />
                            <span>Район</span>
                        </label>
                    </div>
                </form>
                <div className="results">
                    <div>Результаты поиска:</div>
                    <div className="resList">
                        {result &&
                            result.map(res => (
                                <div key={res.id} className={res.name === selected.name && res.region === selected.region && res.district === selected.district ? 'active' : ''} onClick={() => setSelected(res)}>
                                    {res.name}, {res.region}, {res.district}
                                </div>
                            ))
                        }
                    </div>
                </div>
                <div className="OKBtn">
                    <button onClick={() => handleSubmit()}>Добавить</button>
                </div>
            </div>
            {error && <ErrorMessage msg={error} close={() => setError('')} />}
        </div >
    );
}

export default AddCity;