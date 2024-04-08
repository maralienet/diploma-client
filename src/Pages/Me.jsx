import React, { useState, useEffect } from "react";
import axios from 'axios';
import useCookie from '../Components/useCookie'

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
            <aside>
                <div className="manageMenu">
                    <div className="menuItem" onClick={() => setSelectedMngmnt('cars')}>
                        Справочник автомобилей
                    </div>
                    <div className="menuItem" onClick={() => setSelectedMngmnt('cities')}>
                        Справочник населённый пунктов
                    </div>
                    <div className="menuItem" onClick={() => setSelectedMngmnt('')}>
                        оао
                    </div>
                </div>
            </aside>
            <main>

            </main>
        </div>
    );
}

export default Me;