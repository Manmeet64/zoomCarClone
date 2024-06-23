import React, { useState, useEffect } from "react";
import styles from "./Drivers.module.css"; // Import your CSS module for styling

const Drivers = () => {
    const [drivers, setDrivers] = useState([]);

    useEffect(() => {
        const fetchDrivers = async () => {
            try {
                const response = await fetch("http://localhost:3000/drivers");
                if (!response.ok) {
                    throw new Error("Failed to fetch drivers");
                }
                const data = await response.json();
                setDrivers(data);
            } catch (error) {
                console.error("Error fetching drivers:", error.message);
            }
        };

        fetchDrivers();
    }, []);

    return (
        <div className={styles.container}>
            <h2>Available Drivers</h2>
            <div className={styles.grid}>
                {drivers.map((driver) => (
                    <div key={driver.driverId} className={styles.card}>
                        <img
                            src={driver.imageURL}
                            alt={driver.name}
                            className={styles.driverImage}
                        />
                        <div className={styles.driverDetails}>
                            <h3 className={styles.driverName}>{driver.name}</h3>
                            <p className={styles.driverState}>{driver.state}</p>
                            <div className={styles.driverFeedback}>
                                <p>{driver.feedback.comment}</p>
                                <div className={styles.rating}>
                                    <span className={styles.ratingText}>
                                        {driver.feedback.rating}
                                    </span>
                                    <span className={styles.ratingIcon}>★</span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Drivers;
