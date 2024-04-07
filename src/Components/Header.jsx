import React from "react";

import logo from '../pics/logo.png';

function Header() {
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
            <a className="right" href="/authorization">
                <div className="auth">
                    <button>Вход</button>
                </div>
            </a>
        </div>
    );
}

export default Header;