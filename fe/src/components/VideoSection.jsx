import React, { useRef } from 'react'

import VideoThumbnail from './VideoThumbnail';
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

const VideoSection = () => {
    const scrollRef = useRef(null);

    const scroll = (offset) => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({ left: offset, behavior: "smooth" });
        }
    };

    return (
        <div className="bg-black py-16">
            <h2 className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-3xl font-bold text-white mb-4">Popular Music</h2>
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
                            <VideoThumbnail key={video.id} title={video.title} description={video.description} videoId={video.videoId} />
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
    )
}

export default VideoSection