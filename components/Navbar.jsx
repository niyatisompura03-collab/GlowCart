"use client"
import React, { useEffect, useState } from "react";
import { assets } from "@/assets/assets";
import Link from "next/link"
import { useAppContext } from "@/context/AppContext";
import Image from "next/image";

const Navbar = () => {

  const { isSeller, router } = useAppContext();
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('theme') === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark');
      setIsDarkMode(true);
    } else {
      document.documentElement.classList.remove('dark');
      setIsDarkMode(false);
    }
  }, []);

  const toggleTheme = () => {
    if (isDarkMode) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      setIsDarkMode(false);
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      setIsDarkMode(true);
    }
  }

  return (
    <nav className="sticky top-0 z-50 px-4 md:px-12 lg:px-24 py-2 border-b border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-200 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md transition-all">
      <div className="flex items-center justify-between max-w-7xl mx-auto">

        {/* Left Side: Toggle and Logo */}
        <div className="flex flex-1 items-center justify-start gap-4">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label="Toggle Theme"
          >
            {isDarkMode ? (
              <svg className="w-5 h-5 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.364l-.707-.707M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            ) : (
              <svg className="w-5 h-5 text-gray-700 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            )}
          </button>

          <Image
            className="cursor-pointer w-32 md:w-44 lg:w-48 h-auto object-contain"
            onClick={() => router.push('/')}
            src={assets.logo}
            alt="logo"
            priority
          />
        </div>

        {/* Center: Main Navigation Buttons */}
        <div className="hidden md:flex flex-[2] items-center justify-center gap-6 lg:gap-10 font-medium text-sm lg:text-base">
          <Link href="/" className="hover:text-primary dark:hover:text-primary transition-colors">
            Home
          </Link>
          <Link href="/all-products" className="hover:text-primary dark:hover:text-primary transition-colors">
            Shop
          </Link>
          {isSeller && (
            <button
              onClick={() => router.push('/seller')}
              className="text-xs lg:text-sm border border-primary/30 px-4 py-1.5 rounded-full hover:bg-primary/5 transition-all"
            >
              Seller Dashboard
            </button>
          )}
        </div>

        {/* Right Side: Search and Account */}
        <div className="flex flex-1 items-center justify-end gap-3 md:gap-6">
          <div className="hidden sm:flex items-center hover:text-primary transition-colors cursor-pointer group">
            <Image className="w-4 h-4 dark:invert group-hover:scale-110 transition-transform" src={assets.search_icon} alt="search icon" />
          </div>

          <button className="flex items-center gap-2 hover:text-primary transition-all group">
            <Image className="w-5 h-5 dark:invert group-hover:rotate-12 transition-transform" src={assets.user_icon} alt="user icon" />
            <span className="hidden lg:inline font-medium text-sm">Account</span>
          </button>

          {/* Mobile Menu Icon (Placeholder for functionality) */}
          <div className="md:hidden flex items-center">
            <Image className="w-6 h-6 dark:invert" src={assets.menu_icon} alt="menu_icon" />
          </div>
        </div>

      </div>
    </nav>
  );
};

export default Navbar;
