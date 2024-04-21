import React from "react";
import CarReport from "./CarReport";
import RoutesReport from "./RoutesReport";

function CreateReports() {
    return (
        <div className="createReports">
            <div className="header">
                <h3>Создание отчётов</h3>
            </div>
            <div className="body">
                <CarReport />
                <RoutesReport />
            </div>
        </div>
    );
}
export default CreateReports;