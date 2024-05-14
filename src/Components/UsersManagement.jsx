import React, { useState, useEffect } from "react";
import axios from 'axios';
import Confirm from "./Confirm";
import AddUser from "./AddUser";

function UsersManagement() {
    const [users, setUsers] = useState([]);
    const [id, setId] = useState(null);
    const [txt, setTxt] = useState('');
    const [confirm, setConfirm] = useState({ del: null, add: null });
    const [ask, setAsk] = useState(false);
    const [add, setAdd] = useState(false);

    useEffect(() => {
        axios.get('http://localhost:3001/users').then((res) => {
            setUsers(res.data);
        });
    }, []);

    useEffect(() => {
        manageUser(id);
    }, [confirm]);

    function manageUser(id) {
        if (confirm.del)
            axios.delete(`http://localhost:3001/users/${id}`).then((res) => {
                axios.get('http://localhost:3001/users').then((res) => {
                    setUsers(res.data);
                });
            })
        if (confirm.add)
            axios.get('http://localhost:3001/users').then((res) => {
                setUsers(res.data);
            });
    }
    function addUser(newUser) {
        setUsers([...users, newUser]);
    }

    return (
        <div className="adminMng userMng">
            {ask && <Confirm txt={txt} confirm={() => { setConfirm({ del: true }); setAsk(false) }} cancel={() => { setConfirm({ del: false }); setAsk(false) }} />}
            {add && <AddUser onAddUser={addUser} confirm={() => { setConfirm({ add: true }); setAdd(false) }} cancel={() => { setConfirm({ add: false }); setAdd(false) }} />}
            <div className="header">
                <h3>Управление пользователями</h3>
            </div>
            <div className="add">
                <button onClick={() => setAdd(true)}>Добавить пользователя</button>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Имя</th>
                        <th>Фамилия</th>
                        <th>Логин</th>
                        <th>Роль</th>
                        <th>Активность</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        users && users.map(user => (
                            <tr key={user.id}>
                                <td>{user.name && user.name}</td>
                                <td>{user.surname && user.surname}</td>
                                <td>{user.login && user.login}</td>
                                <td>{user.role && user.role === 1 ? 'Администратор' : 'Логист'}</td>
                                <td>{user.active && user.active ? 'Активен' : 'Не активен'}</td>
                                <td className="del" title='Удалить' onClick={() => { setId(user.id); setAsk(true); setTxt(`Вы уверены, что хотите удалить пользователя ${user.name} ${user.surname}?`) }}>
                                    <img src='https://cdn-icons-png.flaticon.com/512/1828/1828945.png' />
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    );
}

export default UsersManagement;