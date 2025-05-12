import React from 'react'

const SearchPage = () => {
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
                <div className="relative h-screen z-20 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
                    <div>
                        <h1 className="text-xl font-bold text-white mb-6 leading-[1.1]">
                            Search results for "2GOILAYS"
                        </h1>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SearchPage
