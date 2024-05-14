import React from "react";
import CarsSelect from './CarsSelect';
import DateSelect from "./DateSelect";
import CitiesSelect from './CitiesSelect';
import RouteCities from "./RouteCities";

import ManageBtns from "./ManageBtns";
import WeightSelect from "./WeightSelect";

function MainManage() {
    return (
        <div className="mainManage">
            <ManageBtns />
            <DateSelect />
            <WeightSelect />
            <CarsSelect />
            <CitiesSelect />
            <RouteCities />
        </div>
    );
}

export default MainManage;