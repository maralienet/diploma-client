import React, { useEffect, useState } from "react";
import axios from "axios";

import ErrorMessage from "./ErrorMessage";

function CarReport() {
    const [dates, setDates] = useState([null, null]);
    const [choose, setChoose] = useState(false);
    const [error, setError] = useState('');
    const today = formatDate(new Date());
    function saveReport(isPeriod) {
        if (isPeriod) {
            axios.get(`http://localhost:3001/pdf/cars/period/${dates[0]}/${dates[1]}`, { responseType: 'blob' })
                .then(response => {
                    console.log(response.data)
                    const url = window.URL.createObjectURL(response.data);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = `Отчёт по маршрутам грузовиков ${today}.pdf`;
                    document.body.appendChild(a);
                    a.click();
                    a.remove();
                })
                .catch(error => {
                    setError('Данных за этот период нет');
                });
        }
        else {
            axios.get(`http://localhost:3001/pdf/cars/month`, { responseType: 'blob' })
                .then(response => {
                    const url = window.URL.createObjectURL(response.data);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = `Отчёт по маршрутам грузовиков ${today}.pdf`;
                    document.body.appendChild(a);
                    a.click();
                    a.remove();
                })
                .catch(error => {
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
        var dd = date.getDate();
        if (dd < 10) dd = '0' + dd;
        var mm = date.getMonth() + 1;
        if (mm < 10) mm = '0' + mm;
        var yy = date.getFullYear();
        return dd + '.' + mm + '.' + yy;
    }

    return (
        <div>
            {error !== '' && <ErrorMessage msg={error} close={() => setError('')} />}
            <h4>Отчёт по маршрутам грузовиков</h4>
            <div className="btns">
                <span>Отчёт за текущий месяц</span>
                <button onClick={() => saveReport(false)}>Скачать</button>
                <span>Отчёт за определённый период</span>
                <button className="defineDates" type='button' onClick={() => setChoose(!choose)}>Определить даты</button>
                {choose &&
                    <>
                        <div className="dates">
                            <div>
                                <label htmlFor='from'>Начальное число: </label>
                                <input type="date" id='from' max={dates[1]} onChange={(e) => handleFromDateChange(e)} />
                            </div>
                            <div>
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

export default CarReport;