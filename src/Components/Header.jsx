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
            {
                !id ?
                    <a className="right" href="/authorization">
                        <div className="auth">
                            <button>Вход</button>
                        </div>
                    </a>
                    :
                    <a className="right" href="/me">
                        <div className="auth">
                            <button>Личный кабиинет</button>
                        </div>
                    </a>
            }
        </div>
    );
}

export default Header;