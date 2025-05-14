import React from 'react';

import { useVideoStore } from '../stores/useVideoStore';

import VideoThumbnail from '../components/VideoThumbnail';

const SearchPage = () => {
    const { searchResults } = useVideoStore();

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

                {/* Search Results */}
                <div className="relative h-screen z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                    <div>
                        <h1 className="text-2xl font-bold text-white mb-6 leading-[1.1]">
                            Search Results ({searchResults.length})
                        </h1>
                    </div>

                    <div className="grid grid-cols-3 gap-2">
                        {searchResults.map(video => {
                            return (
                                <VideoThumbnail key={video.id} videoId={video.id} title={video.title} description={video.description} url={video.url} thumbnailUrl={video.thumbnailUrl} />
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SearchPage
