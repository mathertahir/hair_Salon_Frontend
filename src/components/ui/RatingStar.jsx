import React, { useState } from 'react';
import { FiStar } from 'react-icons/fi';

const RatingStar = ({ value = 0, onChange, readOnly = false, size = 24, color = '#fbbf24' }) => {
    const [hoveredStar, setHoveredStar] = useState(0);

    const handleStarClick = (starValue) => {
        if (!readOnly && onChange) {
            onChange(starValue);
        }
    };

    const handleStarHover = (starValue) => {
        if (!readOnly) {
            setHoveredStar(starValue);
        }
    };

    const handleMouseLeave = () => {
        if (!readOnly) {
            setHoveredStar(0);
        }
    };

    const displayValue = hoveredStar || value;

    return (
        <div
            className="flex items-center gap-1"
            onMouseLeave={handleMouseLeave}
        >
            {[1, 2, 3, 4, 5].map((star) => (
                <button
                    key={star}
                    type="button"
                    className={`transition-colors duration-200 ${!readOnly ? 'cursor-pointer hover:scale-110' : 'cursor-default'
                        }`}
                    onClick={() => handleStarClick(star)}
                    onMouseEnter={() => handleStarHover(star)}
                    disabled={readOnly}
                >
                    <FiStar
                        size={size}
                        color={star <= displayValue ? color : '#d1d5db'}
                        fill={star <= displayValue ? color : 'transparent'}
                    />
                </button>
            ))}
        </div>
    );
};

export default RatingStar;