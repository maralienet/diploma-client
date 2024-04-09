import React, { useEffect, useState } from "react";
import axios from "axios";
import Collapsible from 'react-collapsible';

function CitiesHandbook() {
    const [name, setName] = useState('');
    const [district, setDistrict] = useState('');
    const [filteredCities, setFilteredCities] = useState(null);
    const [citiesList, setCitiesList] = useState(null);
    const [groupedByDistrictCitiesList, setGroupedByDistrictCitiesList] = useState(null);
    const [groupedByRegionCitiesList, setGroupedByRegionCitiesList] = useState(null);

    useEffect(() => {
        axios.get("http://localhost:3001/cities").then((res) => {
            setCitiesList(res.data);
            setGroupedByRegionCitiesList(groupByRegion(res.data));
        });
    }, []);

    function groupByRegion(cities) {
        const byRegion = cities.reduce((acc, city) => {
            if (!acc[city.region]) {
                acc[city.region] = [];
            }
            acc[city.region].push(city);
            return acc;
        }, {});
        for (let region in byRegion) {
            byRegion[region].sort((a, b) => a.name.localeCompare(b.name));
        }
        return byRegion;
    }

    function groupByDistrict(cities) {
        const byDistrict = cities.reduce((acc, city) => {
            if (!acc[city.district]) {
                acc[city.district] = [];
            }
            acc[city.district].push(city);
            return acc;
        }, {});
        for (let district in byDistrict) {
            byDistrict[district].sort((a, b) => a.name.localeCompare(b.name));
        }
        return byDistrict;
    }

    useEffect(() => {
        if (name !== '' && district === '') {
            let filter = citiesList.filter(city => city.name.toLowerCase().startsWith(name.toLowerCase()));
            filter = groupByRegion(filter);
            setFilteredCities(filter);
        }
        else if (district !== '' && name === '') {
            let filter = citiesList.filter(city => city.district.toLowerCase().startsWith(district.toLowerCase()));
            filter = groupByRegion(filter);
            setFilteredCities(filter);
        }
        else if (district !== '' && name !== '') {
            let filter = citiesList.filter(city => city.district.toLowerCase().startsWith(district.toLowerCase()) && city.name.toLowerCase().startsWith(name.toLowerCase()));
            filter = groupByRegion(filter);
            setFilteredCities(filter);
        }
        else
            setFilteredCities(null);
    }, [name,district])

    return (
        <div className="citiesHandbook">
            <div className="header">
                <h3>Справочник населённых пунктов</h3>
            </div>
            <div className="body">
                <div className="search">
                    <div className="inputDiv">
                        <label>
                            <input type="text" placeholder="Название" onChange={(e) => setName(e.target.value)} />
                            <span>Название</span>
                        </label>
                    </div>
                    <div className="inputDiv">
                        <label>
                            <input type="text" placeholder="Район" onChange={(e) => setDistrict(e.target.value)} />
                            <span>Район</span>
                        </label>
                    </div>
                </div>
                <div className="citiesList">
                    {
                        !filteredCities ?
                        groupedByRegionCitiesList && Object.entries(groupedByRegionCitiesList).map(([district, cities], index) => (
                            <div key={index} className="listItem">
                                    <Collapsible trigger={district}>
                                        {
                                            cities.map((city, index) => (
                                                <div key={index}>
                                                    <Collapsible className="numeration" trigger={city.name}>
                                                        Область: {city.region}<br/>
                                                        Район: {city.district}
                                                    </Collapsible>
                                                </div>
                                            ))
                                        }
                                    </Collapsible>
                                </div>
                        ))
                        :
                        filteredCities && Object.entries(filteredCities).map(([district, cities], index) => (
                            <div key={index} className="listItem">
                                    <Collapsible trigger={district}>
                                        {
                                            cities.map((city, index) => (
                                                <div key={index}>
                                                    <Collapsible className="numeration" trigger={city.name}>
                                                        Область: {city.region}<br/>
                                                        Район: {city.district}
                                                    </Collapsible>
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

export default CitiesHandbook;