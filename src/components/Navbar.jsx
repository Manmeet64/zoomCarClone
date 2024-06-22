import React, { useContext } from "react";
import "./Navbar.css";
const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="navbar-left">
                <a href="/">Home</a>
                <a href="/drivers">Drivers</a>
                <a href="/about">About Us</a>
            </div>
            <div className="navbar-logo">
                <a href="/">LOGO</a>
            </div>
            <div className="navbar-right">
                <input
                    type="text"
                    placeholder="Search"
                    className="search-input"
                />
                <a href="/signup">Sign Up</a>
                <a href="/login">Login</a>
            </div>
        </nav>
    );
};

export default Navbar;
