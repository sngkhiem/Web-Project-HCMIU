import React from 'react';

import { StarIcon } from '@heroicons/react/24/solid';

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

const Sidebar = () => {
    return (
        <div className="lg:w-md bg-black text-white px-3 lg:pr-24 lg:py-12 overflow-y-auto">
            <ul>
                {videoIds.map((video) => (
                    <li key={video.id} className="flex space-x-3 hover:bg-primary-gray p-2 cursor-pointer">
                        <img src={`https://img.youtube.com/vi/${video.videoId}/0.jpg`} alt={video.title} className="w-[168px] h-[94px] object-cover flex-shrink-0 rounded-lg" />
                        <div>
                            <span className="text-md font-semibold line-clamp-2">{video.title}</span>
                            <span className="text-sm text-gray-400">1,000,000 Views</span>
                            <div className="flex gap-2">
                                <StarIcon className="w-3" />
                                <span className="text-sm text-gray-400">5.0</span>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
      </div>
    )
}

export default Sidebar
