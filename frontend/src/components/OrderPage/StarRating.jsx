import React, { useState } from "react";
import {FaStar} from "react-icons/fa";

export const StarRating = ({onRatingChange}) => {
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(null);
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