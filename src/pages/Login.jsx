import React, { useState } from "react";
import "./Login.css"; // Import the CSS file
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
    const navigate = useNavigate();
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

                // Check if there is already a logged-in user
                const loggedInUser = users.find((user) => user.isLoggedIn);
                if (loggedInUser) {
                    setMessage("You are already logged in.");
                    navigate("/"); // Navigate to home page
                    return;
                }

                // Proceed with login attempt if no one is logged in
                const user = users.find((user) => user.mobile === mobile);
                if (user) {
                    await updateUserLoginStatus(user.id, true);
                    setMessage("Logged in successfully!");
                    setShowGetStarted(false); //Hide the show button
                    navigate("/");
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

    const updateUserLoginStatus = async (userId, status) => {
        try {
            // Fetch existing user data
            const userResponse = await fetch(
                `http://localhost:3000/users/${userId}`
            );
            if (userResponse.ok) {
                const userData = await userResponse.json();

                // Update only the isLoggedIn property
                const updatedUserData = { ...userData, isLoggedIn: status };

                // Send the updated user data back to the server
                const updateResponse = await fetch(
                    `http://localhost:3000/users/${userId}`,
                    {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(updatedUserData),
                    }
                );

                if (!updateResponse.ok) {
                    console.error("Failed to update user login status");
                    setMessage("Failed to update login status.");
                }
            } else {
                console.error("Failed to fetch user details for updating");
                setMessage("Failed to fetch user details for updating.");
            }
        } catch (error) {
            console.error("Error updating user login status:", error);
            setMessage("An error occurred while updating login status.");
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
