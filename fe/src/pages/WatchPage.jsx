import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import toast from 'react-hot-toast';
import axios from "axios";

import { useUserStore } from '../stores/useUserStore';
import { useVideoStore } from '../stores/useVideoStore';
import { useCommentStore } from '../stores/useCommentStore';

import Sidebar from '../components/Sidebar';
import { StarIcon, ChevronUpIcon, ChevronDownIcon, TrashIcon } from '@heroicons/react/24/solid';
import { BookmarkIcon, HandThumbUpIcon, HandThumbDownIcon, FaceSmileIcon } from '@heroicons/react/24/outline';

import { formatDate } from "../config/format";

// import { Picker } from 'emoji-mart';
// import 'emoji-mart/css/emoji-mart.css';

const WatchPage = () => {
    const { id } = useParams(); // Get video ID from URL

    const { user } = useUserStore();
    const { video, loading, fetchVideo } = useVideoStore();
    const { videoComments, loadingComment, createComment, fetchCommentByVideo, deleteComment, createReply } = useCommentStore();

    const [userRating, setUserRating] = useState(0);
    const [isFocusedComment, setIsFocusedComment] = useState(false);
    const [isFocusedReply, setIsFocusedReply] = useState(false);
    const [newComment, setNewComment] = useState('')
    const [newReply, setNewReply] = useState('')
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [toggleReplies, setToggleReplies] = useState(null);
    const [replyToComment, setReplyToComment] = useState(null);

    useEffect(() => {
        fetchVideo(id);
    }, [id, fetchVideo]);

    useEffect(() => {
        fetchCommentByVideo(id);
    }, [id, fetchCommentByVideo]);

    const handleSubmitRating = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:8080/api/ratings", { videoId: video.id, userId: user.id, rating: userRating }, { withCredentials: true });
            toast.success("Rating submitted!");
            window.location.reload();
		} catch (err) {
            console.error('Error rating video: ' + err);
            toast.error('Could not rate video. Please try again.');
        }
    };

    const handleEmojiSelect = (emoji) => {
        setNewComment((prev) => prev + emoji.native);
    };

    const handleCancel = () => {
        setNewComment('');
        setShowEmojiPicker(false);
        setIsFocusedComment(false);
        setIsFocusedReply(false);
        setReplyToComment(null);
    };

    const handleSubmitComment = async (e) => {
		e.preventDefault();
		try {
			await createComment({ content: newComment, userId: user.id, videoId: video.id});
            toast.success('Comment posted successfully!');
			setNewComment('');
            setShowEmojiPicker(false);
            setIsFocusedComment(false);

            window.location.reload();
		} catch (err) {
			console.error('Error posting new comment: ' + err);
            toast.error('Could not post comment. Please try again.');
		}
    }

    const handleDeleteComment = async (commentId) => {
        try {
			await deleteComment(commentId);
            toast.success('Comment deleted successfully!');
		} catch (err) {
			console.error('Error deleting comment: ' + err);
            toast.error('Could not delete comment. Please try again.');
		}
    }

    const handleSubmitReply = async (e, commentId) => {
		e.preventDefault();
		try {
			await createReply({ content: newReply, userId: user.id, videoId: video.id, parentCommentId: commentId});
            toast.success('Reply posted successfully!');
			setNewReply('');
            setShowEmojiPicker(false);
            setIsFocusedReply(false);

            window.location.reload();
		} catch (err) {
			console.error('Error posting new reply: ' + err);
            toast.error('Could not post reply. Please try again.');
		}
    }

    return (
        <div className="" >
            <div className="lg:flex">
                <div className="relative flex flex-col flex-1 gap-y-5 px-5 lg:px-24 py-6 bg-pm-gray">               
                    {/* Video */}
                    {!loading ? (
                        <div className="relative w-full max-w-[1920px] pb-[56.25%] h-0 aspect-video">
                            <video className="absolute inset-0 w-full h-full" controls>
                                <source src={`../videos/${video.url}`} type="video/mp4" />
                            </video>
                        </div>
                    ) : (
                        <div className="text-white text-center py-10">Loading video...</div>
                    )}
    
                    <div className="flex flex-col gap-4 text-white">
                        <h1 className="text-2xl font-semibold">{video.title}</h1>
                        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                            {/* Video Interactions */}
                            <div className="flex items-center justify-between gap-5">
                                <button className="p-2 bg-se-gray hover:bg-purple-700 transition-colors rounded-full cursor-pointer">
                                    <BookmarkIcon className="h-5"/>
                                </button>

                                <form onSubmit={handleSubmitRating} className="flex gap-2">
                                    <select value={userRating} onChange={(e) => setUserRating(e.target.value)} className="p-2 bg-se-gray rounded-full cursor-pointer">
                                        {[1, 2, 3, 4, 5].map((num) => (
                                            <option key={num} value={num} className="cursor-pointer">{num} ⭐</option>
                                        ))}
                                    </select>
                                    <button type="submit" className="bg-se-gray px-3 py-2 text-md rounded-full hover:bg-pm-purple-hover transition cursor-pointer">Submit Rating</button>
                                </form>
                            </div>

                            {/* View & Rating Count */}
                            <div className="flex gap-5 font-semibold text-lg">
                                <span>10,000,000 Views</span>
                                <span className="flex gap-2">
                                    <StarIcon className="w-5" />
                                    {video.averageRating?.toFixed(1)} ({video.ratingCount} Ratings)
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Details Section */}
                    <div className="bg-se-gray text-white rounded-lg p-3">
                        {/* Category */}
                        <div className="flex items-center gap-3 font-semibold">
                            <span>{video.uploadDate}</span>
                            <div className="px-3 py-1 bg-pm-purple rounded-full">
                                <span>{video.categoryName}</span>
                            </div>
                        </div>

                        <p className="mt-2">{video.description}</p>
                    </div>

                    {/* Comment Section */}
                    <div className="flex flex-col gap-4">
                        <div className="flex justify-between items-center">
                            <span className="text-white text-lg font-semibold">{videoComments.length} Comment{videoComments.length > 1 ? 's' : ''}</span>
                        </div>

                        <div className="flex gap-3 mb-5">
                            <div>
                                <img src={"../assets/avatar.png"} alt="Avatar" className="h-12 w-12 object-cover rounded-full" />
                            </div>
                            
                            <form onSubmit={handleSubmitComment} className="flex-1 space-y-6">
                                <div>
                                    <input
                                        id="newComment"
                                        name="newComment"
                                        type="text"
                                        value={newComment}
                                        required
                                        placeholder="Enter your comment here..."
                                        onChange={(e) => setNewComment(e.target.value)}
                                        onFocus={() => setIsFocusedComment(true)}
                                        onBlur={(e) => {
                                            // Prevent closing when interacting with emoji picker or buttons
                                            setTimeout(() => {
                                                if (!document.activeElement.closest('.comment-actions')) {
                                                    setIsFocusedComment(false);
                                                    setShowEmojiPicker(false);
                                                }
                                            }, 100);
                                        }}
                                        className="w-full mb-2 py-1.5 text-base text-white outline-none border-b-1 border-primary-gray placeholder:text-gray-400 focus:border-b-2 focus:border-white transition-colors sm:text-sm/6"
                                    />

                                    {/* Emoji Picker & Buttons */}
                                    {isFocusedComment && (
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center p-2 rounded-full hover:bg-se-gray transition-colors">
                                                <button
                                                    type="button"
                                                    onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                                                    className="text-xl text-white cursor-pointer comment-actions"
                                                >
                                                    <FaceSmileIcon className="w-6 h-6" />
                                                </button>

                                                {showEmojiPicker && (
                                                <div className="mt-2">
                                                    <Picker onSelect={handleEmojiSelect} />
                                                </div>
                                                )}
                                            </div>

                                            <div className="flex items-center gap-3"> 
                                                <button
                                                    type="button"
                                                    onClick={handleCancel}
                                                    className="justify-center rounded-md px-5 py-1.5 text-sm/6 font-semibold text-white hover:bg-se-gray transition-colors cursor-pointer"
                                                >
                                                    Cancel
                                                </button>
                                                <button
                                                    type="submit"
                                                    disabled={loadingComment || !newComment.trim()}
                                                    className={`justify-center rounded-md px-5 py-1.5 text-sm/6 font-semibold
                                                        ${newComment.trim()
                                                            ? 'bg-pm-purple text-white hover:bg-purple-600 transition-colors'
                                                            : 'bg-primary-gray text-gray-600 transition-colors cursor-not-allowed'
                                                        } cursor-pointer`}
                                                >
                                                    {loadingComment ? 'Posting...' : 'Post'}
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </form>
                        </div>

                        {/* Comments */}
                        {videoComments.map((comment) => (
                            <div key={comment.id} className="mb-2 flex gap-5 text-white">
                                <img src={comment.avatar || "../assets/avatar.png"} alt={comment.username} className="h-12 w-12 object-cover rounded-full" />

                                <div className="flex flex-col gap-1">
                                    {/* User Details */}
                                    <div className="flex gap-3 items-center text-md">
                                        <h3 className="font-semibold">{comment.username}</h3>
                                        <span className="text-sm text-gray-600">{formatDate(comment.datePosted)}</span>
                                    </div>

                                    {/* Content */}
                                    <p className="text-md">{comment.content}</p>

                                    {/* Comment Interactions */}
                                    <div className="flex items-center gap-3 mt-1">
                                        {/* Like Button */}
                                        <div className="flex gap-2">
                                            <button className="cursor-pointer">
                                                <HandThumbUpIcon className="text-white w-5 hover:scale-110 transition" />
                                            </button>
                                            <span>0</span>
                                        </div>

                                        {/* Dislike Button */}
                                        <div className="flex gap-2">
                                            <button className="cursor-pointer">
                                                <HandThumbDownIcon className="text-white w-5 hover:scale-110 transition" />
                                            </button>
                                        </div>
                                        {/* Reply Button */}
                                        <button className="px-3 py-1 text-sm font-semibold text-white hover:bg-se-gray rounded-lg cursor-pointer" onClick={() =>setReplyToComment(replyToComment === comment.id ? null : comment.id)}>
                                            Reply
                                        </button>
                                    </div>

                                    {replyToComment === comment.id && (
                                        <div>
                                            <form onSubmit={(e) => handleSubmitReply(e, comment.id)} className="space-y-6">
                                                <div>
                                                    <input
                                                        id="newReply"
                                                        name="newReply"
                                                        type="text"
                                                        value={newReply}
                                                        required
                                                        placeholder="Enter your reply here..."
                                                        onChange={(e) => setNewReply(e.target.value)}
                                                        onFocus={() => setIsFocusedReply(true)}
                                                        onBlur={(e) => {
                                                            // Prevent closing when interacting with emoji picker or buttons
                                                            setTimeout(() => {
                                                                if (!document.activeElement.closest('.comment-actions')) {
                                                                    setIsFocusedReply(false);
                                                                    setShowEmojiPicker(false);
                                                                }
                                                            }, 100);
                                                        }}
                                                        className="w-full mb-2 py-1.5 text-base text-white outline-none border-b-1 border-primary-gray placeholder:text-gray-400 focus:border-b-2 focus:border-white transition-colors sm:text-sm/6"
                                                    />

                                                    {/* Emoji Picker & Buttons */}
                                                    {isFocusedReply && (
                                                        <div className="flex items-center justify-between">
                                                            <div className="flex items-center p-2 rounded-full hover:bg-primary-gray transition-colors">
                                                                <button
                                                                    type="button"
                                                                    onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                                                                    className="text-xl text-white cursor-pointer comment-actions"
                                                                >
                                                                    <FaceSmileIcon className="w-6 h-6" />
                                                                </button>

                                                                {showEmojiPicker && (
                                                                <div className="mt-2">
                                                                    <Picker onSelect={handleEmojiSelect} />
                                                                </div>
                                                                )}
                                                            </div>

                                                            <div className="flex items-center gap-3"> 
                                                                <button
                                                                    type="button"
                                                                    onClick={handleCancel}
                                                                    className="justify-center rounded-md px-5 py-1.5 text-sm/6 font-semibold text-white hover:bg-primary-gray transition-colors cursor-pointer"
                                                                >
                                                                    Cancel
                                                                </button>
                                                                <button
                                                                    type="submit"
                                                                    disabled={loadingComment || !newReply.trim()}
                                                                    className={`justify-center rounded-md px-5 py-1.5 text-sm/6 font-semibold
                                                                        ${newReply.trim()
                                                                            ? 'bg-pm-purple text-white hover:bg-purple-600 transition-colors'
                                                                            : 'bg-primary-gray text-gray-600 transition-colors cursor-not-allowed'
                                                                        } cursor-pointer`}
                                                                >
                                                                    {loadingComment ? 'Posting...' : 'Post'}
                                                                </button>
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            </form>
                                        </div>
                                    )}

                                    {/* Number of Replies */}
                                    {comment.replies?.length > 0 && (
                                        <button className="px-2 py-1 mt-2 flex w-fit items-center justify-center gap-2 hover:bg-pm-purple-hover rounded-full transition-colors cursor-pointer" onClick={() =>setToggleReplies(toggleReplies === comment.id ? null : comment.id)}>
                                            {toggleReplies === comment.id ? <ChevronUpIcon className="h-5 text-pm-purple" /> : <ChevronDownIcon className="h-5 text-pm-purple" />}
                                            <span className="text-pm-purple">{comment.replies.length} Replies</span>
                                        </button>
                                    )}

                                    {toggleReplies === comment.id && (
                                        <div className="flex flex-col gap-2">
                                            {comment.replies.map((reply) => {
                                                return (
                                                    <div key={reply.id} className="py-1 flex gap-5">
                                                        <img src={reply.avatar || "../assets/avatar.png"} alt={reply.username} className="h-12 w-12 object-cover rounded-full" />

                                                        <div className="flex flex-col gap-1">
                                                            {/* User Details */}
                                                            <div className="flex gap-3 items-center">
                                                                <h3 className="text-md font-semibold text-white">{reply.username}</h3>
                                                                <span className="text-md text-gray-600">{formatDate(reply.datePosted)}</span>
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
                                                            </div>
                                                        </div>

                                                        {user.id === reply.userId && (
                                                            <div className="ml-auto">
                                                                <button className="p-2 rounded-full hover:bg-red-400 transition-colors cursor-pointer" >
                                                                    <TrashIcon className="w-5 text-white" />
                                                                </button>
                                                            </div>
                                                        )}
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    )}
                                </div>

                                {user.id === comment.userId && (
                                    <div className="ml-auto">
                                        <button className="p-2 rounded-full hover:bg-red-400 transition-colors cursor-pointer">
                                            <TrashIcon className="w-5 text-white" />
                                        </button>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                <Sidebar />
            </div>
        </div>
    )
}

export default WatchPage
