import React from "react";
import "./Car.css";

const Car = (props) => {
    return (
        <div className="car-card">
            <img src={props.imageUrl} alt="Car" className="car-image" />
            <div className="car-details">
                <div className="car-info">
                    <h3>{props.name}</h3>
                </div>
                <div className="car-specs">
                    <p>{props.seater}</p>
                    <p>{props.fuelType}</p>
                    <p>{props.transmission}</p>
                    <p>{props.type}</p>
                </div>
                <div className="car-pricing">
                    <p className="price-per-hour">
                        &#8377;{props.pricePerHour}
                    </p>
                    <button className="rent-button">Rent Car</button>
                </div>
            </div>
        </div>
    );
};

export default Car;
