import React, { useState} from 'react'

import { Link } from "react-router-dom";
// import { useUserStore } from "../stores/useUserStore";

const LogInPage = () => {
    // const { login, loading } = useUserStore();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        login(email, password);
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
                            Log in to your account
                        </h2>
                    </div>

                    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                        <form onSubmit={handleSubmit} className="space-y-6">
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
                                value={email}
                                required
                                autoComplete="email"
                                onChange={(e) => setEmail(e.target.value)}
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
                                value={password}
                                required
                                autoComplete="current-password"
                                onChange={(e) => setPassword(e.target.value)}
                                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                            />
                            </div>

                            <div className="flex justify-between items-center text-sm mt-3">
                            <div className="flex items-center gap-x-2">
                                <p className="font-semibold">Remember me</p>
                                <input type="checkbox" name="remember" className="cursor-pointer" />
                            </div>
                            <Link to="#" className="font-semibold text-primary-text hover:text-brown-600">
                                Forgot password?
                            </Link>
                            </div>
                        </div>

                        {/* Sign In Button */}
                        <div>
                            <button
                            type="submit"
                            className="flex w-full justify-center rounded-md bg-purple-700 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-purple-600 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                            Log in
                            </button>
                        </div>
                        </form>

                        <p className="mt-10 text-center text-sm/6">
                        Don't have an account?{' '}
                        <Link to="/signup" className="font-semibold text-gray-300 hover:text-purple-600 transition-colors">
                            Sign up
                        </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LogInPage
