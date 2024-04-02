import React, { useEffect, useRef, useState } from "react";
import { YMaps, Map, Placemark,useYMaps } from '@pbe/react-yandex-maps';
import axios from 'axios';
import citiesRU from '../citiesRU.json';


function MainMap() {
    return (
        <YMaps>
            <div>
                <InnerMap />
            </div>
        </YMaps>
    );
}

export default MainMap;

function InnerMap() {
    const [ymaps,setYMaps] = useState(null);
    const mapRef = useRef(null);
    const [placemarkGeometry, setPlacemarkGeometry] = React.useState(null);
    const [placemarkProperties, setPlacemarkProperties] = React.useState({
        iconCaption: 'поиск...',
        balloonContent: ''
    });

    const loadYmaps = new Promise((resolve, reject) => {
        if (window.ymaps) {
            resolve();
        } else {
        const script = document.createElement('script');
        script.src = 'https://api-maps.yandex.ru/2.1/?apikey=6ee3a7c7-546e-44ad-8333-de26a7ea6e19&lang=ru_RU'; // URL скрипта Yandex Maps
        script.onload = resolve;
        script.onerror = reject;
        document.head.append(script);
        }
    });
    
    useEffect(() => {
        loadYmaps.then(() => {
            const ymaps = window.ymaps;
            setYMaps(window.ymaps)
            ymaps.ready(() => {
                // ymaps.geocode('Минск').then((result) => {
                //     console.log('Результат геокодирования:', result.geoObjects.get(0).geometry.getCoordinates());
                //     // Ваш код для обработки результата
                // });
            });
        }).catch((error) => {
            console.error('Ошибка при загрузке Yandex Maps:', error);
        });
    }, []);

    const handleMapClick = (e) => {
        const coords = e.get('coords');
        console.log(coords)
        setPlacemarkGeometry(coords);
        getAddress(coords);
    };

    const handleDragEnd = (e) => {
        const coords = e.originalEvent.target.geometry.getCoordinates();
        getAddress(coords);
    };


    const getAddress = (coords) => {
        if (!ymaps) {
            return;
        }
        setPlacemarkProperties(prev => ({ ...prev, iconCaption: 'поиск...' }));
        ymaps.geocode(coords).then(function (res) {
            let firstGeoObject = res.geoObjects.get(0);
            const locality = firstGeoObject.getLocalities().length ? firstGeoObject.getLocalities() : firstGeoObject.getAdministrativeAreas();
            setPlacemarkProperties({
                iconCaption: locality,
                balloonContent: locality
            });
            if (locality[0]) {
                let city = locality[0];
                if (city) {
                    getCityCode(city).then((wikiDataId) => {
                        if (wikiDataId != -1)
                            getAllData(wikiDataId, 100).then((allData) => {
                                console.log(allData);
                            });
                    });
                }
            }
        });
    };

    function getCityCode(city) {
        return axios.get('https://www.wikidata.org/w/api.php', {
            params: {
                action: 'wbgetentities',
                sites: 'ruwiki',
                titles: city,
                format: 'json',
                origin: '*'
            }
        })
            .then(response => {
                let wikiDataId = Object.keys(response.data.entities)[0];
                return wikiDataId;
            })
            .catch(error => {
                console.error(error);
            });
    }

    function findNearCities(url) {
        return axios.get(url, {
            headers: {
                'X-RapidAPI-Key': '544ab5c1d1msh21eb38ee3d08c9ap1c3972jsn80695f100c3d',
                'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com'
            }
        })
            .then(response => {
                return response.data;
            })
            .catch(error => {
                console.error(error);
            });
    }

    function getAllData(cityCode, radius) {
        let allData = [];
        let i = 1;
        function getNextPage(url) {
            return new Promise(resolve => {
                setTimeout(() => {
                    findNearCities(url).then((response) => {
                        const filteredData = response.data.filter(city => citiesRU.some(cityRU => cityRU.wikiDataId === city.wikiDataId && cityRU.id === city.id));
                        allData = allData.concat(filteredData);
                        let nextLink;
                        if (response.links)
                            nextLink = response.links.find(link => link.rel === 'next');
                        if (nextLink) {
                            resolve(getNextPage(`https://wft-geo-db.p.rapidapi.com${nextLink.href}`));
                            console.log(i++)
                        } else {
                            resolve(allData);
                        }
                    });
                }, 1500);
            });
        }
        return getNextPage(`https://wft-geo-db.p.rapidapi.com/v1/geo/places/${cityCode}/nearbyPlaces?radius=${radius}&types=CITY&distanceUnit=KM&countryIds=Q184&minPopulation=5000&languageCode=ru`);
    }

    return (
        <Map width={'100%'} height={'700px'} defaultState={{ center: [53.902284, 27.561831], zoom: 7 }} instanceRef={mapRef} onClick={handleMapClick}>
            {placemarkGeometry && (
                <Placemark
                    geometry={placemarkGeometry}
                    properties={placemarkProperties}
                    options={{ preset: 'islands#violetDotIconWithCaption', draggable: true }}
                    onDragEnd={handleDragEnd}
                />
            )}
        </Map>
    );
}