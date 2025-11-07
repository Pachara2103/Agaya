import React, { useState, useEffect } from "react";
import {FaStar} from "react-icons/fa";

export const StarRating = ({initialRating = 0, onRatingChange}) => {
    const [rating, setRating] = useState(initialRating);
    const [hover, setHover] = useState(null);

    useEffect(() => {
        setRating(initialRating);
    }, [initialRating]);

    return (
        <div className="flex space-x-1">
            {[...Array(5)].map((star, index) => {
                const ratingValue = index + 1;
                return (
                    <label key={index}>
                        <input
                            type="radio"
                            name="rating"
                            value={ratingValue}
                            onClick={() => {
                                setRating(ratingValue);
                                onRatingChange(ratingValue);
                            }}
                            className="hidden"
                        />
                        <FaStar
                            className="cursor-pointer"
                            color={ratingValue <= (hover || rating) ? "#ffc107" : "#e4e5e9"}
                            size={30}
                            onMouseEnter={() => setHover(ratingValue)}
                            onMouseLeave={() => setHover(null)}
                        />
                    </label>
                );
            })}
        </div>
    );
};