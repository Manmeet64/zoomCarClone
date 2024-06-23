import React, { useState, useEffect } from "react";
import styles from "./ProfileSidebar.module.css";
import { useNavigate } from "react-router-dom";

const ProfileSidebar = ({ userId }) => {
    let navigate = useNavigate();
    const [userData, setUserData] = useState({
        id: "",
        name: "",
        profileImagePath: "",
        isLoggedIn: false,
    });

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch(
                    "http://localhost:3000/users?isLoggedIn=true"
                );
                if (!response.ok) {
                    throw new Error("Failed to fetch user data");
                }
                const userDataList = await response.json();
                if (userDataList.length === 0) {
                    throw new Error("No logged-in user found");
                }
                const loggedInUser = userDataList[0];
                setUserData(loggedInUser);
            } catch (error) {
                console.error("Error fetching user data:", error.message);
            }
        };

        fetchUserData();
    }, []);

    const handleSignOut = () => {
        // Implement sign out logic here
        // For demonstration, clear user data and redirect to home page
        setUserData({
            id: "",
            name: "",
            profileImagePath: "",
            isLoggedIn: false,
        });
        window.location.href = "/"; // Redirect to home page
    };

    return (
        <div className={styles.sidebar}>
            <div className={styles.profile}>
                <img
                    src={userData.profileImagePath}
                    alt="Profile"
                    className={styles.profileImage}
                />
            </div>
            <div className={styles.options}>
                <p className={styles.username}>{userData.name}</p>
                <ul className={styles.nav}>
                    <li className={styles.navItem}>
                        <a
                            onClick={() => {
                                navigate(`/orders/${userData.id}`);
                            }}
                            className={styles.navLink}
                        >
                            My Orders
                        </a>
                    </li>
                    <li className={styles.navItem}>
                        <button
                            className={styles.signOutButton}
                            onClick={handleSignOut}
                        >
                            Sign Out
                        </button>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default ProfileSidebar;
