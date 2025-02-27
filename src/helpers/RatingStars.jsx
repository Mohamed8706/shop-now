import { memo } from "react";
import { faStarHalfStroke } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Star } from "lucide-react";

export const RatingStars = memo(function RatingStars({ rating }) {
    const oddRating = Math.floor(Math.min(rating, 5));

    const emptyStars = Array.from({ length: 5 - oddRating }).map((_, ind) => (
        <Star key={`empty-${ind}`} stroke="#ffc43f" className="w-6 h-6" />
    ));

    const fullStars = Array.from({ length: oddRating }).map((_, ind) => (
        <Star key={`full-${ind}`} fill="#ffc43f" stroke="#ffc43f" className="w-6 h-6" />
    ));

    const halfStars = rating % 2 > 0.4 ? [
        <FontAwesomeIcon 
            key="half-star" 
            icon={faStarHalfStroke} 
            color="#ffc43f" 
            size="xl" 
            className="w-6 h-6" 
        />
    ] : [];

    return rating % 2 === 0
        ? fullStars.concat(emptyStars)
        : fullStars.concat(halfStars).concat(emptyStars.slice(1)).slice(0, 5);
});
