import React from 'react'
import { Link } from "react-router-dom"

const Navbar = () => {
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
                    </div>

                    {/* Login Button */}
                    <div className="absolute inset-y-0 right-0 flex items-center gap-3 pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                        <div>
                            <Link to="/login" className="bg-purple-700 font-semibold text-white px-4 py-2 rounded-full hover:bg-purple-600 transition-colors">
                                Log In
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navbar
