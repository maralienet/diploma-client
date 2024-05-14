import React, { useState, useEffect } from "react";
import axios from 'axios';
import Confirm from "./Confirm";
import AddCar from "./AddCar";

function TrucsManagement() {
    const [cars, setCars] = useState([]);
    const [id, setId] = useState(null);
    const [txt, setTxt] = useState('');
    const [confirm, setConfirm] = useState({ del: null, add: null, edit: null });
    const [ask, setAsk] = useState(false);
    const [add, setAdd] = useState(false);

    useEffect(() => {
        axios.get('http://localhost:3001/cars').then((res) => {
            setCars(res.data);
        });
    }, []);

    useEffect(() => {
        manageTruck(id);
    }, [confirm]);

    function manageTruck(id) {
        if (confirm.del)
            axios.delete(`http://localhost:3001/cars/${id}`).then((res) => {
                axios.get('http://localhost:3001/cars').then((res) => {
                    setCars(res.data);
                });
            })
        if (confirm.add)
            axios.get('http://localhost:3001/cars').then((res) => {
                setCars(res.data);
            });
    }
    function addCar(newCar) {
        setCars([...cars, newCar]);
    }

    return (
        <div className="adminMng truckMng">
            {ask && <Confirm txt={txt} confirm={() => { setConfirm({ del: true }); setAsk(false) }} cancel={() => { setConfirm({ del: false }); setAsk(false) }} />}
            {add && <AddCar onAddCar={addCar} confirm={() => { setConfirm({ add: true }); setAdd(false) }} cancel={() => { setConfirm({ add: false }); setAdd(false) }} />}
            <div className="header">
                <h3>Управление грузовиками</h3>
            </div>
            <div className="add">
                <button onClick={() => setAdd(true)}>Добавить грузовик</button>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Марка</th>
                        <th>Гос. номер</th>
                        <th>Грузоподъёмность (в кг)</th>
                        <th>Активность</th>
                        <th></th>
                        {/* <th></th> */}
                    </tr>
                </thead>
                <tbody>
                    {
                        cars && cars.map(car => (
                            <tr key={car.id}>
                                <td>{car.brand && car.brand}</td>
                                <td>{car.gosNumber && car.gosNumber}</td>
                                <td>{car.capacity && car.capacity}</td>
                                <td>{car.active && car.active ? 'Активен' : 'Не активен'}</td>
                                {/* <td className="del edit" title='Изменить' onClick={() => { setId(car.id); setEdit(true); }}>
                                    <img src='https://cdn-icons-png.flaticon.com/512/860/860814.png' />
                                </td> */}
                                <td className="del" title='Удалить' onClick={() => { setId(car.id); setAsk(true); setTxt(`Вы уверены, что хотите удалить машину с номером ${car.gosNumber}?`) }}>
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

export default TrucsManagement;