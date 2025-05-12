import React from 'react';
import { Link } from "react-router-dom";

const VideoThumbnail = ({title, description, videoId}) => {
    const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;

    return (
        <div className="min-w-96 cursor-pointer">
            <Link to={`/watch/${videoId}`} className="relative">
                <img
                    src={thumbnailUrl}
                    alt="YouTube Video Thumbnail"
                    className="rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
                />

                {/* Black Overlay on Hover */}
                <div className="absolute inset-0 p-3 bg-black text-white opacity-0 hover:opacity-80 transition-opacity">
                    <h2 className="text-2xl font-bold mb-2">{title}</h2>
                    <p>{description}</p>
                </div>
            </Link>
        </div>
    )
}

export default VideoThumbnail
