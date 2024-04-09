import React from "react";
import { useSelector } from 'react-redux';

function Details() {
    const routeDetails = useSelector(state => state.routeDetails.routeDetails);
    return (
        <div className="details">
            <div className="header">
                Детали маршрута:
            </div>
            <div className="detList">
                <div className="detail">
                    <p>
                        Грузовик(и): <br />
                        {routeDetails.car &&
                            routeDetails.car.map((car, index) => (
                                <div key={index} style={{ fontWeight: 400 }}>
                                    <span>{car}</span><br />
                                </div>
                            ))
                        }
                    </p>
                </div>
                <div className="detail">
                    <p>
                        Расстояние: <span style={{ fontWeight: 400 }}>
                            {routeDetails.length && routeDetails.length}
                        </span>
                    </p>
                </div>
                <div className="detail">
                    <p>
                        Затрачиваемое время: <span style={{ fontWeight: 400 }}>
                            {routeDetails.duration && routeDetails.duration}
                        </span>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Details;