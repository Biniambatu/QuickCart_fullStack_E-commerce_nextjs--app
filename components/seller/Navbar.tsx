'use client'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { assets } from '../../assets/assets'
import { useAppContext } from '@/context/AppContext'
import { UserButton } from '@clerk/nextjs'

const Navbar = () => {
  const { router } = useAppContext() as any;
  const [isDark, setIsDark] = useState(false);

  // Synchronize state with the actual class on the HTML tag
  useEffect(() => {
    if (document.documentElement.classList.contains('dark')) {
      setIsDark(true);
    }
  }, []);

  const toggleDarkMode = () => {
    if (isDark) {
      document.documentElement.classList.remove('dark');
      setIsDark(false);
    } else {
      document.documentElement.classList.add('dark');
      setIsDark(true);
    }
  };

  return (
    <nav className='flex items-center px-4 md:px-16 lg:px-32 py-4 justify-between border-b border-gray-100 dark:border-gray-800 bg-white/80 dark:bg-gray-950/80 backdrop-blur-md sticky top-0 z-50 transition-colors'>
      
      {/* Left Side: Logo & Badge */}
      <div className='flex items-center gap-4'>
        <Image 
          onClick={() => router.push('/')} 
          className='w-28 lg:w-32 cursor-pointer hover:opacity-80 transition-opacity' 
          src={assets.logo} 
          alt="Logo" 
        />
        <div className='hidden sm:block h-6 w-[1px] bg-gray-200 dark:bg-gray-700 mx-2'></div>
        <span className='hidden sm:inline-block px-3 py-1 rounded-full bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-500 text-[10px] font-bold uppercase tracking-wider border border-orange-100 dark:border-orange-900/30'>
          Seller Panel
        </span>
      </div>

      {/* Right Side: Actions */}
      <div className='flex items-center gap-4 md:gap-8'>
        
        {/* Dark Mode Toggle */}
        <button 
          onClick={toggleDarkMode}
          className='p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-orange-100 dark:hover:bg-orange-900/30 transition-all active:scale-90'
          aria-label="Toggle Dark Mode"
        >
          {isDark ? (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-orange-500">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
            </svg>
          )}
        </button>

        <button 
          onClick={() => router.push('/')}
          className='hidden md:block text-sm font-medium text-gray-500 hover:text-orange-600 dark:text-gray-400 dark:hover:text-white transition-colors'
        >
          View Store
        </button>
        
        <div className='flex items-center gap-3'>
          <div className='p-1.5 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center border border-gray-200 dark:border-gray-700'>
             <UserButton afterSignOutUrl="/" />
          </div>
          
          <div className='hidden lg:flex flex-col'>
            <p className='text-xs font-bold text-gray-800 dark:text-gray-200'>Seller Account</p>
            <p className='text-[10px] text-gray-400'>Verified Partner</p>
          </div>
        </div>
      </div>

    </nav>
  )
}

export default Navbar