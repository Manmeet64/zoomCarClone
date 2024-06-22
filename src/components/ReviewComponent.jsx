import React, { useState, useEffect } from "react";
import "./ReviewComponent.css"; // Import the CSS file for styling

const ReviewComponent = () => {
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        fetchReviews(); // Fetch reviews when component mounts
    }, []);

    const fetchReviews = async () => {
        try {
            const response = await fetch("http://localhost:3000/cars"); // Replace with your actual endpoint
            if (response.ok) {
                const data = await response.json();
                // Limit to 4 reviews
                const limitedReviews = data.slice(0, 4);
                console.log(data);
                setReviews(limitedReviews);
            } else {
                console.error("Failed to fetch reviews");
            }
        } catch (error) {
            console.error("Error fetching reviews:", error);
        }
    };

    return (
        <div className="review-container">
            {reviews.map((review, index) => (
                <div key={index} className="review-card">
                    <img
                        src={review.reviews[0].userimage}
                        alt="User"
                        className="user-image"
                    />
                    <div className="review-details">
                        <h3>{review.reviews[0].username}</h3>
                        <p>{review.reviews[0].review}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ReviewComponent;
