import React, { useState, useEffect } from 'react'
import { Link, useParams } from "react-router-dom";

import { useVideoStore } from '../stores/useVideoStore';

import Sidebar from '../components/Sidebar';
import { HeartIcon } from '@heroicons/react/24/outline';

const WatchPage = () => {
    const { id } = useParams(); // Get video ID from URL

    const { video, fetchVideo } = useVideoStore();

    // Fetch video details when the component mounts
    useEffect(() => {
        fetchVideo(id);
    }, [id, fetchVideo]);

    console.log("Video is " + video)

    return (
        <div className="" >
            <div className="flex">
                <div className="relative flex flex-col flex-1 gap-y-5 px-24 py-12 bg-black">               
                    {/* Content */}
                    <div>
                        <iframe width="960" height="540" src={`https://youtube.com/embed/${id}`} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                    </div>

                    <div className="flex flex-col gap-4">
                        <h1 className="text-2xl font-semibold text-white">Highlights 180p</h1>
                        <div className="flex justify-between">
                            <button className="p-3 bg-primary-gray hover:bg-purple-700 transition-colors rounded-lg cursor-pointer">
                                <HeartIcon className="h-5 text-white"/>
                            </button>
                            <span className="text-lg text-white">100,000 Views</span>
                        </div>
                    </div>

                    <div className="bg-primary-gray rounded-sm p-3">
                        <p className="text-white">Highlights 180p</p>
                    </div>
                </div>

                <Sidebar />
            </div>

        </div>
    )
}

export default WatchPage
