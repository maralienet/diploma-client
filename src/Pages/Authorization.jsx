import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";

function Authorization() {
    let navigate = useNavigate();
    const [login, setLogin] = useState('');
    const [pass, setPass] = useState('');
    const [usersList, setUserList] = useState([]);
    const [loginError, setLoginError] = useState('');
    const [passError, setPassError] = useState('');

    useEffect(() => {
        axios.get("http://localhost:3001/users?active=true").then((res) => {
            setUserList(res.data)
        });
    }, []);

    function handleSubmimt(e) {
        e.preventDefault();
        let user = usersList.filter(user => user.login === login);
        if (user && pass !== '') {
            user = user[0];
            setLoginError('');
            if (user !== undefined && user.password === pass) {
                let date = new Date();
                date.setTime(date.getTime() + (3 * 60 * 60 * 1000));
                let expires = "; expires=" + date.toUTCString();
                document.cookie = "userid=" + user.id + expires + "; path=/";
                if (user.role === 2)
                    navigate(`/main`);
                if (user.role === 1)
                    navigate(`/admin`);
                setPassError('');
            }
            else setPassError('Пароль неверный');
        }
        else setLoginError('Пользователь не существует');
    }

    return (
        <main>
            <div className="auth">
                <div className="authForm">
                    <h2>Авторизация</h2>
                    <form onSubmit={(e) => handleSubmimt(e)}>
                        <div className="inputDiv">
                            <label>
                                <input type="text" placeholder="Логин" minLength={2} maxLength={20} onChange={(e) => setLogin(e.target.value)} />
                                <span>Логин</span>
                            </label>
                            <span className={loginError ? "error" : ''}>{loginError}</span>
                        </div>
                        <div className="inputDiv">
                            <label>
                                <input type="password" placeholder="Пароль" maxLength={8} onChange={(e) => setPass(e.target.value)} />
                                <span>Пароль</span>
                            </label>
                            <span className={passError ? "error" : ''}>{passError}</span>
                        </div>
                        <div className="submit">
                            <button type="submit">Войти</button>
                        </div>
                    </form>
                </div>
            </div>
        </main>
    );
}

export default Authorization;