import React, { createContext, useState, useContext } from "react";

export const HourContext = createContext(); // Create a new context

// Custom hook to consume the context
export const useHourContext = () => useContext(HourContext);

// Context provider component
export const HourContextProvider = ({ children }) => {
    const [hoursDifference, setHoursDifference] = useState(null); // State to hold hours difference

    return (
        <HourContext.Provider value={{ hoursDifference, setHoursDifference }}>
            {children}
        </HourContext.Provider>
    );
};
