import React, { useState } from "react";

function AdviceList() {
    const [active, setActive] = useState('');

    return (
        <ul>
            <li onClick={() => setActive('adv1')}>
                <a className={active === 'adv1' ? 'active' : ''} href='#adv1'>
                    Как построить маршрут?
                </a>
            </li>
            <li onClick={() => setActive('adv2')}>
                <a className={active === 'adv2' ? 'active' : ''} href='#adv2'>
                    Как выбрать несколько грузовиков для одного маршрута?
                </a>
            </li>
            <li onClick={() => setActive('adv3')}>
                <a className={active === 'adv3' ? 'active' : ''} href='#adv3'>
                    Как добавить в маршрут город, не относящийся к выбранному району?
                </a>
            </li>
            <li onClick={() => setActive('adv4')}>
                <a className={active === 'adv4' ? 'active' : ''} href='#adv4'>
                    Где можно узнать итоговый маршрут?
                </a>
            </li>
            <li onClick={() => setActive('adv5')}>
                <a className={active === 'adv5' ? 'active' : ''} href='#adv5'>
                    Где просмотреть детали маршрута?
                </a>
            </li>
            <li onClick={() => setActive('adv6')}>
                <a className={active === 'adv6' ? 'active' : ''} href='#adv6'>
                    Как сохранить маршрут?
                </a>
            </li>
            <li onClick={() => setActive('adv7')}>
                <a className={active === 'adv7' ? 'active' : ''} href='#adv7'>
                    Как отменить выбор города или грузовика?
                </a>
            </li>
            <li onClick={() => setActive('adv8')}>
                <a className={active === 'adv8' ? 'active' : ''} href='#adv8'>
                    Как войти в аккаунт?
                </a>
            </li>
            <li onClick={() => setActive('adv9')}>
                <a className={active === 'adv9' ? 'active' : ''} href='#adv9'>
                    Как узнать подробную информацию о городе или грузовике?
                </a>
            </li>
            <li onClick={() => setActive('adv10')}>
                <a className={active === 'adv10' ? 'active' : ''} href='#adv10'>
                    Как узнать статистику грузовика или маршрута?
                </a>
            </li>
        </ul>
    );
}

export default AdviceList;