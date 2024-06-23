import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styles from "./CarDetails.module.css"; // Import CSS module
import ReviewComponent from "../components/ReviewComponent";
import Booking from "./Booking"; // Import Booking component
const CarDetails = () => {
    const { id } = useParams(); // Get car ID from URL params
    const [carData, setCarData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch car details
                const carResponse = await fetch(
                    `http://localhost:3000/cars/${id}`
                );
                if (!carResponse.ok) {
                    throw new Error("Failed to fetch car data");
                }
                const carData = await carResponse.json();
                setCarData(carData);
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };

        fetchData();
    }, [id]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!carData) {
        return <div>No car data found</div>;
    }

    return (
        <div className={styles["car-details-container"]}>
            <div className={styles["car-details-card"]}>
                <div className={styles["carousel"]}>
                    <img src={carData.images.image1} alt="Car 1" />
                    <img src={carData.images.image2} alt="Car 2" />
                    <img src={carData.images.image3} alt="Car 3" />
                    <img src={carData.images.image4} alt="Car 4" />
                </div>
                <div className={styles["car-details"]}>
                    <h2>{carData.name}</h2>
                    <p>Model: {carData.model}</p>
                    <p>Year: {carData.year}</p>
                    <p>Seater: {carData.seater}</p>
                    <p>Fuel Type: {carData.fuelType}</p>
                    <p>Transmission: {carData.transmission}</p>
                    <div className={styles["features"]}>
                        <h3>Features:</h3>
                        <ul>
                            <li className={styles["feature-item"]}>
                                {carData.features.feature1}
                            </li>
                            <li className={styles["feature-item"]}>
                                {carData.features.feature2}
                            </li>
                            <li className={styles["feature-item"]}>
                                {carData.features.feature3}
                            </li>
                            <li className={styles["feature-item"]}>
                                {carData.features.feature4}
                            </li>
                            <li className={styles["feature-item"]}>
                                {carData.features.feature5}
                            </li>
                        </ul>
                    </div>
                    <div className={styles["customer-reviews"]}>
                        <h3>Customer Reviews:</h3>
                        <div className={styles["carousel"]}>
                            <ReviewComponent />
                        </div>
                    </div>
                </div>
            </div>
            <Booking carId={id} carPrice={carData.pricing} />
        </div>
    );
};

export default CarDetails;
