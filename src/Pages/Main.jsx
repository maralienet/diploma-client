import React from 'react';
import Details from '../Components/Details';
import MainManage from '../Components/MainManage';
import MainMap from '../Components/Map';

function Main() {
    return (
        <div className='mainPage'>
            <aside>
                <MainManage />
            </aside>
            <main>
                <MainMap />
                <Details />
            </main>
        </div>
    );
}

export default Main;
