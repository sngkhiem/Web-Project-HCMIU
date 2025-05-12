import React, { useState, useEffect } from 'react'
import { useParams } from "react-router-dom";

import { useUserStore } from '../stores/useUserStore';
import { useVideoStore } from '../stores/useVideoStore';
import { useCommentStore } from '../stores/useCommentStore';

import Sidebar from '../components/Sidebar';
import VideoRating from "../components/VideoRating"
import { StarIcon, ChevronUpIcon } from '@heroicons/react/24/solid';
import { BookmarkIcon, HandThumbUpIcon, HandThumbDownIcon } from '@heroicons/react/24/outline';

import { formatDate, formatTime } from "../config/format"

const WatchPage = () => {
    const { id } = useParams(); // Get video ID from URL

    const { user } = useUserStore();
    const { video, loading, fetchVideo } = useVideoStore();
    const { comment, fetchCommentByVideo } = useCommentStore();

    useEffect(() => {
        fetchVideo(id);
    }, [id, fetchVideo]);

    useEffect(() => {
        fetchCommentByVideo(id);
    }, [id, fetchCommentByVideo]);

    const handleRating = (value) => {
        console.log('Rated:', value);
    };

    const handleSubmitComment = (e) => {
        e.preventDefault();
    }

    return (
        <div className="" >
            <div className="lg:flex">
                <div className="relative flex flex-col flex-1 gap-y-5 px-3 lg:px-24 py-12 bg-black">               
                    {/* Video */}
                    {!loading ? (
                        <div className="relative w-full max-w-[1920px] pb-[56.25%] h-0 aspect-video">
                            <video className="absolute inset-0 w-full h-full" controls>
                                <source src={`../videos/${video.url}`} type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>
                        </div>
                    ) : (
                        <div className="text-white text-center py-10">Loading video...</div>
                    )}
    
                    <div className="flex flex-col gap-4">
                        <h1 className="text-2xl font-semibold text-white">{video.title}</h1>
                        <div className="flex items-center justify-between">
                            {/* Video Interactions */}
                            <div className="flex items-center gap-2">
                                <button className="p-3 bg-primary-gray hover:bg-purple-700 transition-colors rounded-lg cursor-pointer">
                                    <BookmarkIcon className="h-5 text-white"/>
                                </button>

                                <VideoRating onRate={handleRating} />
                            </div>

                            {/* View Count */}
                            <div className="flex flex-col">
                                <span className="text-lg text-white">10,000,000 Views</span>
                                <span className="flex gap-2 text-lg text-white">
                                    <StarIcon className="w-5" />
                                    {video.averageRating} ({video.ratingCount} Ratings)</span>
                            </div>
                        </div>
                    </div>

                    {/* Details Section */}
                    <div className="bg-primary-gray rounded-sm p-3">
                        {/* Category */}
                        <div className="flex items-center gap-2">
                            <span className="text-white font-semibold">{video.uploadDate}</span>
                            <div className="px-3 py-1 bg-gray-100 rounded-full">
                                <span className="font-semibold">{video.categoryName}</span>
                            </div>
                        </div>

                        <p className="mt-2 text-white">{video.description}</p>
                    </div>

                    {/* Comment Section */}
                    <div className="flex flex-col gap-4">
                        <div className="flex justify-between items-center">
                            <span className="text-white text-lg font-semibold">{comment.length} Comments</span>
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

                        {comment.map((cmt) => {
                            return (
                                <div key={cmt.id} className="py-2 flex gap-5">
                                    <img src={cmt.avatar || "./assets/avatar.png"} alt="" className="h-12 w-12 object-cover rounded-full" />
        
                                    <div className="flex flex-col gap-1">
                                        {/* User Details */}
                                        <div className="flex gap-3 items-center">
                                            <h3 className="text-md font-semibold text-white">{cmt.userId}</h3>
                                            <span className="text-md text-gray-700">{ccmt.uploadDate}</span>
                                        </div>
        
                                        {/* Comment */}
                                        <p className="text-md text-white">{cmt.content}</p>
        
                                        {/* Comment Interactions */}
                                        <div className="flex items-center gap-3 mt-1">
                                            {/* Like Button */}
                                            <div className="flex gap-2">
                                                <button className="cursor-pointer">
                                                    <HandThumbUpIcon className="text-white w-5" />
                                                </button>
                                                <span className="text-white">0</span>
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
                                        <button className="px-2 py-1 my-2 flex w-fit items-center justify-center gap-2 hover:bg-blue-100 rounded-full transition-colors cursor-pointer">
                                            <ChevronUpIcon className="h-5 text-blue-400" />
                                            <span className="text-blue-400">{cmt.replies.length} Replies</span>
                                        </button>

                                        <div className="flex flex-col gap-2">
                                            {cmt.replies.map((reply) => {
                                                return (
                                                    <div key={reply.id} className="py-1 flex gap-5">
                                                        <img src={reply.avatar} alt={reply.username} className="h-12 w-12 object-cover rounded-full" />
                            
                                                        <div className="flex flex-col gap-1">
                                                            {/* User Details */}
                                                            <div className="flex gap-3 items-center">
                                                                <h3 className="text-md font-semibold text-white">{reply.username}</h3>
                                                                <span className="text-md text-gray-700">{reply.date}</span>
                                                            </div>
                            
                                                            {/* Comment */}
                                                            <p className="text-md text-white">{reply.content}</p>
                            
                                                            {/* Comment Interactions */}
                                                            <div className="flex items-center gap-3 mt-1">
                                                                {/* Like Button */}
                                                                <div className="flex gap-2">
                                                                    <button className="cursor-pointer">
                                                                        <HandThumbUpIcon className="text-white w-5" />
                                                                    </button>
                                                                    <span className="text-white">{reply.likes}</span>
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
                                                        </div>
                                                    </div>
                                                )})}
                                            </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>

                <Sidebar />
            </div>
        </div>
    )
}

export default WatchPage
