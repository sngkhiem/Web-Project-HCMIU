import React, { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'

import { useVideoStore } from '../stores/useVideoStore'

import VideoThumbnail from '../components/VideoThumbnail';

import PlayIcon from '@heroicons/react/24/outline/PlayIcon'
import InformationCircleIcon from '@heroicons/react/24/outline/InformationCircleIcon'

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

const BrowsePage = () => {
    const { fetchAllVideos, videos, loading } = useVideoStore();
    console.log(videos);

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

            {/* Top Picks */}
            <div className="bg-black py-8">
                <h2 className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-3xl font-bold text-white mb-8">Top Picks</h2>
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <button
                        onClick={() => scroll(-400)}
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
                        onClick={() => scroll(400)}
                        className="absolute top-0 right-0 z-10 h-full px-2 cursor-pointer"
                    >
                        <ChevronRightIcon className="text-white h-10" />
                    </button>
                </div>
            </div>

            {/* Music*/}
            <div className="bg-black py-8">
                <h2 className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-3xl font-bold text-white mb-8">Music</h2>
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <button
                        onClick={() => scroll(-400)}
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
                        onClick={() => scroll(400)}
                        className="absolute top-0 right-0 z-10 h-full px-2 cursor-pointer"
                    >
                        <ChevronRightIcon className="text-white h-10" />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default BrowsePage
