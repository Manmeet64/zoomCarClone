import React, { useState, useEffect, createContext } from "react";
import { differenceInHours } from "date-fns";
import "./Home.css";
import Navbar from "../components/Navbar";
import Car from "../components/Car";
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
    const [cars, setCars] = useState([]);

    // useEffect(() => {
    //     fetchData();
    // }, []);

    // const fetchData = async () => {
    //     try {
    //         const response = await fetch("http://localhost:3000/cars");
    //         if (response.ok) {
    //             const data = await response.json();
    //             console.log(data);
    //             setCars(data.slice(0, 6)); // Limit to six cars
    //         } else {
    //             console.error("Failed to fetch cars");
    //         }
    //     } catch (error) {
    //         console.error("Error fetching cars:", error);
    //     }
    // };

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
                        onClick={calculateHoursDifference}
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
