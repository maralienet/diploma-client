import React from "react";
import CarReport from "./CarReport";
import RoutesReport from "./RoutesReport";
import LogistsReport from "./LogistsReport";

function CreateReports({ role }) {
    return (
        <div className="createReports">
            <div className="header">
                <h3>Создание отчётов</h3>
            </div>
            <div className="body">
                <CarReport />
                <RoutesReport />
                {
                    role === 'admin' &&
                    <LogistsReport />
                }
            </div>
        </div>
    );
}
export default CreateReports;