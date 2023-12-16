// src/components/ReviewList.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ReplyForm from './ReplyForm';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import "../Styles/review.css";
import { useNavigate } from 'react-router-dom';

const ReviewList = () => {
    {/*const reviewId = 1;*/}
    const navigate = useNavigate();
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/reviews')
            .then(response => response.json())
            .then(data => setReviews(data));
    }, []);

    const handleReplyButtonClick = (reviewId) => {
        navigate(`/reply/${reviewId}`);
    };

    const handleViewDetailsButtonClick = (reviewId) => {
        navigate(`/details/${reviewId}`);
    };

    const renderStars = (rating) => {
        const stars = [];
        for (let i = 0; i < rating; i++) {
            stars.push(<FontAwesomeIcon key={i} icon={faStar} />);
        }
        return stars;
    };

    return (
        <div>
            <section>
                <div className='container'>
                    <h1>Reviews</h1>
                    <div className='cards'>
                    {reviews.map(review => ( 
                        <div key={review.id} className='card'>
                            <div className="rating">{renderStars(review.rating)}</div>
                            <h3>{review.author}</h3>
                            <p>Email: {review.email}</p>
                            <p>{review.text}</p> 
                            <div className='buttons'>
                                <button className='btn' onClick={() => handleReplyButtonClick(review.id)}>Reply</button>
                                <button className='btn' onClick={() => handleViewDetailsButtonClick(review.id)}>View Details</button>
                            </div>
                        </div>         
                    ))}
                    </div>
                </div>
            </section>  
        </div>   
    );
};

export default ReviewList;
