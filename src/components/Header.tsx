// src/app/components/ui/Header.tsx

"use client";

import React, { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { Film, Search, Menu, Bell, User, Home, Star, Zap, Tv, Grid, X, Bookmark, ChevronDown } from "lucide-react";
import { DarkModeToggle } from "./DarkModeToggle";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

interface HeaderProps {
    onSearchClick?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onSearchClick }) => {
    const pathname = usePathname();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const watchlistMovies = useSelector((state: RootState) => state.watchlist.movies);
    
    const mobileMenuRef = useRef<HTMLDivElement>(null);
    const userMenuRef = useRef<HTMLDivElement>(null);

    // Handle scroll effect
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Handle escape key to close menus
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                setIsMobileMenuOpen(false);
                setIsUserMenuOpen(false);
            }
        };
        document.addEventListener('keydown', handleEscape);
        return () => document.removeEventListener('keydown', handleEscape);
    }, []);

    // Handle click outside to close menus
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node)) {
                setIsMobileMenuOpen(false);
            }
            if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
                setIsUserMenuOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Close mobile menu on route change
    useEffect(() => {
        setIsMobileMenuOpen(false);
        setIsUserMenuOpen(false);
    }, [pathname]);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
        setIsUserMenuOpen(false);
    };

    const toggleUserMenu = () => {
        setIsUserMenuOpen(!isUserMenuOpen);
        setIsMobileMenuOpen(false);
    };

    const navigationItems = [
        { name: 'Movies', path: '/movies', icon: Home, ariaLabel: 'Browse movies' },
        { name: 'TV Shows', path: '/tv-shows', icon: Tv, ariaLabel: 'Browse TV shows' },
        { name: 'Genres', path: '/genres', icon: Grid, ariaLabel: 'Browse by genres' },
        { 
            name: 'Watchlist', 
            path: '/watchlist', 
            icon: Bookmark,
            ariaLabel: `View watchlist${watchlistMovies.length > 0 ? ` (${watchlistMovies.length} items)` : ''}`,
            badge: watchlistMovies.length > 0 ? watchlistMovies.length : null
        }
    ];

    return (
        <>
            <motion.header
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
                    isScrolled 
                        ? 'bg-white/95 dark:bg-black/95 backdrop-blur-xl border-b border-gray-300/60 dark:border-white/10 shadow-lg'
                        : 'bg-white/80 dark:bg-black/30 backdrop-blur-2xl border-b border-gray-200/50 dark:border-white/5'
                }`}
                role="banner"
            >
                {/* Background overlays */}
                <div className="absolute inset-0 bg-gradient-to-r from-red-600/5 via-purple-600/5 to-blue-600/5 dark:from-red-600/8 dark:via-purple-600/8 dark:to-blue-600/8 opacity-80" aria-hidden="true" />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-100/20 dark:to-black/20" aria-hidden="true" />

                <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-18 lg:h-20 flex items-center justify-between max-w-7xl">
                    {/* Logo section */}
                    <Link 
                        href="/movies" 
                        className="flex items-center gap-2 sm:gap-3 lg:gap-4 hover:scale-105 transition-all duration-300 group flex-shrink-0 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-transparent rounded-lg min-w-0"
                        aria-label="CineVerse - Go to movies page"
                    >
                        <div className="relative">
                            <div className="absolute -inset-2 bg-gradient-to-r from-red-500 via-purple-500 to-pink-500 rounded-xl blur-xl opacity-20 group-hover:opacity-40 transition-all duration-500" aria-hidden="true" />
                            <div className="absolute -inset-1 bg-gradient-to-br from-red-600/30 to-purple-700/30 rounded-lg blur-md opacity-60 group-hover:opacity-80 transition-all duration-300" aria-hidden="true" />
                            <div className="relative bg-gradient-to-br from-red-600 via-red-700 to-purple-800 p-2 sm:p-3 lg:p-4 rounded-lg shadow-2xl border border-red-500/20">
                                <motion.div whileHover={{ rotate: 360 }} transition={{ duration: 0.8, ease: "easeOut" }}>
                                    <Film className="h-5 w-5 sm:h-6 sm:w-6 lg:h-8 lg:w-8 text-white drop-shadow-lg" />
                                </motion.div>
                            </div>
                            <div className="absolute inset-0 rounded-lg border-2 border-red-500/30 animate-pulse" aria-hidden="true" />
                        </div>
                        <div className="flex flex-col min-w-0">
                            <motion.h1 
                                whileHover={{ scale: 1.05 }} 
                                className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-black bg-gradient-to-r from-gray-900 via-red-600 to-purple-600 dark:from-white dark:via-red-200 dark:to-purple-200 bg-clip-text text-transparent tracking-tight truncate"
                            >
                                CineVerse
                            </motion.h1>
                            <motion.p 
                                initial={{ opacity: 0.6 }} 
                                whileHover={{ opacity: 1 }} 
                                className="hidden sm:flex items-center gap-1 text-xs text-red-600 dark:text-red-400 font-semibold -mt-1 tracking-wider uppercase"
                            >
                                <Star className="w-3 h-3 text-yellow-500 dark:text-yellow-400" />
                                Premium • Unlimited • 4K
                            </motion.p>
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center flex-1 justify-center max-w-3xl mx-8" role="navigation" aria-label="Main navigation">
                        <div className="flex items-center justify-center w-full bg-white/10 dark:bg-white/5 backdrop-blur-sm rounded-2xl border border-gray-200/30 dark:border-white/10 p-2">
                            {navigationItems.map((item) => {
                                const Icon = item.icon;
                                const isActive = pathname === item.path;
                                return (
                                    <Link
                                        key={item.path}
                                        href={item.path}
                                        aria-label={item.ariaLabel}
                                        className={`relative group px-6 lg:px-8 py-3 transition-all duration-300 font-semibold text-sm lg:text-base rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-transparent ${
                                            isActive
                                                ? 'text-white bg-gradient-to-r from-red-600 to-purple-600 shadow-lg'
                                                : 'text-gray-700 dark:text-white/70 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100/50 dark:hover:bg-white/10'
                                        }`}
                                    >
                                        <span className="relative z-10 flex items-center gap-2">
                                            <Icon className="w-4 h-4" />
                                            <span className="whitespace-nowrap">{item.name}</span>
                                            {item.badge && (
                                                <span className="bg-gradient-to-r from-red-500 to-purple-600 text-white text-xs px-2 py-0.5 rounded-full font-bold min-w-[1.25rem] text-center">
                                                    {item.badge}
                                                </span>
                                            )}
                                        </span>
                                        {!isActive && (
                                            <div className="absolute inset-0 bg-gray-100/70 dark:bg-white/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" aria-hidden="true" />
                                        )}
                                    </Link>
                                );
                            })}
                        </div>
                    </nav>

                    {/* Premium Badge - Desktop (moved to right side) */}
                    <div className="hidden md:flex items-center">
                        <div className="px-4 py-2 bg-gradient-to-r from-amber-500/20 to-yellow-500/20 backdrop-blur-sm border border-amber-500/30 rounded-full">
                            <div className="flex items-center gap-2">
                                <Zap className="w-4 h-4 text-amber-500 dark:text-amber-400" />
                                <span className="text-amber-600 dark:text-amber-300 font-bold text-sm tracking-wide">
                                    PREMIUM
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Right Side Actions */}
                    <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
                        {/* Search Button */}
                        <motion.button 
                            onClick={onSearchClick || undefined} 
                            whileHover={{ scale: 1.05 }} 
                            whileTap={{ scale: 0.95 }} 
                            className="p-2 sm:p-2.5 lg:p-3 text-gray-600 dark:text-white/80 hover:text-gray-800 dark:hover:text-white transition-all duration-300 hover:bg-gray-100 dark:hover:bg-white/10 rounded-lg backdrop-blur-sm border border-gray-200 dark:border-white/10 hover:border-gray-300 dark:hover:border-white/20 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-transparent"
                            aria-label="Open search"
                        >
                            <Search className="h-4 w-4 sm:h-5 sm:w-5" />
                        </motion.button>
                        
                        {/* Notifications - Hidden on mobile */}
                        <motion.button 
                            whileHover={{ scale: 1.05 }} 
                            whileTap={{ scale: 0.95 }} 
                            className="hidden sm:flex relative p-2.5 lg:p-3 text-gray-600 dark:text-white/80 hover:text-gray-800 dark:hover:text-white transition-all duration-300 hover:bg-gray-100 dark:hover:bg-white/10 rounded-lg backdrop-blur-sm border border-gray-200 dark:border-white/10 hover:border-gray-300 dark:hover:border-white/20 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-transparent"
                            aria-label="View notifications (1 new)"
                        >
                            <Bell className="h-4 w-4 lg:h-5 lg:w-5" />
                            <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-red-500 to-pink-500 rounded-full border-2 border-white dark:border-black animate-pulse shadow-lg shadow-red-500/50" aria-hidden="true" />
                            <div className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-white rounded-full animate-ping" aria-hidden="true" />
                        </motion.button>
                        
                        {/* Dark Mode Toggle */}
                        <div className="p-0.5 rounded-lg backdrop-blur-sm border border-gray-200 dark:border-white/10">
                            <DarkModeToggle />
                        </div>
                        
                        {/* User Profile - Desktop */}
                        <div className="hidden sm:block relative" ref={userMenuRef}>
                            <motion.button 
                                onClick={toggleUserMenu}
                                whileHover={{ scale: 1.02 }} 
                                whileTap={{ scale: 0.98 }} 
                                className="flex items-center gap-2 lg:gap-3 p-2 pr-3 lg:pr-4 bg-gradient-to-r from-red-600/20 to-purple-600/20 hover:from-red-600/30 hover:to-purple-600/30 backdrop-blur-sm border border-red-500/30 dark:border-white/20 hover:border-red-500/40 dark:hover:border-white/30 rounded-lg transition-all duration-300 shadow-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-transparent"
                                aria-expanded={isUserMenuOpen}
                                aria-haspopup="menu"
                                aria-label="User menu"
                            >
                                <div className="relative w-8 h-8 lg:w-10 lg:h-10 bg-gradient-to-br from-red-500 to-purple-600 rounded-lg flex items-center justify-center overflow-hidden">
                                    <User className="h-4 w-4 lg:h-5 lg:w-5 text-white" />
                                    <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 lg:w-3 lg:h-3 bg-green-400 border-2 border-white dark:border-black rounded-full" />
                                </div>
                                <div className="hidden md:block text-left">
                                    <div className="text-gray-900 dark:text-white/90 font-semibold text-sm">Profile</div>
                                    <div className="text-gray-600 dark:text-white/60 text-xs">Premium User</div>
                                </div>
                                <ChevronDown className={`w-4 h-4 text-gray-600 dark:text-white/60 transition-transform duration-200 ${isUserMenuOpen ? 'rotate-180' : ''}`} />
                            </motion.button>

                            {/* User Dropdown Menu */}
                            <AnimatePresence>
                                {isUserMenuOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                                        transition={{ duration: 0.2 }}
                                        className="absolute right-0 top-full mt-2 w-48 bg-white/95 dark:bg-black/90 backdrop-blur-xl border border-gray-200/50 dark:border-white/10 rounded-xl shadow-2xl overflow-hidden z-50"
                                        role="menu"
                                    >
                                        <div className="py-2">
                                            <div className="px-4 py-3 border-b border-gray-200/50 dark:border-white/10">
                                                <div className="text-sm font-medium text-gray-900 dark:text-white">John Doe</div>
                                                <div className="text-xs text-gray-600 dark:text-white/60">john@example.com</div>
                                            </div>
                                            <button className="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-white/80 hover:bg-gray-100 dark:hover:bg-white/10 transition-colors" role="menuitem">
                                                Account Settings
                                            </button>
                                            <button className="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-white/80 hover:bg-gray-100 dark:hover:bg-white/10 transition-colors" role="menuitem">
                                                Billing
                                            </button>
                                            <button className="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-white/80 hover:bg-gray-100 dark:hover:bg-white/10 transition-colors" role="menuitem">
                                                Help & Support
                                            </button>
                                            <div className="border-t border-gray-200/50 dark:border-white/10 mt-2 pt-2">
                                                <button className="w-full px-4 py-2 text-left text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors" role="menuitem">
                                                    Sign Out
                                                </button>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                        
                        {/* Mobile Hamburger Menu Button */}
                        <motion.button 
                            onClick={toggleMobileMenu}
                            whileHover={{ scale: 1.05 }} 
                            whileTap={{ scale: 0.95 }} 
                            className="lg:hidden p-2 sm:p-2.5 text-gray-600 dark:text-white/80 hover:text-gray-800 dark:hover:text-white transition-all duration-300 hover:bg-gray-100 dark:hover:bg-white/10 rounded-lg backdrop-blur-sm border border-gray-200 dark:border-white/10 hover:border-gray-300 dark:hover:border-white/20 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-transparent"
                            aria-label={isMobileMenuOpen ? 'Close mobile menu' : 'Open mobile menu'}
                            aria-expanded={isMobileMenuOpen}
                            aria-controls="mobile-menu"
                        >
                            <motion.div
                                animate={isMobileMenuOpen ? { rotate: 180 } : { rotate: 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                {isMobileMenuOpen ? (
                                    <X className="h-5 w-5" />
                                ) : (
                                    <Menu className="h-5 w-5" />
                                )}
                            </motion.div>
                        </motion.button>
                    </div>
                </div>

                {/* Bottom border effects */}
                <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-500/60 to-transparent" aria-hidden="true" />
                <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/40 to-transparent animate-pulse" aria-hidden="true" />
            </motion.header>

            {/* Mobile Navigation Dropdown */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -20, scale: 0.95 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="fixed top-16 sm:top-18 lg:top-20 left-0 right-0 z-40 lg:hidden"
                        id="mobile-menu"
                        role="menu"
                        ref={mobileMenuRef}
                    >
                        <div className="mx-4 mt-2 bg-white/95 dark:bg-black/90 backdrop-blur-2xl border border-gray-200/50 dark:border-white/10 rounded-2xl shadow-2xl overflow-hidden">
                            {/* Mobile Navigation Links */}
                            <div className="p-4 space-y-2">
                                {navigationItems.map((item, index) => {
                                    const Icon = item.icon;
                                    const isActive = pathname === item.path;
                                    return (
                                        <motion.div
                                            key={item.path}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: index * 0.1, duration: 0.3 }}
                                        >
                                            <Link
                                                href={item.path}
                                                onClick={() => setIsMobileMenuOpen(false)}
                                                className={`flex items-center gap-3 p-4 rounded-xl font-semibold transition-all duration-300 min-h-[3rem] focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-transparent ${
                                                    isActive
                                                        ? 'text-white bg-gradient-to-r from-red-600 to-purple-600 shadow-lg'
                                                        : 'text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 hover:bg-white/50 dark:hover:bg-white/5'
                                                }`}
                                                role="menuitem"
                                                aria-label={item.ariaLabel}
                                            >
                                                <Icon className={`w-5 h-5 flex-shrink-0 ${isActive ? 'text-white' : ''}`} />
                                                <span className="text-base">{item.name}</span>
                                                {item.badge && (
                                                    <span className="ml-auto bg-gradient-to-r from-red-500 to-purple-600 text-white text-xs px-2 py-0.5 rounded-full font-bold min-w-[1.25rem] text-center">
                                                        {item.badge}
                                                    </span>
                                                )}
                                                {isActive && !item.badge && (
                                                    <motion.div 
                                                        layoutId="mobileActiveTab" 
                                                        className="ml-auto w-2 h-2 bg-white rounded-full flex-shrink-0" 
                                                    />
                                                )}
                                            </Link>
                                        </motion.div>
                                    );
                                })}
                            </div>

                            {/* Mobile Premium Badge & User Info */}
                            <div className="px-4 pb-4 pt-2 border-t border-gray-200/50 dark:border-white/10">
                                <div className="flex items-center justify-between gap-3">
                                    {/* Premium Badge */}
                                    <div className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-amber-500/20 to-yellow-500/20 backdrop-blur-sm border border-amber-500/30 rounded-full flex-shrink-0">
                                        <Zap className="w-4 h-4 text-amber-500 dark:text-amber-400" />
                                        <span className="text-amber-600 dark:text-amber-300 font-bold text-sm">
                                            PREMIUM
                                        </span>
                                    </div>

                                    {/* Mobile User Profile */}
                                    <motion.button 
                                        whileTap={{ scale: 0.95 }}
                                        className="flex items-center gap-2 p-2 bg-gradient-to-r from-red-600/20 to-purple-600/20 backdrop-blur-sm border border-red-500/30 dark:border-white/20 rounded-lg min-h-[2.5rem] focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-transparent"
                                        aria-label="User profile"
                                    >
                                        <div className="relative w-8 h-8 bg-gradient-to-br from-red-500 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                                            <User className="h-4 w-4 text-white" />
                                            <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-green-400 border-2 border-white dark:border-black rounded-full" />
                                        </div>
                                        <div className="text-left min-w-0">
                                            <div className="text-gray-900 dark:text-white/90 font-semibold text-sm truncate">Profile</div>
                                            <div className="text-gray-600 dark:text-white/60 text-xs">Premium User</div>
                                        </div>
                                    </motion.button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Mobile menu overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/20 dark:bg-black/40 backdrop-blur-sm z-30 lg:hidden"
                        onClick={() => setIsMobileMenuOpen(false)}
                        aria-hidden="true"
                    />
                )}
            </AnimatePresence>
        </>
    );
};