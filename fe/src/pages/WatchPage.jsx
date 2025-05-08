import React, { useState, useEffect } from 'react'
import { Link, useParams } from "react-router-dom";

import { useVideoStore } from '../stores/useVideoStore';

import Sidebar from '../components/Sidebar';
import { StarIcon, ChevronDownIcon, ListBulletIcon } from '@heroicons/react/24/solid';
import { HeartIcon, HandThumbUpIcon, HandThumbDownIcon } from '@heroicons/react/24/outline';

import VideoRating from "../components/VideoRating"

const WatchPage = () => {
    const { id } = useParams(); // Get video ID from URL

    const { video, loading, fetchVideo } = useVideoStore();

    const [comment, setComment] = useState("")

    // Fetch video details when the component mounts
    useEffect(() => {
        fetchVideo(id);
    }, [id, fetchVideo]);

    console.log("Video is " + video)

    const handleRating = (value) => {
        console.log('Rated:', value);
        // Here you can save to backend or localStorage
    };

    const handleSubmitComment = (e) => {
        e.preventDefault();
    }

    return (
        <div className="" >
            <div className="lg:flex">
                <div className="relative flex flex-col flex-1 gap-y-5 px-3 lg:px-24 py-12 bg-black">               
                    {/* Content */}
                    <div className="relative w-full pb-[56.25%] h-0">
                        <iframe className="absolute top-0 left-0 w-full h-full rounded-lg" src={`https://youtube.com/embed/${id}`} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                    </div>

                    <div className="flex flex-col gap-4">
                        <h1 className="text-2xl font-semibold text-white">Highlights 180p</h1>
                        <div className="flex items-center justify-between">
                            {/* Video Interactions */}
                            <div className="flex items-center gap-2">
                                <button className="p-3 bg-primary-gray hover:bg-purple-700 transition-colors rounded-lg cursor-pointer">
                                    <HeartIcon className="h-5 text-white"/>
                                </button>

                                <button className="p-3 bg-primary-gray hover:bg-purple-700 transition-colors rounded-lg cursor-pointer">
                                    <ListBulletIcon className="h-5 text-white"/>
                                </button>

                                <VideoRating onRate={handleRating} />
                            </div>

                            {/* View Count */}
                            <div className="flex flex-col">
                                <span className="text-lg text-white">10,000,000 Views</span>
                                <span className="flex gap-2 text-lg text-white">
                                    <StarIcon className="w-5" />
                                    4.7 (100 Ratings)</span>
                            </div>
                        </div>
                    </div>

                    {/* Description */}
                    <div className="bg-primary-gray rounded-sm p-3">
                        {/* Tags */}
                        <div className="flex gap-2">
                            <div className="px-3 py-1 bg-gray-100 rounded-full">
                                <span className="font-semibold">Music</span>
                            </div>
                            <div className="px-3 py-1 bg-gray-100 rounded-full">
                                <span className="font-semibold">Entertainment</span>
                            </div>
                        </div>

                        <p className="mt-2 text-white">Highlights 180p</p>
                    </div>

                    <div className="flex flex-col gap-4">
                        <div className="flex justify-between items-center">
                            <span className="text-white text-lg font-semibold">10,000 Comments</span>
                        </div>

                        <div>
                            <form onSubmit={handleSubmitComment} className="space-y-6">
                                <div className="flex items-center gap-3">
                                    <input
                                        id="comment"
                                        name="comment"
                                        type="text"
                                        value={comment}
                                        required
                                        placeholder="Enter your comment here..."
                                        onChange={(e) => setComment(e.target.value)}
                                        className="w-full py-1.5 text-base text-white outline-none border-b-1 border-primary-gray placeholder:text-gray-400 focus:border-b-2 focus:border-white transition-colors sm:text-sm/6"
                                    />
                                    <button
                                        type="submit"
                                        className="justify-center rounded-md bg-primary-gray px-3 py-1.5 text-sm/6 font-semibold text-white hover:opacity-70 transition-opacity cursor-pointer"
                                    >
                                        Submit
                                    </button>
                                </div>
                            </form>
                        </div>

                        <div className="py-2 flex gap-5">
                            <img src="https://media.istockphoto.com/id/1437816897/photo/business-woman-manager-or-human-resources-portrait-for-career-success-company-we-are-hiring.jpg?s=612x612&w=0&k=20&c=tyLvtzutRh22j9GqSGI33Z4HpIwv9vL_MZw_xOE19NQ=" alt="" className="h-12 w-12 object-cover rounded-full" />

                            <div className="flex flex-col gap-2">
                                {/* User Details */}
                                <div className="flex gap-3 items-center">
                                    <h3 className="text-md font-semibold text-white">Bryan Burnett</h3>
                                    <span className="text-md text-gray-700">2025-05-07</span>
                                </div>

                                {/* Comment */}
                                <p className="text-md text-white">Nice video, I like it</p>

                                {/* Comment Interactions */}
                                <div className="flex items-center gap-3">
                                    {/* Like Button */}
                                    <div className="flex gap-2">
                                        <button className="cursor-pointer">
                                            <HandThumbUpIcon className="text-white w-5" />
                                        </button>
                                        <span className="text-white">500</span>
                                    </div>

                                    {/* Dislike Button */}
                                    <div className="flex gap-2">
                                        <button className="cursor-pointer">
                                            <HandThumbDownIcon className="text-white w-5" />
                                        </button>
                                    </div>

                                    {/* Reply Button */}
                                    <button className="px-3 py-1 text-sm font-semibold text-white hover:bg-primary-gray rounded-lg cursor-pointer">
                                        Reply
                                    </button>
                                </div>

                                {/* Number of Replies */}
                                <button className="px-2 py-1 flex w-fit items-center justify-center gap-2 hover:bg-blue-100 rounded-full transition-colors cursor-pointer">
                                    <ChevronDownIcon className="h-5 text-blue-400" />
                                    <span className="text-blue-400">250 Replies</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <Sidebar />
            </div>

        </div>
    )
}

export default WatchPage
