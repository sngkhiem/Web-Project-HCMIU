import React, { useState, useEffect } from 'react'
import { useParams } from "react-router-dom";

import { Link } from 'react-router-dom'
import { useVideoStore } from '../stores/useVideoStore';

const WatchPage = () => {
    const { id } = useParams(); // Get video ID from URL

    const { video, fetchVideo } = useVideoStore();

    // Fetch video details when the component mounts
    useEffect(() => {
        fetchVideo(id);
    }, [id, fetchVideo]);

    console.log("Video is " + video)

    return (
        <div>
            <div className="relative flex items-center justify-center py-12 bg-black">
                {/* Dark overlay */}
                <div className="absolute inset-0 bg-black/60 z-10"></div>
                
                {/* Background image */}
                <div 
                    className="absolute inset-0 bg-[url('/assets/hero.jpg')] bg-cover bg-center"
                    style={{
                        backgroundImage: "linear-gradient(to bottom, rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url('/assets/hero.jpg')"
                    }}
                ></div>

                {/* Content */}
                <div className="relative z-20 flex items-center justify-center w-full">
                    <iframe width="1120" height="630" src={`https://youtube.com/embed/${id}`} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                </div>
            </div>
        </div>
    )
}

export default WatchPage
