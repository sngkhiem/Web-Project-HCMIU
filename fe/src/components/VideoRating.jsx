import React, { useState } from 'react';

const VideoRating = ({ max = 5, onRate }) => {
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(null);
  
    const handleClick = (value) => {
        setRating(value);
        onRate?.(value); // optional callback to parent
    };

    return (
        <div className="flex gap-1">
            {[...Array(max)].map((_, index) => {
            const value = index + 1;
            return (
                <svg
                key={value}
                onClick={() => handleClick(value)}
                onMouseEnter={() => setHover(value)}
                onMouseLeave={() => setHover(null)}
                className={`w-5 h-5 cursor-pointer transition-colors duration-200 ${
                    (hover || rating) >= value ? 'text-yellow-400' : 'text-gray-300'
                }`}
                fill="currentColor"
                viewBox="0 0 20 20"
                >
                    <path d="M10 15l-5.878 3.09 1.122-6.545L.487 6.91l6.561-.955L10 0l2.952 5.955 6.561.955-4.757 4.635 1.122 6.545z" />
                </svg>
            );
            })}
        </div>
    )
}

export default VideoRating
