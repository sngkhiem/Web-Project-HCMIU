import React, { useEffect } from 'react'
import { Navigate, Routes, Route } from "react-router-dom"

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import HomePage from "./pages/HomePage"
import LogInPage from "./pages/LogInPage"
import SignUpPage from "./pages/SignUpPage"
import BrowsePage from "./pages/BrowsePage"
import WatchPage from "./pages/WatchPage"

import LoadingSpinner from "./components/LoadingSpinner"

import { useUserStore } from "./stores/useUserStore"

const App = () => {
    const { user, checkAuth, checkingAuth } = useUserStore();

	useEffect(() => {
		checkAuth();
	}, [checkAuth]);

	if (checkingAuth) return <LoadingSpinner />;
    
    return (
        <div class="font-outfit">
            <div className="bg-black sticky top-0 z-40">
                <Navbar />
            </div>
    
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LogInPage />} />
                <Route path="/signup" element={<SignUpPage />} />
                
                <Route path="/browse" element={<BrowsePage />} />
                <Route path="/watch" element={<WatchPage />} />
            </Routes>
    
            <Footer />

        </div>
    )
}

export default App
