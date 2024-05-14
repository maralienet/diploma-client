import React, { useState, useEffect } from "react";
import axios from 'axios';
import useCookie from '../Components/useCookie'
import CarsHandbook from "../Components/CarsHandbook";
import CitiesHandbook from "../Components/CitiesHandbook";
import CarsStats from "../Components/CarsStats";
import RoutesStats from "../Components/RoutesStats";
import CreateReports from "../Components/CreateReports";
import Collapsible from "react-collapsible";
import ActiveRoutes from "../Components/ActiveRoutes";
import PlannedRoutes from "../Components/PlannedRoutes";
import CompletedRoutes from "../Components/CompletedRoutes";
import ChangePass from "../Components/ChangePass";

function Me() {
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
        'cities': <CitiesHandbook />,
        'cars': <CarsHandbook />,
        'carstat': <CarsStats />,
        'routestat': <RoutesStats />,
        'report': <CreateReports role='logist' />,
        'activeRoutes': <ActiveRoutes />,
        'plannedRoutes': <PlannedRoutes />,
        'completedRoutes': <CompletedRoutes />,
        'changePass': <ChangePass user={user} />
    };

    return (
        <div className="me">
            <div className="header">
                <h2>Управление</h2>
            </div>
            <div className="general">
                <aside>
                    <div className="manageMenu">
                        <Collapsible trigger='Маршруты'>
                            <div className={`${selectedMngmnt === 'activeRoutes' && 'active'}`} onClick={() => setSelectedMngmnt('activeRoutes')}>
                                Активные маршруты
                            </div>
                            <div className={`${selectedMngmnt === 'plannedRoutes' && 'active'}`} onClick={() => setSelectedMngmnt('plannedRoutes')}>
                                Запланированные маршруты
                            </div>
                            <div className={`${selectedMngmnt === 'completedRoutes' && 'active'}`} onClick={() => setSelectedMngmnt('completedRoutes')}>
                                Выполненные маршруты
                            </div>
                        </Collapsible>
                        <div className={`menuItem ${selectedMngmnt === 'cars' && 'active'}`} onClick={() => setSelectedMngmnt('cars')}>
                            Справочник автомобилей
                        </div>
                        <div className={`menuItem ${selectedMngmnt === 'cities' && 'active'}`} onClick={() => setSelectedMngmnt('cities')}>
                            Справочник населённых пунктов
                        </div>
                        <div className={`menuItem ${selectedMngmnt === 'carstat' && 'active'}`} onClick={() => setSelectedMngmnt('carstat')}>
                            Статистика по машинам
                        </div>
                        <div className={`menuItem ${selectedMngmnt === 'routestat' && 'active'}`} onClick={() => setSelectedMngmnt('routestat')}>
                            Статистика по маршрутам
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

export default Me;