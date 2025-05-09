import React, { useEffect, useState, useRef } from 'react';
import { Link } from "react-router-dom";

import VideoSectionMain from './VideoSectionMain';

import { BookmarkIcon } from '@heroicons/react/24/outline';
import { PlayIcon } from '@heroicons/react/24/solid';

const images = [
    "https://motionbgs.com/media/2770/shadows-army-solo-leveling.jpg",
    "https://images5.alphacoders.com/137/1372162.jpeg",
    "https://images7.alphacoders.com/109/1094164.png",
];

const VideoCarousel = () => {
    const [current, setCurrent] = useState(0);
    const timeoutRef = useRef(null);
  
    const resetTimeout = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
    };
  
    useEffect(() => {
        resetTimeout();
        timeoutRef.current = setTimeout(() => {
            setCurrent((prevIndex) =>
                prevIndex === images.length - 1 ? 0 : prevIndex + 1
            );
        }, 10000);
    
        return () => {
            resetTimeout();
        };
    }, [current]);

    return (
        <div className="w-full overflow-hidden relative aspect-[4/3] md:aspect-[16/9]">
            <div
                className="flex transition-transform duration-700 ease-in-out"
                style={{ transform: `translateX(-${current * 100}%)`, width: `${images.length * 100}%` }}
            >
                {images.map((src, index) => (
                <div key={index} className="h-screen flex items-center justify-center flex-shrink-0">
                    <img
                        src={src}
                        alt={`Slide ${index + 1}`}
                    />
                </div>
                ))}
            </div>

            {/* Left overlay with text */}
            <div className="absolute top-0 left-0 h-full w-full bg-gradient-to-r from-black/90 via-black/40 to-transparent z-10">
                <div className="h-full w-1/2 flex mt-10 md:mt-30 px-10 md:px-44 text-white">
                    <div>
                        <h1 className="text-4xl md:text-6xl font-bold mb-4">
                            Solo Leveling
                        </h1>

                        <ul className="flex gap-x-2 mb-3">
                            <li className="w-fit px-3 py-1 bg-pm-purple font-semibold rounded-full">
                                16+
                            </li>
                            <li className="w-fit px-3 py-1 bg-pm-purple font-semibold rounded-full">
                                Action
                            </li>
                        </ul>

                        <p className="hidden md:block text-md md:text-lg text-gray-300 mb-6 max-w-md">
                            Enter the world of shadows and awaken your true power. Watch the latest episodes now.
                        </p>

                        {/* Buttons */}
                        <div className="flex items-stretch items-center gap-x-2 mb-10">
                            <Link to="#" className="flex items-center gap-x-2 bg-pm-purple hover:bg-pm-purple-hover transition-colors text-white font-semibold px-6 py-3 rounded">
                                <PlayIcon className="w-5" />
                                Watch Now
                            </Link>

                            <button className="border-2 border-pm-purple hover:border-pm-purple-hover hover:bg-pm-purple-hover transition-colors text-pm-purple hover:text-white font-semibold px-6 py-3 rounded cursor-pointer">
                                <BookmarkIcon className="w-5" />
                            </button>
                        </div>


                        {/* Line Indicators */}
                        <div className="flex space-x-2">
                            {images.map((_, index) => (
                                <div
                                    key={index}
                                    className={`w-8 h-2 rounded-full ${
                                        current === index ? "bg-white" : "bg-gray-400"
                                    }`}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom dark overlay */}
            <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black/100 to-transparent z-10 pointer-events-none" />

            <VideoSectionMain />
      </div>
    )
}

export default VideoCarousel
