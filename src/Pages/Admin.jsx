import React, { useState, useEffect } from "react";
import axios from 'axios';
import useCookie from '../Components/useCookie'

import CreateReports from "../Components/CreateReports";
import ChangePass from "../Components/ChangePass";
import UsersManagement from "../Components/UsersManagement";
import TrucsManagement from "../Components/TrucsManagement";
import LogistsStats from "../Components/LogistsStats";

function Admin() {
    const id = useCookie('userid');
    const [user, setUser] = useState(null);
    const [selectedMngmnt, setSelectedMngmnt] = useState(null);

    useEffect(() => {
        axios.get(`http://localhost:3001/users?id=${id}`).then((res) => {
            setUser(res.data[0])
        });
    }, []);

    function exit() {
        var cookies = document.cookie.split(";");
        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i];
            var eqPos = cookie.indexOf("=");
            var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
            document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
            document.location = ('/');
        }
    }

    const managementComponents = {
        'users': <UsersManagement />,
        'trucks': <TrucsManagement />,
        'logiststat': <LogistsStats/>,
        'report': <CreateReports role='admin' />,
        'changePass': <ChangePass user={user} />
    };

    return (
        <div className="admin">
            <div className="header">
                <h2>Управление</h2>
            </div>
            <div className="general">
                <aside>
                    <div className="manageMenu">
                        <div className={`menuItem ${selectedMngmnt === 'users' && 'active'}`} onClick={() => setSelectedMngmnt('users')}>
                            Управление пользователями
                        </div>
                        <div className={`menuItem ${selectedMngmnt === 'trucks' && 'active'}`} onClick={() => setSelectedMngmnt('trucks')}>
                            Управление грузовиками
                        </div>
                        <div className={`menuItem ${selectedMngmnt === 'logiststat' && 'active'}`} onClick={() => setSelectedMngmnt('logiststat')}>
                            Статистика по логистам
                        </div>
                        <div className={`menuItem ${selectedMngmnt === 'report' && 'active'}`} onClick={() => setSelectedMngmnt('report')}>
                            Создание отчётов
                        </div>
                    </div>
                    <div className="manageMenu">
                        <div className={`menuItem ${selectedMngmnt === 'changePass' && 'active'}`} onClick={() => setSelectedMngmnt('changePass')}>
                            Изменить пароль
                        </div>
                        <div className="menuItem" onClick={() => exit()}>
                            Выход
                        </div>
                    </div>
                </aside>
                <main>
                    <div className="manage">
                        {managementComponents[selectedMngmnt]}
                    </div>
                </main>
            </div>
        </div>
    );
}

export default Admin;