import React from "react";
import "./Car.css";
import { useNavigate } from "react-router-dom";

const Car = (props) => {
    let navigate = useNavigate();
    function handleRent(id) {
        navigate(`/booking/${id}`);
    }

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
                    <button
                        className="rent-button"
                        onClick={() => {
                            handleRent(props.carId);
                        }}
                    >
                        Rent Car
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Car;
