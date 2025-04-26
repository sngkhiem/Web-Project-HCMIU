import React from 'react'
import { Link } from 'react-router-dom'

const WatchPage = () => {
    return (
        <div>
            <div className="relative flex items-center justify-center py-12 bg-black">
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
                <div className="relative z-20 flex items-center justify-center w-full">
                    <iframe width="1120" height="630" src="https://www.youtube.com/embed/INQ20VdF9uQ?si=QROHiwtK3w7oqogQ" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
                </div>
            </div>
        </div>
    )
}

export default WatchPage
