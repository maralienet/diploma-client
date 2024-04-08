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
        axios.get("http://localhost:3001/users").then((res) => {
            setUserList(res.data)
        });
    }, []);

    function handleSubmimt(e) {
        e.preventDefault();
        let user = usersList.filter(user => user.login === login);
        if (user) {
            user = user[0];
            if (user.password === pass) {
                let date = new Date();
                date.setTime(date.getTime() + (3 * 60 * 60 * 1000));
                let expires = "; expires=" + date.toUTCString();
                document.cookie = "userid=" + user.id + expires + "; path=/";
                navigate(`/me`);
            }
            else setPassError('Пароль не верный');
        }
        else setLoginError('Логин не верный');
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
                        </div>
                        <div className="inputDiv">
                            <label>
                                <input type="password" placeholder="Пароль" maxLength={8} onChange={(e) => setPass(e.target.value)} />
                                <span>Пароль</span>
                            </label>
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