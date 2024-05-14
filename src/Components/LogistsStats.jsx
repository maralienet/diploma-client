import React, { useEffect, useState } from "react";
import axios from "axios";
import Collapsible from 'react-collapsible';

function LogistsStats() {
    let moment = require('moment');
    const [stats, setStats] = useState([]);
    const [statsFiltered, setStatsFiltered] = useState([]);
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');

    useEffect(() => {
        axios.get("http://localhost:3001/users/stats").then((res) => {
            setStats(res.data);
        });
    }, []);

    useEffect(() => {
        if (name !== '' && surname === '') {
            let filter = stats.filter(stat => stat.name.toLowerCase().startsWith(name.toLowerCase()));
            filter = setStatsFiltered(filter);
        }
        else if (surname !== '' && name === '') {
            let filter = stats.filter(stat => stat.surname.toLowerCase().startsWith(surname.toLowerCase()));
            filter = setStatsFiltered(filter);
        }
        else if (surname !== '' && name !== '') {
            let filter = stats.filter(stat => stat.surname.toLowerCase().startsWith(surname.toLowerCase()) && stat.name.toLowerCase().startsWith(name.toLowerCase()));
            filter = setStatsFiltered(filter);
        }
        else
            setStatsFiltered(null);
    }, [name, surname])

    return (
        <div className="logistsStats">
            <div className="header">
                <h3>Статистика по логистам</h3>
            </div>
            <div className="body">
                <div className="search">
                    <div className="inputDiv">
                        <label>
                            <input type="text" placeholder="Имя" onChange={(e) => setName(e.target.value)} />
                            <span>Имя</span>
                        </label>
                    </div>
                    <div className="inputDiv">
                        <label>
                            <input type="text" placeholder="Фамилия" onChange={(e) => setSurname(e.target.value)} />
                            <span>Фамилия</span>
                        </label>
                    </div>
                </div>
                <div className="statsList">
                    {
                        !statsFiltered ?
                            stats && stats.map(stat => (
                                <div key={stat.userId} className="listItem">
                                    <Collapsible trigger={`${stat.name} ${stat.surname}`}>
                                        <div className="info">
                                            <span>Создано маршрутов: {stat.count}</span>
                                            <span>Самый активный рабочий день: {moment(stat.maxActive).format('DD.MM.YYYY')}</span>
                                        </div>
                                    </Collapsible>
                                </div>
                            ))
                            :
                            statsFiltered.length>0 ? statsFiltered.map(stat => (
                                <div key={stat.userId} className="listItem">
                                    <Collapsible trigger={`${stat.name} ${stat.surname}`}>
                                        <div className="info">
                                            <span>Создано маршрутов: {stat.count}</span>
                                            <span>Самый активный рабочий день: {moment(stat.maxActive).format('DD.MM.YYYY')}</span>
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

export default LogistsStats;