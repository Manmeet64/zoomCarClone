import React, { useState } from "react";
import "./Login.css"; // Import the CSS file
import { Link } from "react-router-dom";

const Login = () => {
    const [mobile, setMobile] = useState("");
    const [message, setMessage] = useState("");
    const [showGetStarted, setShowGetStarted] = useState(false);

    const handleInputChange = (e) => {
        setMobile(e.target.value);
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setMessage(""); // Clear previous messages
        setShowGetStarted(false); // Reset the "Get Started" button visibility

        try {
            const response = await fetch("http://localhost:3000/users");
            if (response.ok) {
                const users = await response.json();
                console.log(users);
                const user = users.find((user) => user.mobile === mobile);
                if (user) {
                    setMessage("Logged in successfully!");
                    setShowGetStarted(false); // Hide the "Get Started" button
                } else {
                    setMessage("Account not found.");
                    setShowGetStarted(true); // Show the "Get Started" button
                }
            } else {
                setMessage("Failed to fetch user data.");
            }
        } catch (error) {
            console.error("Error fetching user data:", error);
            setMessage("An error occurred while fetching user data.");
        }
    };

    return (
        <div className="login-container">
            <form onSubmit={handleLogin} className="login-form">
                <h2>Login</h2>
                <div className="input-group">
                    <label htmlFor="mobile">Mobile:</label>
                    <input
                        type="text"
                        id="mobile"
                        name="mobile"
                        value={mobile}
                        onChange={handleInputChange}
                        pattern="[0-9]{10}"
                        title="Enter a 10-digit mobile number."
                        required
                    />
                </div>
                <button type="submit" className="login-button">
                    Login
                </button>
                {message && <p className="login-message">{message}</p>}
                {showGetStarted && (
                    <Link to="/register" className="get-started-link">
                        <button type="button" className="get-started-button">
                            Get Started
                        </button>
                    </Link>
                )}
            </form>
        </div>
    );
};

export default Login;
