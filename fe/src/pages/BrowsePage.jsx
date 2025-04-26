import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'

import { useVideoStore } from '../stores/useVideoStore'

import PlayIcon from '@heroicons/react/24/outline/PlayIcon'
import InformationCircleIcon from '@heroicons/react/24/outline/InformationCircleIcon'

const BrowsePage = () => {
    const { fetchAllVideos, videos, loading } = useVideoStore();
    console.log(videos);

    useEffect(() => {
        fetchAllVideos();
    }, [fetchAllVideos]);

    return (
        <div>
            <div className="relative h-[80vh] w-full overflow-hidden">
                {/* Video Background */}
                <div className="absolute inset-0 w-full h-full">
                    <div className="absolute inset-0 w-full h-full">
                        <iframe
                            className="absolute top-1/2 left-1/2 w-[300%] h-[300%] -translate-x-1/2 -translate-y-1/2"
                            src="https://www.youtube.com/embed/INQ20VdF9uQ?si=QROHiwtK3w7oqogQ&autoplay=1&mute=1&loop=1&playlist=INQ20VdF9uQ&controls=0&modestbranding=1&rel=0&showinfo=0&hd=1&vq=hd1080"
                            title="YouTube video player"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            referrerPolicy="strict-origin-when-cross-origin"
                            allowFullScreen
                        ></iframe>
                    </div>
                    {/* Gradient overlay */}
                    <div 
                        className="absolute inset-0"
                        style={{
                            background: 'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 100%)'
                        }}
                    ></div>
                </div>
                
                <div className="relative z-20 mx-auto max-w-7xl px-10 py-32">
                    <div className="w-1/2">
                        <div className="flex flex-col gap-y-2">
                            <h1 className="text-4xl font-bold text-white">Một Vòng Việt Nam</h1>
                        </div>
                        <p className="mt-4 text-gray-300">
                            "Một Vòng Việt Nam" là một ca khúc nổi bật do nhạc sĩ Đông Thiên Đức sáng tác, được ca sĩ Tùng Dương thể hiện và phát hành vào tháng 6 năm 2023. Bài hát được viết riêng cho chương trình du lịch và ẩm thực "Around Vietnam" phát sóng trên kênh VTV3, nhằm tôn vinh vẻ đẹp thiên nhiên và con người Việt Nam.
                        </p>

                        <div className="flex items-center gap-x-4 mt-8">
                            <Link to="/watch" className="flex items-center justify-center rounded-md bg-purple-700 px-6 py-2 text-md font-semibold text-white shadow-xs hover:bg-purple-600 transition-colors">
                                <PlayIcon className="w-6 h-6 mr-2" />
                                Play
                            </Link>
                            <button className="flex items-center justify-center rounded-md bg-white/20 px-6 py-2 text-md font-semibold text-white shadow-xs hover:bg-white/30 transition-colors">
                                <InformationCircleIcon className="w-6 h-6 mr-2" />
                                More Info
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* My List Section */}
            <div className="bg-black py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-white mb-8">My List</h2>
                        
                    <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4">
                        {/* Movie 1 */}
                        <div className="relative group cursor-pointer">
                            <div className="absolute top-0 left-[-15%] text-white text-7xl font-bold p-2 z-40">1</div>
                            <img 
                                src="./assets/movie1.jpg" 
                                alt="Movie 1"
                                className="w-full h-auto rounded transition-transform duration-300 group-hover:scale-105"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BrowsePage
