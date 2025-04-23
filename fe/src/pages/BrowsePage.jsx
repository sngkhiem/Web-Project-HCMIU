import React from 'react'
import { Link } from 'react-router-dom'

import PlayIcon from '@heroicons/react/24/outline/PlayIcon'
import InformationCircleIcon from '@heroicons/react/24/outline/InformationCircleIcon'

const BrowsePage = () => {
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
                
                <div className="relative z-20 mx-auto max-w-7xl px-10 py-32">
                    <div className="w-1/2">
                        <div className="flex flex-col gap-y-2">
                            <h1 className="text-4xl font-bold text-white">Man Utd v Wolves</h1>
                        </div>
                        <p className="mt-4 text-gray-400">
                            A thrilling Premier League clash as Manchester United host Wolverhampton Wanderers at Old Trafford. Both teams look to secure vital points in their 2024/25 campaign, with United aiming to maintain their top-four push while Wolves seek to climb up the table.
                        </p>

                        <div className="flex items-center gap-x-4 mt-8">
                            <Link to="/watch" className="flex items-center justify-center rounded-md bg-purple-700 px-6 py-2 text-md font-semibold text-white shadow-xs hover:bg-purple-600 transition-colors">
                                <PlayIcon className="w-6 h-6 mr-2" />
                                Play
                            </Link>
                            <button className="flex items-center justify-center rounded-md bg-gray-100 px-6 py-2 text-md font-semibold text-gray-900 shadow-xs hover:bg-gray-200 transition-colors">
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
