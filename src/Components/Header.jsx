import React, { useState, useEffect } from "react";
import axios from 'axios';
import Cookies from 'js-cookie';
import logo from '../pics/logo.png';

function Header() {
    const [user, setUser] = useState(null);
    const [id, setId] = useState(Cookies.get('userid'));
    const [left, setLeft] = useState('');

    useEffect(() => {
        const interval = setInterval(() => {
            const userId = Cookies.get('userid');
            if (userId) setId(userId);
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (id)
            axios.get(`http://localhost:3001/users?id=${id}`).then((res) => {
                setUser(res.data[0])
                if (user) {
                    if (user.role === 1) setLeft('/admin')
                    else setLeft('/main');
                }
                else setLeft('/');
            });
    }, [id, left]);

    return (
        <div>
            <a className="left" href={left && left}>
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
                        <a href="/">
                            Вход
                        </a>
                        :
                        <a href={user && user.role === 2 ? "/me" : "/admin"}>
                            Личный кабинет
                        </a>
                }
            </div>
        </div>
    );
}

export default Header;