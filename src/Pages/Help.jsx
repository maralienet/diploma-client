import React from 'react';

function Help() {
    return (
        <div className='help'>
            <h1><center>Инструкция по использованию</center></h1>
            <div>
                <main>
                    <div className="advice" id='adv1'>
                        <h2>Как построить маршрут?</h2>
                        <p>
                            Для постоения маршрута вам необходимо нажать на нужный город на карте на главной странице сайта.
                            После появления метки с названием города и прогрузки доступных для доставки городов, вам будет доступна функция 
                        </p>
                    </div>
                </main>
                <aside>
                    <ul>
                        <a className="advItem" href='#adv1'>
                            Как построить маршрут?
                        </a>
                        <a className="advItem">
                            Как построить маршрут?
                        </a>
                    </ul>
                </aside>
            </div>
        </div>
    );
}

export default Help;
