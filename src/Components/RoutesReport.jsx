import React, { useState } from "react";
import axios from "axios";

import ErrorMessage from "./ErrorMessage";

function RoutesReport() {
    const [dates, setDates] = useState([null, null]);
    const [choose, setChoose] = useState(false);
    const [error, setError] = useState('');
    const today = formatDate(new Date());
    function saveReport(isPeriod) {
        if (isPeriod) {
            axios.get(`https://diploma-server-30k4.onrender.com/pdf/routes/period/${dates[0]}/${dates[1]}`, { responseType: 'blob' })
                .then(response => {
                    const url = window.URL.createObjectURL(response.data);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = `Отчёт по маршрутам ${today}.pdf`;
                    document.body.appendChild(a);
                    a.click();
                    a.remove();
                })
                .catch(() => {
                    setError('Данных за этот период нет');
                });
        }
        else {
            axios.get(`https://diploma-server-30k4.onrender.com/pdf/routes/month`, { responseType: 'blob' })
                .then(response => {
                    const url = window.URL.createObjectURL(response.data);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = `Отчёт по маршрутам ${today}.pdf`;
                    document.body.appendChild(a);
                    a.click();
                    a.remove();
                })
                .catch(() => {
                    setError('Данных за этот период нет');
                });
        }
    }
    function handleFromDateChange(e) {
        setDates([e.target.value, dates[1]]);
    };

    function handleToDateChange(e) {
        setDates([dates[0], e.target.value]);
    };
    function formatDate(date) {
        let moment = require('moment');
        return moment(date).format('DD.MM.YYYY');
    }

    return (
        <div>
            {error !== '' && <ErrorMessage msg={error} close={() => setError('')} />}
            <h4>Отчёт по маршрутам</h4>
            <div className="btns">
                <span>Отчёт за текущий месяц</span>
                <button onClick={() => saveReport(false)}>Скачать</button>
                <span>Отчёт за определённый период</span>
                <button type='button' className="defineDates" onClick={() => setChoose(!choose)}>Определить даты</button>
                {choose &&
                    <>
                        <div className="dates">
                            <div className='dateInput'>
                                <label htmlFor='from'>Начальное число: </label>
                                <input type="date" id='from' max={dates[1]} onChange={(e) => handleFromDateChange(e)} />
                            </div>
                            <div className='dateInput'>
                                <label htmlFor="to">Конечное число: </label>
                                <input type="date" id='to' min={dates[0]} onChange={(e) => handleToDateChange(e)} />
                            </div>
                        </div>
                        <button disabled={dates.includes(null) ? 'disabled' : ''} type='button' onClick={() => saveReport(true)}>Скачать</button>
                    </>
                }
            </div>
        </div>
    );
}

export default RoutesReport;