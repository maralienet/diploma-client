import React from "react";

import logo from '../pics/logo.png';

function Header() {
    return (
        <div>
            <div className="logo">
                <img src={logo} alt="logo" />
            </div>
            <div className="name">
                <span>Построение маршрута доставки</span>
            </div>
        </div>
    );
}

export default Header;