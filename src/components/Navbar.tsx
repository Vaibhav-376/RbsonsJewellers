"use client"
import React, { useState, useEffect } from "react";
import {
    Menu,
    X,
    Heart,
    ShoppingBag,
    Search,
    User,
    ChevronDown,
    Star,
    TrendingUp,
    ChevronRight,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [searchFocused, setSearchFocused] = useState(false);
    const [activeSubmenu, setActiveSubmenu] = useState<number | null>(null);
    const [mobileActiveSubmenu, setMobileActiveSubmenu] = useState<number | null>(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userMenuOpen, setUserMenuOpen] = useState(false);
    const [userInfo, setUserInfo] = useState<{ name?: string; email?: string } | null>(null);

    const toggleMenu = () => setIsOpen(!isOpen);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 10);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Check login status on mount
    useEffect(() => {
        const checkLogin = async () => {
            try {
                const res = await fetch("/api/auth/verifyToken", { credentials: 'include' });
                if (res.status === 200) {
                    setIsLoggedIn(true);
                    const data = await res.json();
                    setUserInfo(data.user || null);
                } else {
                    setIsLoggedIn(false);
                    setUserInfo(null);
                }
            } catch {
                setIsLoggedIn(false);
                setUserInfo(null);
            }
        };
        checkLogin();
    }, []);

    const handleLogout = async () => {
        await fetch('/api/auth/logout', { method: 'POST', credentials: 'include' });
        setIsLoggedIn(false);
        setUserMenuOpen(false);
        window.location.reload();
    };

    const navItems = [
        {
            name: "Rings",
            href: "/rings",
            featured: false,
            submenu: [
                { name: "Wedding Rings", href: "/rings/wedding-rings" },
                { name: "Engagement Rings", href: "/rings/engagement-rings" },
                { name: "Fashion Rings", href: "/rings/fashion-rings" },
                { name: "Couple Band", href: "/rings/couple-bands" },
                { name: "Gents Rings", href: "/rings/gents-rings" },
                { name: "Gents Diamond Rings", href: "/rings/gents-diamond-rings" },
                { name: "Gents Solitaire Rings", href: "/rings/gents-solitaire-rings" },
                { name: "Ladies Rings", href: "/rings/ladies-rings" },
                { name: "Ladies Antique Rings", href: "/rings/ladies-antique-rings" },
                { name: "Ladies Cocktail Rings", href: "/rings/ladies-cocktail-rings" },
                { name: "Ladies Polki Rings", href: "/rings/ladies-polki-rings" },
            ]
        },
        {
            name: "Earrings",
            href: "/earrings",
            featured: true,
            submenu: [
                { name: "Stud Earrings", href: "/earrings/studs-earrings" },
                { name: "Drop Earrings", href: "/earrings/drop-earrings" },
                { name: "Hoop Earrings", href: "/earrings/hoop-earrings" },
                { name: "Chandelier Earrings", href: "/earrings/chandelier-earrings" },
                { name: "Clip-on Earrings", href: "/earrings/clip-on-earrings" }
            ]
        },
        {
            name: "Necklaces",
            href: "/necklaces",
            featured: false,
            submenu: [
                { name: "Chain Necklaces", href: "/necklaces/chain-necklace" },
                { name: "Pearl Necklaces", href: "/necklaces/pearl-necklaces" },
                { name: "Chokers", href: "/necklaces/chokers" },
                { name: "Lockets", href: "/necklaces/lockets" },
                { name: "Statement Necklaces", href: "/necklaces/statement-necklaces" }
            ]
        },
        {
            name: "Bangles",
            href: "/bangles",
            featured: false,
            submenu: [
                { name: "Gold Bangles", href: "/bangles/gold-bangles" },
                { name: "Silver Bangles", href: "/bangles/silver-bangles" },
                { name: "Diamond Bangles", href: "/bangles/diamond-bangles" },
                { name: "Traditional Bangles", href: "/bangles/traditional-bangles" },
                { name: "Modern Bangles", href: "/bangles/modern-bangles" }
            ]
        },
        {
            name: "Pendant",
            href: "/pendant",
            featured: false,
            submenu: [
                { name: "Diamond Pendants", href: "/pendant/diamond-pendants" },
                { name: "Gold Pendants", href: "/pendant/gold-pendants" },
                { name: "Religious Pendants", href: "/pendant/religious-pendants" },
                { name: "Heart Pendants", href: "/pendant/heart-pendants" },
                { name: "Custom Pendants", href: "/pendant/custom-pendants" }
            ]
        },
    ];

    const handleMouseEnter = (index: number) => {
        setActiveSubmenu(index);
    };

    const handleMouseLeave = () => {
        setActiveSubmenu(null);
    };

    const toggleMobileSubmenu = (index: number) => {
        setMobileActiveSubmenu(mobileActiveSubmenu === index ? null : index);
    };

    return (
        <header
            className={`sticky top-0 w-full z-50 transition-all duration-500 ease-out ${scrolled
                ? "bg-gradient-to-r from-[#31135E]/98 via-[#2A0E52]/98 to-[#31135E]/98 backdrop-blur-lg py-1 shadow-2xl shadow-purple-900/20 border-b border-purple-500/10"
                : "bg-gradient-to-r from-[#31135E] via-[#2A0E52] to-[#31135E] py-2"
                }`}
        >
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                {/* Main navbar row */}
                <div className="flex items-center justify-between gap-2 sm:gap-4">
                    {/* Left: Hamburger (mobile) + Logo */}
                    <div className="flex items-center space-x-2">
                        <button
                            onClick={toggleMenu}
                            className="lg:hidden p-2 rounded-xl hover:bg-purple-700/30 transition-all duration-300 hover:scale-105 active:scale-95 group"
                            aria-label="Toggle menu"
                        >
                            <div className="relative">
                                {isOpen ? (
                                    <X size={22} className="text-white transition-all duration-300 group-hover:rotate-90" />
                                ) : (
                                    <Menu size={22} className="text-white transition-all duration-300 group-hover:rotate-12" />
                                )}
                            </div>
                        </button>

                        <Link href="/" className="flex items-center group">
                            <div className="relative">
                                <Image
                                    src="/Logo.png"
                                    alt="Company Logo"
                                    width={140}
                                    height={70}
                                    className="h-16 sm:h-20 md:h-24 w-auto object-contain transition-all duration-500 group-hover:scale-110 group-hover:brightness-110"
                                    priority
                                />
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -skew-x-12 translate-x-full group-hover:translate-x-[-200%] transition-transform duration-700 ease-out"></div>
                            </div>
                        </Link>
                    </div>

                    {/* Center: Desktop Navigation with Submenus */}
                    <nav className="hidden lg:flex items-center space-x-1">
                        {navItems.map((item, index) => (
                            <div
                                key={item.name}
                                className="relative group"
                                onMouseEnter={() => handleMouseEnter(index)}
                                onMouseLeave={handleMouseLeave}
                            >
                                <Link
                                    href={item.href}
                                    className={`flex items-center space-x-1 px-4 py-2 rounded-lg transition-all duration-300 hover:bg-purple-700/30 group ${item.featured ? 'bg-gradient-to-r from-purple-600/20 to-pink-600/20 border border-purple-500/30' : ''
                                        }`}
                                >
                                    <span className={`text-white font-medium text-sm transition-all duration-300 group-hover:text-purple-200 ${item.featured ? 'text-purple-200' : ''
                                        }`}>
                                        {item.name}
                                    </span>
                                    {item.featured && (
                                        <span className="text-xs bg-orange-500 text-white px-1.5 py-0.5 rounded-full font-semibold ml-1">HOT</span>
                                    )}
                                    <ChevronDown
                                        size={14}
                                        className={`text-purple-300 transition-transform duration-300 ${activeSubmenu === index ? 'rotate-180' : 'group-hover:rotate-180'
                                            }`}
                                    />
                                </Link>

                                {/* Desktop Submenu */}
                                <div className={`absolute top-full left-0 mt-2 w-56 bg-white/95 backdrop-blur-lg rounded-xl shadow-2xl border border-white/20 overflow-hidden transition-all duration-300 transform ${activeSubmenu === index
                                    ? 'opacity-100 translate-y-0 visible'
                                    : 'opacity-0 translate-y-2 invisible'
                                    }`}
                                    style={{ maxHeight: '400px' }}
                                >
                                    <div className="py-2 max-h-96 overflow-y-auto custom-scrollbar">
                                        {item.submenu.map((subItem, subIndex) => (
                                            <Link
                                                key={subItem.name}
                                                href={subItem.href}
                                                className="block px-4 py-3 text-gray-800 hover:bg-gradient-to-r hover:from-purple-50 hover:to-purple-100 hover:text-purple-800 transition-all duration-200 text-sm font-medium border-l-2 border-transparent hover:border-purple-500"
                                                style={{
                                                    animationDelay: `${subIndex * 50}ms`,
                                                    animation: activeSubmenu === index ? 'slideInFromTop 0.3s ease-out forwards' : 'none'
                                                }}
                                            >
                                                {subItem.name}
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </nav>

                    {/* Center: Enhanced Search Bar */}
                    <div className="hidden md:flex flex-1 max-w-2xl mx-6 justify-center lg:max-w-md">
                        <div className={`relative w-full group transition-all duration-300 ${searchFocused ? 'scale-105' : ''}`}>
                            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                            <div className="relative bg-white/95 backdrop-blur-sm rounded-full shadow-lg group-hover:shadow-xl group-hover:shadow-purple-500/25 transition-all duration-300 border border-white/20">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-5 pointer-events-none">
                                    <Search className={`w-5 h-5 transition-all duration-300 ${searchFocused ? 'text-purple-600 scale-110' : 'text-gray-500 group-hover:text-purple-500'}`} />
                                </div>
                                <input
                                    type="text"
                                    placeholder="Search jewelry..."
                                    className="w-full bg-transparent text-sm rounded-full pl-12 pr-20 py-3 outline-none placeholder:text-gray-400 focus:placeholder:text-gray-300 text-gray-800 transition-all duration-300"
                                    onFocus={() => setSearchFocused(true)}
                                    onBlur={() => setSearchFocused(false)}
                                />
                                <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white px-4 py-1.5 rounded-full text-sm font-semibold transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg hover:shadow-purple-500/30">
                                    Search
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Right: Enhanced Icons */}
                    <div className="flex items-center space-x-1 sm:space-x-2">
                        {/* Wishlist */}
                        <button className="relative p-2.5 rounded-xl hover:bg-purple-700/30 transition-all duration-300 hover:scale-110 active:scale-95 group">
                            <Heart size={22} className="text-white group-hover:text-pink-300 transition-all duration-300 group-hover:scale-110" />
                            <span className="absolute -top-1 -right-1 bg-gradient-to-r from-pink-500 to-rose-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-semibold shadow-lg animate-pulse">
                                3
                            </span>
                            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-pink-500/20 to-rose-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </button>

                        {/* Shopping Bag */}
                        <button className="relative p-2.5 rounded-xl hover:bg-purple-700/30 transition-all duration-300 hover:scale-110 active:scale-95 group">
                            <ShoppingBag size={22} className="text-white group-hover:text-purple-300 transition-all duration-300 group-hover:scale-110" />
                            <span className="absolute -top-1 -right-1 bg-gradient-to-r from-purple-500 to-indigo-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-semibold shadow-lg">
                                5
                            </span>
                            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500/20 to-indigo-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </button>

                        {/* User Profile */}
                        <div
                            className="relative"
                            onMouseEnter={() => setUserMenuOpen(true)}
                            onMouseLeave={() => setUserMenuOpen(false)}
                        >
                            {isLoggedIn ? (
                                <button
                                    className="relative p-2.5 rounded-xl hover:bg-purple-700/30 transition-all duration-300 hover:scale-110 active:scale-95 group cursor-default"
                                    disabled
                                    type="button"
                                >
                                    <User size={24} className="text-white group-hover:text-blue-300 transition-all duration-300 group-hover:scale-110" />
                                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/20 to-cyan-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                </button>
                            ) : (
                                <Link href={'/profile'}>
                                    <button className="relative p-2.5 rounded-xl hover:bg-purple-700/30 transition-all duration-300 hover:scale-110 active:scale-95 group">
                                        <User size={24} className="text-white group-hover:text-blue-300 transition-all duration-300 group-hover:scale-110" />
                                        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/20 to-cyan-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                    </button>
                                </Link>
                            )}
                            {isLoggedIn && userMenuOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-white text-purple-700 rounded-xl shadow-lg border border-purple-200 z-50 transition-all duration-200" style={{ top: '100%' }}>
                                    <div className="px-4 py-2 border-b border-purple-100 text-sm font-medium text-gray-700">
                                        {userInfo?.name || userInfo?.email || 'Account'}
                                    </div>
                                    <button
                                        onClick={handleLogout}
                                        className="w-full text-left px-4 py-2 font-semibold hover:bg-purple-50 rounded-b-xl transition-all duration-200"
                                    >
                                        Logout
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* Mobile Search */}
                        <button className="md:hidden p-2.5 rounded-xl hover:bg-purple-700/30 transition-all duration-300 hover:scale-110 active:scale-95 group">
                            <Search size={22} className="text-white group-hover:text-purple-300 transition-all duration-300" />
                        </button>
                    </div>
                </div>

                {/* Enhanced Mobile menu - FIXED SCROLLBAR VERSION */}
                <div className={`lg:hidden transition-all duration-500 ease-out ${isOpen ? 'opacity-100 mt-4' : 'opacity-0 mt-0 pointer-events-none'
                    }`}>
                    {/* Fixed height container with scroll */}
                    <div className={`bg-gradient-to-b from-[#31135E]/95 to-[#2A0E52]/95 backdrop-blur-lg rounded-2xl border border-purple-500/20 shadow-2xl transition-all duration-500 ${isOpen ? 'max-h-[calc(100vh-120px)]' : 'max-h-0'
                        } overflow-hidden`}>
                        {/* Scrollable content */}
                        <div className="overflow-y-auto max-h-[calc(100vh-120px)] custom-scrollbar">
                            <nav className="p-6">
                                {/* Mobile Search */}
                                <div className="mb-6 md:hidden">
                                    <div className="relative group">
                                        <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                                            <Search className="text-gray-500 w-5 h-5 group-focus-within:text-purple-600 transition-colors" />
                                        </div>
                                        <input
                                            type="text"
                                            placeholder="Search jewelry..."
                                            className="w-full bg-white/95 backdrop-blur-sm text-sm rounded-xl pl-12 pr-5 py-3 outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-purple-500 shadow-lg transition-all duration-300 border border-white/20"
                                        />
                                    </div>
                                </div>

                                {/* Navigation Items with Mobile Submenus */}
                                <ul className="flex flex-col space-y-2 mb-6">
                                    {navItems.map((item, index) => (
                                        <li key={item.name}
                                            className="transform transition-all duration-300"
                                            style={{
                                                animationDelay: `${index * 100}ms`,
                                                animation: isOpen ? 'slideInLeft 0.5s ease-out forwards' : 'none'
                                            }}
                                        >
                                            {/* Main Menu Item */}
                                            <div className="flex items-center">
                                                <Link
                                                    href={item.href}
                                                    className={`flex-1 flex items-center px-4 py-3 rounded-xl transition-all duration-300 hover:bg-gradient-to-r hover:from-purple-700/30 hover:to-purple-600/30 group ${item.featured ? 'bg-gradient-to-r from-purple-600/20 to-pink-600/20 border border-purple-500/30' : ''
                                                        }`}
                                                >
                                                    <span className={`text-white font-medium text-base transition-all duration-300 group-hover:text-purple-200 ${item.featured ? 'text-purple-200' : ''
                                                        }`}>
                                                        {item.name}
                                                    </span>
                                                    {item.featured && (
                                                        <div className="flex items-center space-x-1 ml-2">
                                                            <TrendingUp size={16} className="text-orange-400" />
                                                            <span className="text-xs bg-orange-500 text-white px-2 py-1 rounded-full font-semibold">HOT</span>
                                                        </div>
                                                    )}
                                                </Link>

                                                {/* Submenu Toggle Button */}
                                                <button
                                                    onClick={() => toggleMobileSubmenu(index)}
                                                    className="p-3 rounded-xl hover:bg-purple-700/30 transition-all duration-300 ml-2"
                                                >
                                                    <ChevronDown
                                                        size={16}
                                                        className={`text-purple-300 transition-transform duration-300 ${mobileActiveSubmenu === index ? 'rotate-180' : ''
                                                            }`}
                                                    />
                                                </button>
                                            </div>

                                            {/* Mobile Submenu with Enhanced Scrollbar */}
                                            <div className={`overflow-hidden transition-all duration-300 ${mobileActiveSubmenu === index ? 'max-h-96 opacity-100 mt-2' : 'max-h-0 opacity-0'
                                                }`}>
                                                <div className="ml-4 max-h-80 overflow-y-auto custom-scrollbar-mobile">
                                                    <div className="pl-4 border-l-2 border-purple-500/30 space-y-1 pr-2">
                                                        {item.submenu.map((subItem, subIndex) => (
                                                            <Link
                                                                key={subItem.name}
                                                                href={subItem.href}
                                                                className="block px-4 py-2 text-purple-200 hover:text-white hover:bg-purple-700/20 rounded-lg transition-all duration-200 text-sm"
                                                                style={{
                                                                    animationDelay: `${subIndex * 100}ms`,
                                                                    animation: mobileActiveSubmenu === index ? 'slideInLeft 0.3s ease-out forwards' : 'none'
                                                                }}
                                                            >
                                                                <div className="flex items-center space-x-2">
                                                                    <ChevronRight size={14} />
                                                                    <span>{subItem.name}</span>
                                                                </div>
                                                            </Link>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                    ))}
                                </ul>

                                {/* Auth Buttons */}
                                <div className="pt-4 border-t border-purple-700/50">
                                    {isLoggedIn ? (
                                        <div className="flex flex-col space-y-3">
                                            <div className="w-full bg-white text-purple-700 rounded-xl shadow-lg border border-purple-200 px-4 py-3 text-center mb-2">
                                                <div className="font-medium text-gray-700 text-sm mb-1">
                                                    {userInfo?.name || userInfo?.email || 'Account'}
                                                </div>
                                                <button
                                                    onClick={handleLogout}
                                                    className="w-full text-center px-4 py-2 font-semibold hover:bg-purple-50 rounded-xl transition-all duration-200 mt-2"
                                                >
                                                    Logout
                                                </button>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="flex flex-col space-y-3">
                                            <button className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg hover:shadow-purple-500/30">
                                                <div className="flex items-center justify-center space-x-2">
                                                    <User size={18} />
                                                    <span>Sign In</span>
                                                </div>
                                            </button>
                                            <button className="w-full bg-white/10 backdrop-blur-sm border border-white/20 text-white py-3 rounded-xl font-semibold transition-all duration-300 hover:bg-white/20 hover:scale-105 active:scale-95">
                                                Register Now
                                            </button>
                                        </div>
                                    )}
                                </div>

                                {/* Quick Stats */}
                                <div className="mt-6 pt-4 border-t border-purple-700/50">
                                    <div className="grid grid-cols-3 gap-4 text-center">
                                        <div className="text-purple-200">
                                            <div className="text-xl font-bold">1K+</div>
                                            <div className="text-xs opacity-75">Products</div>
                                        </div>
                                        <div className="text-purple-200">
                                            <div className="text-xl font-bold flex items-center justify-center">
                                                4.8 <Star size={14} className="ml-1 text-yellow-400" />
                                            </div>
                                            <div className="text-xs opacity-75">Rating</div>
                                        </div>
                                        <div className="text-purple-200">
                                            <div className="text-xl font-bold">24/7</div>
                                            <div className="text-xs opacity-75">Support</div>
                                        </div>
                                    </div>
                                </div>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
            @keyframes slideInLeft {
                from {
                    opacity: 0;
                    transform: translateX(-20px);
                }
                to {
                    opacity: 1;
                    transform: translateX(0);
                }
            }
            
            @keyframes slideInFromTop {
                from {
                    opacity: 0;
                    transform: translateY(-10px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }

            /* Enhanced Custom scrollbar styles */
            .custom-scrollbar {
                scrollbar-width: thin;
                scrollbar-color: rgba(147, 51, 234, 0.6) rgba(147, 51, 234, 0.1);
            }
            
            .custom-scrollbar::-webkit-scrollbar {
                width: 6px;
            }
            
            .custom-scrollbar::-webkit-scrollbar-track {
                background: rgba(147, 51, 234, 0.1);
                border-radius: 3px;
            }
            
            .custom-scrollbar::-webkit-scrollbar-thumb {
                background: rgba(147, 51, 234, 0.6);
                border-radius: 3px;
                transition: background 0.3s ease;
            }
            
            .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                background: rgba(147, 51, 234, 0.8);
            }

            /* Mobile submenu specific scrollbar */
            .custom-scrollbar-mobile {
                scrollbar-width: thin;
                scrollbar-color: rgba(147, 51, 234, 0.7) rgba(147, 51, 234, 0.2);
            }
            
            .custom-scrollbar-mobile::-webkit-scrollbar {
                width: 4px;
            }
            
            .custom-scrollbar-mobile::-webkit-scrollbar-track {
                background: rgba(147, 51, 234, 0.2);
                border-radius: 2px;
            }
            
            .custom-scrollbar-mobile::-webkit-scrollbar-thumb {
                background: rgba(147, 51, 234, 0.7);
                border-radius: 2px;
                transition: background 0.3s ease;
            }
            
            .custom-scrollbar-mobile::-webkit-scrollbar-thumb:hover {
                background: rgba(147, 51, 234, 0.9);
            }

            /* Ensure smooth scrolling on mobile */
            @media (max-width: 1024px) {
                .overflow-y-auto {
                    -webkit-overflow-scrolling: touch;
                    scroll-behavior: smooth;
                }
                
                /* Enhanced mobile scrollbar visibility */
                .custom-scrollbar-mobile::-webkit-scrollbar {
                    width: 5px;
                }
                
                .custom-scrollbar-mobile::-webkit-scrollbar-thumb {
                    background: rgba(147, 51, 234, 0.8);
                    border-radius: 2.5px;
                }
            }

            /* For very small screens, make scrollbar more visible */
            @media (max-width: 480px) {
                .custom-scrollbar-mobile::-webkit-scrollbar {
                    width: 6px;
                }
                
                .custom-scrollbar-mobile::-webkit-scrollbar-thumb {
                    background: rgba(147, 51, 234, 0.9);
                }
            }
        `}</style>
        </header>
    );
};

export default Navbar;