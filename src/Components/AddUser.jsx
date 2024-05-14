import React, { useState, useEffect } from "react";
import axios from 'axios';

function AddUser({ onAddUser, confirm, cancel }) {
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [role, setRole] = useState('2');
    const [nameErr, setNameErr] = useState('');
    const [surnameErr, setSurnameErr] = useState('');

    function transliterate(word) {
        word = word.toLowerCase();
        let answer = "";
        let converter = {
            'а': 'a', 'б': 'b', 'в': 'v', 'г': 'g', 'д': 'd', 'е': 'e', 'ё': 'e',
            'ж': 'zh', 'з': 'z', 'и': 'i', 'й': 'y', 'к': 'k', 'л': 'l', 'м': 'm',
            'н': 'n', 'о': 'o', 'п': 'p', 'р': 'r', 'с': 's', 'т': 't', 'у': 'u',
            'ф': 'f', 'х': 'h', 'ц': 'c', 'ч': 'ch', 'ш': 'sh', 'щ': 'sch', 'ъ': '',
            'ы': 'y', 'ь': '', 'э': 'e', 'ю': 'yu', 'я': 'ya'
        };
        for (let i = 0; i < word.length; ++i) {
            if (converter[word[i]] == undefined)
                answer += word[i];
            else
                answer += converter[word[i]];
        }
        return answer;
    }
    function addUser() {
        let login = transliterate(`${name.substr(0, 1)}${surname}`);
        let user = {
            name: name,
            surname: surname,
            login: login,
            password: login,
            role: role
        };
        axios.post('http://localhost:3001/users', user).then(() => {
            onAddUser(user);
            confirm();
        });
    }
    function handleSubmit() {
        if (name !== '' && surname !== ''){
            addUser();
            setNameErr('');
            setSurnameErr('');
        }
        else if (surname === '' && name === '') {
            setNameErr('Введите имя');
            setSurnameErr('Введите фамилию');
        }
        else if (name === '' && surname !== '')
            setNameErr('Введите имя');
        else if (surname === '' && name !== '')
            setSurnameErr('Введите фамилию');
    }

    return (
        <div className="overlay">
            <div className="addUser">
                <div className="close" onClick={cancel}>
                    <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 1L16 16" stroke="#9E9E9E" strokeWidth="2"></path>
                        <path d="M1 16L16 1" stroke="#9E9E9E" strokeWidth="2"></path>
                    </svg>
                </div>
                <h3>Добавление пользователя</h3>
                <form>
                    <div className="inputDiv">
                        <label>
                            <input type="text" placeholder="Имя" onChange={(e) => setName(e.target.value)} />
                            <span>Имя</span>
                        </label>
                        {nameErr && <span className="error">{nameErr}</span>}
                    </div>
                    <div className="inputDiv">
                        <label>
                            <input type="text" placeholder="Фамилия" onChange={(e) => setSurname(e.target.value)} />
                            <span>Фамилия</span>
                        </label>
                        {surnameErr && <span className="error">{surnameErr}</span>}
                    </div>
                    <div className="inputDiv select">
                        <span>Роль</span>
                        <select onChange={(e) => setRole(e.target.value)} >
                            <option value='2'>Логист</option>
                            <option value='1'>Администратор</option>
                        </select>
                    </div>
                </form>
                <div className="submit">
                    <button type='button' onClick={() => handleSubmit()}>Добавить</button>
                </div>
            </div>
        </div>
    );
}

export default AddUser;