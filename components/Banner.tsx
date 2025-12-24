'use client'
import Image from 'next/image';
import { assets } from '../assets/assets'

const Banner = () => {
  return (
    <section className="px-4 md:px-10 lg:px-16 max-w-[1440px] mx-auto transition-colors duration-300">
      <div className="relative flex flex-col md:flex-row items-center justify-between bg-[#E6E9F2] dark:bg-slate-900 my-16 rounded-[2rem] overflow-hidden min-h-[400px] transition-colors duration-500">
        
        {/* Background Decorative Element */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10 dark:opacity-20 pointer-events-none">
            <div className="absolute top-[-10%] left-[-5%] w-64 h-64 bg-white dark:bg-blue-500 rounded-full blur-3xl"></div>
            <div className="absolute bottom-[-10%] right-[-5%] w-96 h-96 bg-orange-200 dark:bg-orange-500 rounded-full blur-3xl"></div>
        </div>

        {/* Left Image - JBL Box */}
        <div className="z-10 md:pl-10 lg:pl-20 mt-10 md:mt-0 transition-transform duration-700 hover:scale-110">
          <Image
            className="w-48 md:w-64 lg:w-72 drop-shadow-2xl dark:brightness-90"
            src={assets.jbl_soundbox_image}
            alt="jbl_soundbox_image"
          />
        </div>

        {/* Center Text Content */}
        <div className="z-10 flex flex-col items-center justify-center text-center py-10 md:py-0 px-6">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white leading-tight max-w-[450px] transition-colors">
            Level Up Your <span className="text-orange-600">Gaming</span> Experience
          </h2>
          <p className="mt-4 max-w-[400px] text-base md:text-lg font-medium text-gray-600 dark:text-gray-300 transition-colors">
            From immersive sound to precise controls—everything you need to win.
          </p>
          <button className="mt-8 group flex items-center justify-center gap-3 px-10 py-4 bg-orange-600 hover:bg-orange-700 rounded-full text-white font-bold transition-all shadow-xl shadow-orange-200 dark:shadow-orange-900/20 active:scale-95">
            Buy now
            <Image 
              className="group-hover:translate-x-1.5 transition-transform duration-300" 
              src={assets.arrow_icon_white} 
              alt="arrow_icon_white" 
            />
          </button>
        </div>

        {/* Right Image - Controller */}
        <div className="z-10 flex items-end justify-center md:justify-end">
          {/* Desktop Controller */}
          <Image
            className="hidden md:block w-72 lg:w-96 drop-shadow-2xl transition-transform duration-700 hover:-rotate-6 hover:scale-105 dark:brightness-90"
            src={assets.md_controller_image}
            alt="md_controller_image"
          />
          {/* Mobile Controller */}
          <Image
            className="md:hidden w-64 pb-8 drop-shadow-xl dark:brightness-90"
            src={assets.sm_controller_image}
            alt="sm_controller_image"
          />
        </div>

      </div>
    </section>
  )
}

export default Banner