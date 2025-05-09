import React, { useEffect } from 'react'
import { Navigate, Routes, Route } from "react-router-dom"

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop"
import LoadingSpinner from "./components/LoadingSpinner"

import HomePage from "./pages/HomePage"
import HomePageAuth from './pages/HomePageAuth'
import LogInPage from "./pages/LogInPage"
import SignUpPage from "./pages/SignUpPage"
import WatchPage from "./pages/WatchPage"
import ProfilePage from './pages/ProfilePage';
import SearchPage from './pages/SearchPage';

import { useUserStore } from "./stores/useUserStore"

const App = () => {
    const { user, checkAuth, checkingAuth } = useUserStore();

    useEffect(() => {
        checkAuth();
    }, [checkAuth]);

    if (checkingAuth) return <LoadingSpinner />;

    return (
        <div className="font-outfit">
            <ScrollToTop />

            <div className="bg-black sticky top-0 z-40">
                <Navbar />
            </div>

            <Routes>
                <Route path="/" element={user ? <HomePageAuth /> : <HomePage />} />

                <Route path='/signup' element={!user ? <SignUpPage /> : <Navigate to='/' />} />
                <Route path='/login' element={!user ? <LogInPage /> : <Navigate to='/' />} />

                <Route path="/watch/:id" element={<WatchPage />} />
                <Route path="/search" element={<SearchPage />} />

                <Route path="/profile" element={user ? <ProfilePage /> : <Navigate to="/" />} />
            </Routes>

            <Footer />
        </div>
    )
}

export default App