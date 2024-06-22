import React, { useContext } from "react";
import "./App.css"; // Replace with your CSS file
import Register from "./pages/Register";
import Login from "./pages/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CarSearch from "./pages/CarSearch";
// import Booking from "./Booking";
<Home />;

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/search" element={<CarSearch />} />
                {/* <Route path="/booking" element={<Booking} /> */}
            </Routes>
        </BrowserRouter>
    );
};

export default App;
