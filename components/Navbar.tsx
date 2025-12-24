"use client";
import Image from 'next/image'
import Link from 'next/link'
import React, { useState, useRef, useEffect } from 'react'
import { assets, BagIcon, BoxIcon, CartIcon, HomeIcon } from '../assets/assets'
import { useAppContext } from '@/context/AppContext';
import { useClerk, UserButton } from '@clerk/nextjs';
import { dark } from '@clerk/themes';

const Navbar = () => {
  const { router, isSeller, user }: any = useAppContext()
  const { openSignIn } = useClerk()

  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    } else {
      setIsDarkMode(false);
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    if (isDarkMode) {
      document.documentElement.classList.remove('dark');
      localStorage.theme = 'light';
      setIsDarkMode(false);
    } else {
      document.documentElement.classList.add('dark');
      localStorage.theme = 'dark';
      setIsDarkMode(true);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchVisible(false);
      }
    };

    if (isSearchVisible) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSearchVisible]);

  return (
    <nav className="sticky top-0 z-50 w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 transition-colors duration-300">
      <div className="flex items-center justify-between px-6 md:px-16 lg:px-32 py-4">
        
        <Image
          className="cursor-pointer w-28 md:w-32 active:scale-95 transition-transform dark:invert"
          onClick={() => router.push('/')}
          src={assets.logo}
          alt="logo"
        />

        <div className="hidden md:flex items-center gap-8 text-1xl font-medium text-gray-600 dark:text-gray-300">
          <Link href="/" className="hover:text-orange-600 transition-colors relative group">
            Home
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-orange-600 transition-all group-hover:w-full"></span>
          </Link>
          <Link href="/all-products" className="hover:text-orange-600 transition-colors relative group">
            Shop
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-orange-600 transition-all group-hover:w-full"></span>
          </Link>
          <Link href="/about-us" className="hover:text-orange-600 transition-colors relative group">
            About
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-orange-600 transition-all group-hover:w-full"></span>
          </Link>
          <Link href="/contact" className="hover:text-orange-600 transition-colors relative group">
            Contact
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-orange-600 transition-all group-hover:w-full"></span>
          </Link>
          
          {isSeller && (
            <button 
              onClick={() => router.push('/seller')} 
              className="text-xs font-semibold bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 px-4 py-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition active:scale-95 dark:text-gray-200"
            >
              Seller Dashboard
            </button>
          )}
        </div>
        <div className="hidden md:flex items-center gap-3">
          
          <button 
            onClick={toggleDarkMode}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-600 dark:text-gray-300"
          >
            {isDarkMode ? (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-orange-400">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M3 12h2.25m.386-6.364l1.591-1.591M12 7.5a4.5 4.5 0 100 9 4.5 4.5 0 000-9z" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
              </svg>
            )}
          </button>

          <div ref={searchRef} className="flex items-center">
            <div 
              className={`flex items-center bg-gray-100 dark:bg-gray-800 rounded-full transition-all duration-500 ease-in-out overflow-hidden ${
                isSearchVisible ? "w-48 lg:w-64 px-3 py-1.5 border border-gray-200 dark:border-gray-700 shadow-inner" : "w-0 px-0 py-0 border-transparent"
              }`}
            >
              <input
                type="text"
                placeholder="Search products..."
                className="bg-transparent border-none outline-none text-sm w-full px-2 text-gray-700 dark:text-gray-200 placeholder:text-gray-400"
                autoFocus={isSearchVisible}
              />
            </div>

            <button
              onClick={() => setIsSearchVisible(!isSearchVisible)}
              className={`p-2 rounded-full transition-all duration-300 ${
                isSearchVisible ? "text-orange-600 bg-orange-50 dark:bg-orange-900/20 ml-2" : "hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300"
              }`}
            >
              {isSearchVisible ? (
                <span className="w-5 h-5 flex items-center justify-center font-bold text-lg leading-none">×</span>
              ) : (
                <Image className="w-5 h-5 cursor-pointer dark:invert" src={assets.search_icon} alt="search" />
              )}
            </button>
          </div>
          
          {user ? (
            <div className="flex items-center border-l pl-3 ml-2 border-gray-300 dark:border-gray-700">
              <UserButton afterSignOutUrl="/">
                <UserButton.MenuItems>
                  <UserButton.Action label='Home' labelIcon={<HomeIcon/>} onClick={() => router.push('/')}/>
                  <UserButton.Action label='Products' labelIcon={<BoxIcon/>} onClick={() => router.push('/all-products')}/>
                  <UserButton.Action label='Cart' labelIcon={<CartIcon/>} onClick={() => router.push('/cart')}/>
                  <UserButton.Action label='My Orders' labelIcon={<BagIcon/>} onClick={() => router.push('/my-orders')}/>
                </UserButton.MenuItems>
              </UserButton>
            </div>
          ) : (
            <button 
              onClick={openSignIn as any} 
              className="flex items-center gap-2 bg-orange-600 text-white px-6 py-2.5 rounded-full hover:bg-orange-700 transition shadow-sm active:scale-95 ml-2"
            >
              <Image className='w-4 brightness-0 invert' src={assets.user_icon} alt="user" />
              <span className="text-sm font-medium">Login</span>
            </button>
          )}
        </div>

        {/* Mobile View */}
        <div className="flex items-center md:hidden gap-4">
          <button onClick={toggleDarkMode} className="text-gray-600 dark:text-gray-300">
             {isDarkMode ? '🌙' : '☀️'}
          </button>

          {isSeller && (
            <button 
              onClick={() => router.push('/seller')} 
              className="text-[10px] font-bold uppercase tracking-tight border border-gray-400 dark:border-gray-600 px-3 py-1 rounded-full dark:text-gray-300"
            >
              Seller
            </button>
          )}
          
          {user ? (
              <div className="flex items-center border-l pl-3 ml-2 border-gray-300 dark:border-gray-700">
                <UserButton 
                  afterSignOutUrl="/"
                  appearance={{
                    baseTheme: isDarkMode ? dark : undefined,
                    elements: {
                      userButtonPopoverCard: "dark:bg-gray-900 dark:border-gray-800",
                      userButtonMenuItem: "dark:hover:bg-gray-800",
                    }
                  }}
                >
                  <UserButton.MenuItems>
                    <UserButton.Action label='Home' labelIcon={<HomeIcon/>} onClick={() => router.push('/')}/>
                    <UserButton.Action label='Products' labelIcon={<BoxIcon/>} onClick={() => router.push('/all-products')}/>
                    <UserButton.Action label='Cart' labelIcon={<CartIcon/>} onClick={() => router.push('/cart')}/>
                    <UserButton.Action label='My Orders' labelIcon={<BagIcon/>} onClick={() => router.push('/my-orders')}/>
                  </UserButton.MenuItems>
                </UserButton>
              </div>
            ) : (
            <button onClick={openSignIn as any} className="p-2 bg-gray-100 dark:bg-gray-800 rounded-full">
              <Image 
                className='w-5 h-5 dark:invert transition-all' 
                src={assets.user_icon} 
                alt="user" 
              />
            </button>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar