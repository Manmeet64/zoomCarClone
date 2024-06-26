import React, { useEffect, useState } from "react";
import styles from "./Navbar.module.css"; // Import styles from module.css
import { useNavigate } from "react-router-dom";

const Navbar = () => {
    const [loggedInUser, setLoggedInUser] = useState(null);
    let navigate = useNavigate();
    useEffect(() => {
        const fetchLoggedInUser = async () => {
            try {
                const response = await fetch("http://localhost:3000/users");
                if (response.ok) {
                    const users = await response.json();
                    const loggedInUser = users.find((user) => user.isLoggedIn);
                    if (loggedInUser) {
                        setLoggedInUser(loggedInUser);
                    }
                } else {
                    console.error("Failed to fetch users.");
                }
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };

        fetchLoggedInUser();
    }, []);

    return (
        <nav className={styles.navbar}>
            {" "}
            {/* Use styles.navbar for className */}
            <div className={styles["navbar-left"]}>
                {" "}
                {/* Use styles["classname"] for dynamic keys */}
                <a href="/">Home</a>
                <a href="/drivers">Drivers</a>
                <a href="/about">About Us</a>
            </div>
            <div className={styles["navbar-logo"]}>
                <a href="/">LOGO</a>
            </div>
            <div className={styles["navbar-right"]}>
                <input
                    type="text"
                    placeholder="Search"
                    className={styles["search-input"]}
                />
                {loggedInUser ? (
                    <span
                        className={styles["user-name"]}
                        onClick={() => {
                            navigate("/profile");
                        }}
                    >
                        {loggedInUser.name}
                    </span>
                ) : (
                    <>
                        <a href="/signup">Sign Up</a>
                        <a href="/login">Login</a>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
