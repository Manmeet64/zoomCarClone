import React, { useEffect, useState } from "react";
import Car from "./Car";
import "./CarList.css";

const CarList = () => {
    const [cars, setCars] = useState([]);

    useEffect(() => {
        fetchCars();
    }, []);

    const fetchCars = async () => {
        try {
            const response = await fetch("http://localhost:3000/cars");
            if (response.ok) {
                const data = await response.json();
                setCars(data.slice(0, 6)); // Only take the first 6 cars for display
            } else {
                console.error("Failed to fetch cars");
            }
        } catch (error) {
            console.error("Error fetching cars:", error);
        }
    };

    return (
        <div className="car-list-container">
            {cars.map((car) => (
                <Car
                    key={car.id} // Ensure each car has a unique key
                    imageUrl={car.images.image1}
                    type={car.type}
                    name={car.name}
                    fuelType={car.fuelType}
                    seater={car.seater}
                    pricePerHour={car.pricing}
                />
            ))}
        </div>
    );
};

export default CarList;
