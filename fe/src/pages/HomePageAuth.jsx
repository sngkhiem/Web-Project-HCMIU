import React from 'react';
import VideoCarousel from '../components/VideoCarousel';
import VideoSection from '../components/VideoSection';

import { useUserStore } from '../stores/useUserStore'

const HomePageAuth = () => {
    const { user } = useUserStore();
    console.log(user);
    
    return (
        <div>
            {/* Video Carousel */}
            <VideoCarousel />

            {/* Video Sections*/}
            <VideoSection />
        </div>
    )
}

export default HomePageAuth
