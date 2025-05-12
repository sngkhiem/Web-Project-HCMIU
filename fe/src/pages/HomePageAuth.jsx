import React, { useEffect } from 'react';
import VideoCarousel from '../components/VideoCarousel';
import VideoSection from '../components/VideoSection';

import { useUserStore } from '../stores/useUserStore';
import { useCategoryStore } from '../stores/useCategoryStore';

const HomePageAuth = () => {
    const { user } = useUserStore();
    const { categories, fetchAllCategories } = useCategoryStore();

    useEffect(() => {
        fetchAllCategories();
    }, [fetchAllCategories]);

    console.log(user);
    
    return (
        <div>
            {/* Video Carousel */}
            <VideoCarousel />

            {/* Video Sections*/}
            {categories.map(category => {
                return (
                    <VideoSection key={category.id} name={category.name} />
                )
            })}

        </div>
    )
}

export default HomePageAuth
