import React, { useState, useRef, useEffect } from 'react'
import { Link } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import SearchCard from './SearchCard'

import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';

import { useUserStore } from "../stores/useUserStore";

const Navbar = () => {
    const [isSearchFocused, setIsSearchFocused] = useState(false)
    const [searchQuery, setSearchQuery] = useState('')
    const searchRef = useRef(null)

    const { user, logout } = useUserStore();

    // Mock data for demonstration
    const suggestedMovies = [
        {
            id: 1,
            title: "Inception",
            year: "2010",
            poster: "https://image.tmdb.org/t/p/w500/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg"
        },
        {
            id: 2,
            title: "The Dark Knight",
            year: "2008",
            poster: "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg"
        },
        {
            id: 3,
            title: "Interstellar",
            year: "2014",
            poster: "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg"
        }
    ]

    const recentSearches = ["action movies", "sci-fi", "christopher nolan"]

    // Handle clicks outside the search area
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setIsSearchFocused(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [])

    const handleMovieClick = (movie) => {
        // Handle movie selection
        console.log('Selected movie:', movie)
        setIsSearchFocused(false)
    }

    const handleRecentSearchClick = (search) => {
        // Handle recent search selection
        setSearchQuery(search)
        setIsSearchFocused(false)
    }

    return (
        <div>
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="relative flex h-16 items-center justify-between">
                    {/* Logo */}
                    <div className="flex flex-1 items-center justify-center sm:justify-start">
                        <div className="flex shrink-0 items-center">
                            <Link to="/">
                                <img
                                    alt="Your Company"
                                    src="../assets/logo.png"
                                    className="h-16 w-auto"
                                />
                            </Link>
                        </div>
                        <div>
                            <Link to="/browse" className="font-semibold text-white px-4 py-2">
                                Browse
                            </Link>
                        </div>
                    </div>

                    {/* Search and Login */}
                    <div className="absolute inset-y-0 right-0 flex items-center gap-3 pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                        { user ? (
                            <>
                                <div className="relative" ref={searchRef}>
                                    <input
                                        type="text"
                                        placeholder="Search..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        onFocus={() => setIsSearchFocused(true)}
                                        className="w-64 px-4 py-2 rounded-full border border-gray-300 text-white focus:outline-none focus:border-purple-500"
                                    />
                                    <Link to="/search" className="absolute right-3 top-1/2 -translate-y-1/2">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-500">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                                        </svg>
                                    </Link>
                                    
                                    {/* Search Card with Animation */}
                                    <AnimatePresence>
                                        {isSearchFocused && (
                                            <motion.div
                                                initial={{ opacity: 0, y: -10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -10 }}
                                                transition={{ duration: 0.2, ease: "easeOut" }}
                                                className="absolute top-full left-0 mt-2 w-full z-50"
                                            >
                                                <SearchCard
                                                    suggestedMovies={suggestedMovies}
                                                    recentSearches={recentSearches}
                                                    onMovieClick={handleMovieClick}
                                                    onRecentSearchClick={handleRecentSearchClick}
                                                />
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>

                                {/* Profile Dropdown */}
                                <Menu as="div" className="relative ml-3">
                                    <div>
                                        <MenuButton className="relative flex rounded-full bg-gray-800 text-sm focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-hidden">
                                            <span className="absolute -inset-1.5" />
                                            <span className="sr-only">Open user menu</span>
                                            <img
                                                alt=""
                                                src={user.avatar}
                                                className="size-8 rounded-full"
                                            />
                                        </MenuButton>
                                    </div>

                                    <MenuItems
                                        transition
                                        className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 ring-1 shadow-lg ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
                                    >
                                        <MenuItem>
                                            <Link
                                                to="/profile"
                                                className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:outline-hidden"
                                            >
                                                Your Profile
                                            </Link>
                                        </MenuItem>
                                        <MenuItem>
                                            <button
                                                className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:outline-hidden"
                                                onClick={logout}
                                            >
                                                Log Out
                                            </button>
                                        </MenuItem>
                                    </MenuItems>
                                </Menu>
                            </>
                        ) : (
                            <>
                            <Link to="/login">
                                <button className="bg-primary-text px-5 py-2 rounded-xl text-white flex items-center gap-2 hover:opacity-70 transition-opacity">
                                    Log in 
                                </button> 
                            </Link>
                        </>
                        )}

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navbar
