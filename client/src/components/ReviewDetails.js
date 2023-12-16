// src/components/ReviewDetails.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import "../Styles/reviewDets.css";

const ReviewDetails = () => {
    const { id } = useParams();
    const [reviewDetails, setReviewDetails] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:5000/review/${id}`)
            .then(response => response.json())
            .then(data => setReviewDetails(data))
            .catch(error => console.error('Error fetching review details:', error));
    }, [id]);

    if (!reviewDetails) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            <section>
                <div className='container'>
                    <h1>Additional Review Details</h1>
                    <div className='card-details'>
                        <p>Food Rating: {reviewDetails.food_rating}/5</p><br/>
                        <p>Service Rating: {reviewDetails.service_rating}/5</p><br/>
                        <p>Atmosphere Rating: {reviewDetails.atmosphere_rating}/5</p><br/>
                        <p>Recommended Dishes: {reviewDetails.recommended_dishes}</p><br/>
                        <p>Recommendation for Vegetarians: {reviewDetails.recommendation_for_vegetarians}</p><br/>
                        <p>Parking Space: {reviewDetails.parking_space}</p><br/>
                        <p>Parking Options: {reviewDetails.parking_options}</p><br/>
                        {/* Add more details as needed */}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ReviewDetails;
