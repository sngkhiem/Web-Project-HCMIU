import React, { useState, useEffect } from 'react'
import { Link, useLocation } from "react-router-dom";

import { useUserStore } from "../stores/useUserStore";

const SignUpPage = () => {
    const location = useLocation();
    const { signup, loading } = useUserStore();

    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
    });

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const emailFromUrl = searchParams.get('email');
        if (emailFromUrl) {
            setFormData(prev => ({ ...prev, email: emailFromUrl }));
        }
    }, [location]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        signup(formData)
    };

    return (
        <div className="h-screen relative">
            {/* Dark overlay */}
            <div className="absolute inset-0 bg-black/60 z-10"></div>
                
            {/* Background image */}
            <div 
                className="absolute inset-0 bg-[url('/assets/hero.jpg')] bg-cover bg-center"
                style={{
                    backgroundImage: "linear-gradient(to bottom, rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url('/assets/hero.jpg')"
                }}
            ></div>

            <div className="relative z-20 mx-auto max-w-7xl">
                <div className="flex flex-col justify-center p-6 text-white">
                    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                        <img
                        alt="Your Company"
                        src="./assets/logo.png"
                        className="mx-auto h-20 w-auto"
                        />
                        <h2 className="mt-5 text-center text-2xl/9 font-bold tracking-tight">
                        Sign up for an account
                        </h2>
                    </div>

                    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Username */}
                            <div>
                                <label htmlFor="username" className="block text-sm/6 font-medium">
                                    Username
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="username"
                                        name="username"
                                        type="text"
                                        value={formData.username}
                                        required
                                        onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                    />
                                </div>
                            </div>

                            {/* Email */}
                            <div>
                                <label htmlFor="email" className="block text-sm/6 font-medium">
                                    Email
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        value={formData.email}
                                        required
                                        autoComplete="email"
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                    />
                                </div>
                            </div>

                            {/* Password */}
                            <div>
                                <label htmlFor="password" className="block text-sm/6 font-medium">
                                    Password
                                </label>
                                <div className="mt-2 relative">
                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        value={formData.password}
                                        required
                                        autoComplete="current-password"
                                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                    />
                                </div>
                            </div>

                            {/* Sign In Button */}
                            <div>
                                <button
                                    type="submit"
                                    className="flex w-full justify-center rounded-md bg-purple-700 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-purple-600 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                    Sign up
                                </button>
                            </div>
                        </form>

                        <p className="mt-5 text-center text-sm/6 text-gray-500">
                            Already have an account?{' '}
                            <Link to="/login" className="font-semibold text-gray-300 hover:text-purple-600 transition-colors">
                                Log in
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignUpPage
