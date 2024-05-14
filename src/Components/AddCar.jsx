import React, { useState } from "react";
import axios from 'axios';

function AddCar({ onAddCar, confirm, cancel }) {
    const [brand, setBrand] = useState('');
    const [gosNum, setGosNum] = useState('');
    const [gosNumReg, setGosNumReg] = useState(1);
    const [capacity, setCapacity] = useState('');
    const [brandErr, SetBrandErr] = useState('');
    const [gosNumErr, SetGosNumErr] = useState('');
    const [capacityErr, SetCapacityErr] = useState('');

    function addCar() {
        let car = {
            brand: brand,
            gosNumber: `${gosNum}-${gosNumReg}`,
            capacity: capacity
        };
        axios.post('http://localhost:3001/cars', car).then(() => {
            console.log(car)
            onAddCar(car);
            confirm();
        });
    }
    function checkGosNum(num) {
        let correct = /^[A-Z]{2}[0-9]{4}/.test(num);
        if (!correct) SetGosNumErr('Неверный формат гос. номера');
        return correct;
    }

    function handleSubmit() {
        if (brand !== '' && gosNum !== '' && capacity !== '' && checkGosNum(gosNum)) {
            addCar();
            SetBrandErr('');
            SetGosNumErr('');
            SetCapacityErr('');
        }
        if (brand === '')
            SetBrandErr('Введите марку');
        else SetBrandErr('');
        if (gosNum === '' && checkGosNum(gosNum))
            SetGosNumErr('Введите гос. номер');
        if (capacity === '')
            SetCapacityErr('Введите грузоподъёмность');
        else SetCapacityErr('');
    }

    return (
        <div className="overlay">
            <div className="addCar">
                <div className="close" onClick={cancel}>
                    <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 1L16 16" stroke="#9E9E9E" strokeWidth="2"></path>
                        <path d="M1 16L16 1" stroke="#9E9E9E" strokeWidth="2"></path>
                    </svg>
                </div>
                <h3>Добавление грузовика</h3>
                <form>
                    <div className="inputDiv">
                        <label>
                            <input type="text" placeholder="Марка" onChange={(e) => setBrand(e.target.value)} />
                            <span>Марка</span>
                        </label>
                        {brandErr && <span className="error">{brandErr}</span>}
                    </div>
                    <div className="inputDiv gosNum">
                        <div>
                            <label>
                                <input type="text" placeholder="Гос. номер" maxLength={6} onChange={(e) => setGosNum(e.target.value)} />
                                <span>Гос. номер</span>
                            </label>
                            <div style={{ width: '10px', lineHeight: '40px' }}>-</div>
                            <div className="select">
                                <span className="region">Регион</span>
                                <select onChange={(e)=>setGosNumReg(e.target.value)}>
                                    <option value={1}>1</option>
                                    <option value={2}>2</option>
                                    <option value={3}>3</option>
                                    <option value={4}>4</option>
                                    <option value={5}>5</option>
                                    <option value={6}>6</option>
                                    <option value={7}>7</option>
                                </select>
                            </div>
                        </div>
                        {gosNumErr && <span className="error">{gosNumErr}</span>}
                    </div>
                    <div className="inputDiv">
                        <label>
                            <input type="number" placeholder="Грузоподъёмность (в кг)" onChange={(e) => setCapacity(e.target.value)} />
                            <span>Грузоподъёмность (в кг)</span>
                        </label>
                        {capacityErr && <span className="error">{capacityErr}</span>}
                    </div>
                </form>
                <div className="submit">
                    <button type='button' onClick={() => handleSubmit()}>Добавить</button>
                </div>
            </div>
        </div>
    );
}

export default AddCar;