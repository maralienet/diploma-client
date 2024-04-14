import React from "react";
import useCookie from '../Components/useCookie'

import logo from '../pics/logo.png';

function Header() {
    const id = useCookie('userid');

    return (
        <div>
            <a className="left" href="/">
                <div className="logo">
                    <img src={logo} alt="logo" />
                </div>
                <div className="name">
                    <span>Построение маршрута доставки</span>
                </div>
            </a>
            <div className="right">
                <a href="/help">
                    Помощь
                </a>
                {
                    !id ?
                        <a href="/authorization">
                            Вход
                        </a>
                        :
                        <a href="/me">
                            Личный кабинет
                        </a>
                }
            </div>
        </div>
    );
}

export default Header;