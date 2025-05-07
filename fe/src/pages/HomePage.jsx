import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';

import VideoThumbnail from '../components/VideoThumbnail';

import { useVideoStore } from '../stores/useVideoStore';
import { useUserStore } from '../stores/useUserStore';

import ArrowRightIcon from '@heroicons/react/24/outline/ArrowRightIcon';
import SearchCard from '../components/SearchCard';

import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid"

const videoIds = [
    {
        id: 1,
        title: "NGỰA Ô - TeuYungBoy, Dangrangto (Prod. DONAL) | Official MV",
        description: "Music video of NGỰA Ô",
        videoId: "cm0C1c2UuQA"
    },
    {
        id: 2,
        title: "2GOILAYS - DMT, Dangrangto, TeuYungBoy (Prod. DONAL) | Official MV",
        description: "Music video of 2GOILAYS",
        videoId: "ILsA2VFJ150"
    },
    {
        id: 3,
        title: "DONALD GOLD - ADAMN [OFFICIAL MV]",
        description: "Music video of ADAMN",
        videoId: "B3wR-ZVe0Rw"
    },
    {
        id: 4,
        title: "DONALD GOLD - ĐỔI TƯ THẾ x ANDREE RIGHT HAND | OFFICIAL MUSIC VIDEO",
        description: "Music video of Đổi Tư Thế",
        videoId: "wkMwq6NUUmM"
    },
    {
        id: 5,
        title: "HIEUTHUHAI - TRÌNH (prod. by Kewtiie)",
        description: "Music video of TRÌNH",
        videoId: "7kO_ALcwNAw"
    },
    {
        id: 6,
        title: "THANHDRAW - IDOOMYTHANG // Official Music Video",
        description: "Music video of IDOOMYTHANG",
        videoId: "rAJnKTZAGsU"
    },
    {
        id: 7,
        title: "HIEUTHUHAI - Không Thể Say (prod. by Kewtiie) [Official Lyric Video]",
        description: "Music video of Không Thể Say",
        videoId: "d6pgocXnK8U"
    }
];

const reasons = [
    {
        icon: <ArrowRightIcon className="w-8 h-8 text-rose-500" />,
        name: 'Cancel or switch plans anytime',
        description: 'Flexible subscription options that adapt to your needs'
    },
    {
        icon: <ArrowRightIcon className="w-8 h-8 text-rose-500" />,
        name: 'A safe place just for kids',
        description: 'Family-friendly content with parental controls'
    },
    {
        icon: <ArrowRightIcon className="w-8 h-8 text-rose-500" />,
        name: 'Download your shows to watch offline',
        description: 'Save your favorites easily and always have something to watch'
    }
]

const HomePage = () => {
    const { fetchAllVideos, videos, loading } = useVideoStore();
    const { user } = useUserStore();
    const [email, setEmail] = useState('');

    useEffect(() => {
        fetchAllVideos();
    }, [fetchAllVideos]);
    
    const scrollRef = useRef(null);

    const scroll = (offset) => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({ left: offset, behavior: "smooth" });
        }
    };

    return (
        <div>
            <div className="relative">
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
                <div className="relative z-20 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center">
                    <div>
                        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 leading-[1.1]">
                            Find what you want, watch what you like.
                        </h1>
                        <p className="text-lg sm:text-xl text-gray-300 mb-8">
                            The video streaming service that's <span className="text-purple-500">right for you.</span>
                        </p>
                    </div>

                    <div>
                        <p className="text-md sm:text-lg text-gray-300 mb-6">
                            Ready to watch? Enter your email to create a new account.
                        </p>
                        <div className="flex justify-center gap-3">
                            <input
                                type="email"
                                placeholder="Email"
                                required={true}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full max-w-md px-5 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-50 bg-black-50 text-white"
                            />
                            <Link 
                                to={`/signup?email=${encodeURIComponent(email)}`} 
                                className="flex items-center gap-2 bg-purple-700 text-xl text-white px-8 py-3 rounded-full font-semibold hover:bg-purple-600 transition-colors whitespace-nowrap"
                            >
                                Get Started <ArrowRightIcon className="w-5 h-5" />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Trending Section */}
            <div className="bg-black py-16">
                <h2 className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-3xl font-bold text-white mb-8">Trending Now</h2>
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <button
                        onClick={() => scroll(-900)}
                        className="absolute top-0 left-0 z-10 h-full px-2 cursor-pointer"
                    >
                        <ChevronLeftIcon className="text-white h-10" />
                    </button>

                    <div ref={scrollRef} className="relative flex overflow-x-auto space-x-4 no-scrollbar scroll-smooth">
                        {videoIds.map(video => {
                            return (
                                <VideoThumbnail title={video.title} description={video.description} videoId={video.videoId} />
                            )
                        })}
                    </div>

                    <button
                        onClick={() => scroll(900)}
                        className="absolute top-0 right-0 z-10 h-full px-2 cursor-pointer"
                    >
                        <ChevronRightIcon className="text-white h-10" />
                    </button>
                </div>
            </div>

            <div className="bg-black py-16">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-white mb-8">Reasons to Join</h2>
                    
                    {/* Reasons to Join */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {reasons.map((reason, index) => (
                            <div key={index} className="bg-gray-900 rounded-lg p-6">
                                <div className="flex items-center justify-center mb-4">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-purple-700">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
                                    </svg>
                                </div>
                                <h3 className="text-lg text-white font-semibold text-center mb-2">{reason.name}</h3>
                                <p className="text-gray-400 text-center">{reason.description}</p>
                            </div>
                        ))}
                    </div>
                </div>                
            </div>
        </div>
    )
}

export default HomePage
