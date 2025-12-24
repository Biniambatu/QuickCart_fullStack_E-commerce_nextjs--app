'use client'
import React from "react";

const NewsLetter = () => {
  return (
    <section className="px-4 md:px-10 lg:px-16 max-w-[1440px] mx-auto mb-20 transition-colors duration-300">
      <div className="relative flex flex-col items-center justify-center text-center bg-gray-50 dark:bg-gray-900/50 border border-transparent dark:border-gray-800 rounded-[2.5rem] py-16 px-6 overflow-hidden transition-colors duration-500">
        
        {/* Subtle Background Glow - Adjusted for Dark Mode */}
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-orange-100 dark:bg-orange-600/10 rounded-full blur-3xl opacity-50"></div>
        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-blue-100 dark:bg-blue-600/10 rounded-full blur-3xl opacity-50"></div>

        <div className="z-10 space-y-4">
          <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight transition-colors">
            Subscribe & Get <span className="text-orange-600">20% Off</span>
          </h2>
          <p className="md:text-lg text-gray-500 dark:text-gray-400 max-w-lg mx-auto leading-relaxed transition-colors">
            Join our community to receive exclusive deals, early access to new drops, and professional gaming tips.
          </p>
        </div>

        {/* Form Container */}
        <form 
          onSubmit={(e) => e.preventDefault()}
          className="z-10 mt-10 flex items-center max-w-xl w-full bg-white dark:bg-gray-800 p-1.5 rounded-full border border-gray-200 dark:border-gray-700 shadow-sm focus-within:border-orange-600 focus-within:ring-4 focus-within:ring-orange-600/5 dark:focus-within:ring-orange-600/20 transition-all"
        >
          <input
            className="flex-1 bg-transparent border-none outline-none px-6 py-3 text-gray-700 dark:text-gray-200 placeholder:text-gray-400 w-full"
            type="email"
            required
            placeholder="Enter your email address"
          />
          <button className="hidden sm:block px-10 py-3.5 text-white bg-orange-600 hover:bg-orange-700 font-bold rounded-full transition-all active:scale-95 shadow-md">
            Subscribe
          </button>
        </form>

        {/* Mobile Button */}
        <button className="sm:hidden mt-4 w-full py-4 text-white bg-orange-600 font-bold rounded-full transition-all active:scale-95">
          Subscribe
        </button>

        <p className="mt-6 text-xs text-gray-400 dark:text-gray-500 transition-colors">
          By subscribing, you agree to our <span className="underline cursor-pointer">Privacy Policy</span> and Terms of Service.
        </p>
      </div>
    </section>
  );
};

export default NewsLetter;