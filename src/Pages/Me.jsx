import React, { useState, useEffect } from "react";
import axios from 'axios';
import useCookie from '../Components/useCookie'
import CarsHandbook from "../Components/CarsHandbook";
import CitiesHandbook from "../Components/CitiesHandbook";

function Me() {
    const id = useCookie('userid');
    const [user, setUser] = useState(null);
    const [selectedMngmnt, setSelectedMngmnt] = useState(null);
    useEffect(() => {
        axios.get(`http://localhost:3001/users?id=${id}`).then((res) => {
            setUser(res.data[0])
        });
    }, []);
    return (
        <div className="me">
            <div className="header">
                <h2>Управление</h2>
            </div>
            <div className="general">
                <aside>
                    <div className="manageMenu">
                        <div className="menuItem" onClick={() => setSelectedMngmnt('cars')}>
                            Справочник автомобилей
                        </div>
                        <div className="menuItem" onClick={() => setSelectedMngmnt('cities')}>
                            Справочник населённых пунктов
                        </div>
                        <div className="menuItem" onClick={() => setSelectedMngmnt('report')}>
                            Создание отчётов
                        </div>
                    </div>
                </aside>
                <main>
                    <div className="manage">
                        {
                            selectedMngmnt === 'cities'
                                ? <CitiesHandbook />
                                : selectedMngmnt === 'cars' 
                                && <CarsHandbook />
                        }
                    </div>
                </main>
            </div>
        </div>
    );
}

export default Me;