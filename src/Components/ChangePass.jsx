import React, { useState, useEffect } from "react";
import axios from 'axios';
import ErrorMessage from "./ErrorMessage";

function ChangePass({ user }) {
    const [old, setOld] = useState('');
    const [newp, setNew] = useState('');
    const [again, setAgain] = useState('');
    const [oldErr, setOldErr] = useState('');
    const [newpErr, setNewErr] = useState('');
    const [againErr, setAgainErr] = useState('');
    const [succsess, setSucc] = useState('');

    useEffect(() => {
        if (newp !== '')
            checkPass(newp);
    }, [newp]);

    useEffect(() => {
        if (newp !== '') {
            if (newp !== again)
                setAgainErr('Пароли не совпадают');
            else
                setAgainErr('');
        }
    }, [again]);

    function checkPass(password) {
        let hasNumber = /\d/.test(password);
        let hasLetter = /[a-zA-Z]/.test(password);
        let hasSpecialChar = /[!@#$%^&*_+=-`~]/.test(password);
        if (password.length < 6)
            setNewErr('Пароль должен быть длиннее 6 символов');
        else if (!hasNumber || !hasSpecialChar || !hasLetter)
            setNewErr('Пароль должен содержать хотя бы одну букву, цифру и спец. символ');
        else setNewErr('');
    }

    function handleSubmit() {
        if (user.password !== old)
            setOldErr('Неверный пароль');
        else {
            setOldErr('');
            if (againErr === '' && newpErr === '') {
                axios.put(`http://localhost:3001/users/${user.id}`, {
                    password: again
                }).then(() => setSucc('Пароль изменён успешно!'))
            }
        }
        console.log(user.password)
    }

    return (
        <div className="changePass">
            {succsess && <ErrorMessage msg={succsess} close={() => { setSucc(''); document.location.reload() }} />}
            <div className="header">
                <h3>Изменение пароля</h3>
            </div>
            <div className="body">
                <div className="inputDiv">
                    <label>
                        <input type="password" placeholder="Старый" onChange={(e) => setOld(e.target.value)} />
                        <span>Старый пароль</span>
                    </label>
                    {oldErr && <span className="error">{oldErr}</span>}
                </div>
                <div className="inputDiv">
                    <label>
                        <input type="password" placeholder="Новый" onChange={(e) => setNew(e.target.value)} />
                        <span>Новый пароль</span>
                    </label>
                    {newpErr && <span className="error">{newpErr}</span>}
                </div>
                <div className="inputDiv">
                    <label>
                        <input type="password" placeholder="Подтверждение" onChange={(e) => setAgain(e.target.value)} />
                        <span>Подтверждение пароля</span>
                    </label>
                    {againErr && <span className="error">{againErr}</span>}
                </div>
                <div className="submit">
                    <button type='button' onClick={() => handleSubmit()}>Изменить</button>
                </div>
            </div>
        </div>
    );
}

export default ChangePass;