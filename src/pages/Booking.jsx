import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import styles from "./Booking.module.css"; // Import CSS module for Booking

const Booking = ({ carId, carPrice }) => {
    const [pickupDateTime, setPickupDateTime] = useState("");
    const [dropoffDateTime, setDropoffDateTime] = useState("");
    const [pickupLocation, setPickupLocation] = useState("");
    const [dropoffLocation, setDropoffLocation] = useState("");
    const [totalPrice, setTotalPrice] = useState(0);
    const [hireDriver, setHireDriver] = useState(false);
    const [homeDelivery, setHomeDelivery] = useState(false);
    const [carName, setCarName] = useState("");
    const [bookingId, setBookingId] = useState(null); // State to hold booking ID
    const [hoursDifference, setHoursDifference] = useState(0); // State to hold hours difference
    const [carPricePerHour, setCarPricePerHour] = useState(0); // State to hold car price per hour

    const navigate = useNavigate(); // Initialize useNavigate

    useEffect(() => {
        const fetchData = async () => {
            try {
                const usersResponse = await fetch(
                    `http://localhost:3000/users?isLoggedIn=true`
                );
                if (!usersResponse.ok) {
                    throw new Error("Failed to fetch users data");
                }
                const usersData = await usersResponse.json();
                if (usersData.length === 0) {
                    throw new Error("No logged-in user found");
                }
                const loggedInUser = usersData[0];

                const bookingsResponse = await fetch(
                    `http://localhost:3000/booking?userId=${loggedInUser.id}`
                );
                if (!bookingsResponse.ok) {
                    throw new Error("Failed to fetch booking data");
                }
                const bookings = await bookingsResponse.json();
                const latestBooking =
                    bookings.length > 0 ? bookings[bookings.length - 1] : null;
                console.log(latestBooking);

                if (latestBooking) {
                    setBookingId(latestBooking.id);

                    const pickupDateTime = new Date(
                        latestBooking.pickUpDateTime
                    );
                    const dropoffDateTime = new Date(
                        latestBooking.dropOffDateTime
                    );

                    setPickupDateTime(
                        pickupDateTime.toLocaleString("en-US", {
                            timeZone: "Asia/Kolkata", // Set your desired time zone here
                            hour12: true,
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                        })
                    );
                    setDropoffDateTime(
                        dropoffDateTime.toLocaleString("en-US", {
                            timeZone: "Asia/Kolkata", // Set your desired time zone here
                            hour12: true,
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                        })
                    );

                    setPickupLocation(latestBooking.pickUpLocation);
                    setDropoffLocation(latestBooking.dropOffLocation);

                    const carResponse = await fetch(
                        `http://localhost:3000/cars/${carId}`
                    );
                    if (!carResponse.ok) {
                        throw new Error("Failed to fetch car data");
                    }
                    const carData = await carResponse.json();
                    setCarName(carData.name);

                    const hoursDiff = calculateHoursDifference(
                        latestBooking.pickUpDateTime,
                        latestBooking.dropOffDateTime
                    );
                    setHoursDifference(hoursDiff);

                    const pricePerHour = parseFloat(
                        carPrice.replace(/\D/g, "")
                    );
                    setCarPricePerHour(pricePerHour);

                    const initialTotalPrice = calculateTotalPrice(
                        pricePerHour,
                        hoursDiff
                    );
                    setTotalPrice(initialTotalPrice);
                }
            } catch (error) {
                console.error("Error:", error.message);
            }
        };

        fetchData();
    }, [carId, carPrice]);

    const calculateHoursDifference = (pickup, dropoff) => {
        const pickupDate = new Date(pickup);
        const dropoffDate = new Date(dropoff);
        const difference = Math.abs(dropoffDate - pickupDate);
        return Math.ceil(difference / (1000 * 60 * 60));
    };

    const calculateTotalPrice = (pricePerHour, hoursDifference) => {
        return (pricePerHour * hoursDifference).toFixed(2);
    };

    const handleHireDriver = () => {
        setHireDriver((prev) => {
            const newHireDriver = !prev;
            const updatedPrice = newHireDriver
                ? (totalPrice * 1.1).toFixed(2)
                : (totalPrice / 1.1).toFixed(2);
            setTotalPrice(updatedPrice);
            return newHireDriver;
        });
    };

    const handleHomeDelivery = () => {
        setHomeDelivery((prev) => {
            const newHomeDelivery = !prev;
            const updatedPrice = newHomeDelivery
                ? (parseFloat(totalPrice) + 150).toFixed(2)
                : (parseFloat(totalPrice) - 150).toFixed(2);
            setTotalPrice(updatedPrice);
            return newHomeDelivery;
        });
    };

    const handleBooking = async () => {
        try {
            const response = await fetch(
                `http://localhost:3000/booking/${bookingId}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        pickUpDateTime: pickupDateTime, // Use state value
                        dropOffDateTime: dropoffDateTime, // Use state value
                        pickUpLocation: pickupLocation, // Use state value
                        dropOffLocation: dropoffLocation, // Use state value
                        totalPrice,
                        carName,
                        status: "completed",
                    }),
                }
            );
            if (!response.ok) {
                throw new Error("Failed to update booking");
            }
            alert("Booking Updated!");
        } catch (error) {
            console.error("Error:", error.message);
        }
    };

    const handleCancelBooking = async () => {
        try {
            const response = await fetch(
                `http://localhost:3000/booking/${bookingId}`,
                {
                    method: "DELETE",
                }
            );
            if (!response.ok) {
                throw new Error("Failed to delete booking");
            }
            alert("Booking Cancelled!");
            navigate("/"); // Navigate to home page
        } catch (error) {
            console.error("Error:", error.message);
        }
    };

    return (
        <div className={styles["sidebar"]}>
            <h3>Booking Details</h3>
            <p className={styles["car-name"]}>Car: {carName}</p>

            <div className={styles["detail-item"]}>
                <label>Pickup Date:</label>
                <p className={styles["detail-value"]}>{pickupDateTime}</p>
            </div>

            <div className={styles["detail-item"]}>
                <label>Dropoff Date:</label>
                <p className={styles["detail-value"]}>{dropoffDateTime}</p>
            </div>

            <div className={styles["detail-item"]}>
                <label>Pickup Location:</label>
                <p className={styles["detail-value"]}>{pickupLocation}</p>
            </div>

            <div className={styles["detail-item"]}>
                <label>Dropoff Location:</label>
                <p className={styles["detail-value"]}>{dropoffLocation}</p>
            </div>

            <div className={styles["detail-item"]}>
                <label>Number of Hours:</label>
                <p className={styles["detail-value"]}>{hoursDifference}</p>
            </div>

            <div className={styles["detail-item"]}>
                <label>Price Per Hour:</label>
                <p className={styles["detail-value"]}>
                    &#8377;{carPricePerHour}
                </p>
            </div>

            <div className={styles["option-buttons"]}>
                <button
                    className={hireDriver ? styles["selected"] : ""}
                    onClick={handleHireDriver}
                >
                    Hire a Driver
                </button>
                <button
                    className={homeDelivery ? styles["selected"] : ""}
                    onClick={handleHomeDelivery}
                >
                    Home Delivery
                </button>
            </div>

            <div className={styles["total-price"]}>
                Total Price: &#8377;{totalPrice}
            </div>

            <button className={styles["book-button"]} onClick={handleBooking}>
                Complete Booking
            </button>
            <button
                className={styles["cancel-button"]}
                onClick={handleCancelBooking}
            >
                Cancel Booking
            </button>
        </div>
    );
};

export default Booking;
