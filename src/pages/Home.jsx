import React, { useState, useEffect, createContext } from "react";
import { differenceInHours } from "date-fns";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import Navbar from "../components/Navbar";
import CarList from "../components/CarList";
import ReviewComponent from "../components/ReviewComponent";

// Create and export the context
export const HourContext = createContext();

const Home = () => {
    const [pickUpLocation, setPickUpLocation] = useState("");
    const [pickUpDateTime, setPickUpDateTime] = useState("");
    const [dropOffLocation, setDropOffLocation] = useState("");
    const [dropOffDateTime, setDropOffDateTime] = useState("");
    const [hoursDifference, setHoursDifference] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        // Set default values for pickUpDateTime and dropOffDateTime to current date and time
        const currentDateTime = new Date().toISOString().slice(0, 16);
        setPickUpDateTime(currentDateTime);
        setDropOffDateTime(currentDateTime);

        // Fetch data from users endpoint
        fetchUsersData();
    }, []);

    const fetchUsersData = async () => {
        try {
            const response = await fetch("http://localhost:3000/users");
            if (response.ok) {
                const users = await response.json();
                // Find the user who is logged in
                const loggedInUser = users.find((user) => user.isLoggedIn);
                console.log(loggedInUser);
                if (loggedInUser) {
                    setCurrentUser(loggedInUser);
                    setIsLoggedIn(true);
                } else {
                    setIsLoggedIn(false);
                    console.warn("No user is currently logged in");
                }
            } else {
                console.error("Failed to fetch users");
            }
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    const calculateHoursDifference = () => {
        if (pickUpDateTime && dropOffDateTime) {
            const pickUpDate = new Date(pickUpDateTime);
            const dropOffDate = new Date(dropOffDateTime);
            const diffHours = differenceInHours(dropOffDate, pickUpDate);
            setHoursDifference(diffHours);
        } else {
            setHoursDifference(null);
        }
    };

    const handleFindVehicle = async () => {
        if (isLoggedIn && currentUser) {
            calculateHoursDifference();

            const bookingData = {
                bookingId: "",
                pickUpLocation,
                dropOffLocation,
                pickUpDateTime,
                dropOffDateTime,
                hoursDifference,
                status: "scheduled",
                carName: "",
                userId: currentUser?.id,
            };

            try {
                const response = await fetch("http://localhost:3000/booking", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(bookingData),
                });
                if (response.ok) {
                    console.log("Booking created successfully");
                    navigate("/search");
                } else {
                    console.error("Failed to create booking");
                }
            } catch (error) {
                console.error("Error creating booking:", error);
            }
        } else {
            alert("Please register yourself with us :)");
            navigate("/register");
        }
    };

    return (
        <>
            <HourContext.Provider
                value={{ hoursDifference, setHoursDifference }}
            >
                <Navbar />
                <div className="home-container">
                    <h2>Travel Details</h2>
                    <div className="input-group">
                        <label>Pick Up Location:</label>
                        <input
                            type="text"
                            value={pickUpLocation}
                            onChange={(e) => setPickUpLocation(e.target.value)}
                            className="input-field"
                        />
                    </div>
                    <div className="input-group">
                        <label>Pick Up Date and Time:</label>
                        <input
                            type="datetime-local"
                            value={pickUpDateTime}
                            onChange={(e) => setPickUpDateTime(e.target.value)}
                            className="input-field"
                        />
                    </div>
                    <div className="input-group">
                        <label>Drop Off Location:</label>
                        <input
                            type="text"
                            value={dropOffLocation}
                            onChange={(e) => setDropOffLocation(e.target.value)}
                            className="input-field"
                        />
                    </div>
                    <div className="input-group">
                        <label>Drop Off Date and Time:</label>
                        <input
                            type="datetime-local"
                            value={dropOffDateTime}
                            onChange={(e) => setDropOffDateTime(e.target.value)}
                            className="input-field"
                        />
                    </div>
                    <button
                        onClick={handleFindVehicle}
                        className="calculate-button"
                    >
                        Find a Vehicle
                    </button>
                </div>
                <CarList />
                <ReviewComponent />
            </HourContext.Provider>
        </>
    );
};

export default Home;
