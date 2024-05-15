import React from 'react';
import Details from '../Components/Details';
import MainManage from '../Components/MainManage';
import MainMap from '../Components/Map';
import SaveRoute from '../Components/SaveRoute';

function Main() {
    return (
        <div className='mainPage'>
            <aside>
                <MainManage />
            </aside>
            <main>
                <MainMap />
                <Details />
                <SaveRoute />
            </main>
        </div>
    );
}

export default Main;