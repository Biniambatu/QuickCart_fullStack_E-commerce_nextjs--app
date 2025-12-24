"use client"
import React, { useState, useEffect } from "react";
import { assets } from "../assets/assets";
import Image from "next/image";

const HeaderSlider = () => {
  const sliderData = [
    {
      id: 1,
      title: "Experience Pure Sound - Your Perfect Headphones Await!",
      offer: "Limited Time Offer 30% Off",
      buttonText1: "Buy now",
      buttonText2: "Find more",
      imgSrc: assets.header_headphone_image,
      // We use Tailwind classes instead of raw hex codes for speed
      lightBg: "bg-[#E6E9F2]",
      darkBg: "dark:bg-[#1a1c2e]"
    },
    {
      id: 2,
      title: "Next-Level Gaming Starts Here - Discover PlayStation 5 Today!",
      offer: "Hurry up only few left!",
      buttonText1: "Shop Now",
      buttonText2: "Explore Deals",
      imgSrc: assets.header_playstation_image,
      lightBg: "bg-[#e6f2f2]",
      darkBg: "dark:bg-[#162626]"
    },
    {
      id: 3,
      title: "Power Meets Elegance - Apple MacBook Pro is Here for you!",
      offer: "Exclusive Deal 40% Off",
      buttonText1: "Order Now",
      buttonText2: "Learn More",
      imgSrc: assets.header_macbook_image,
      lightBg: "bg-[#f2e6e6]",
      darkBg: "dark:bg-[#261a1a]"
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sliderData.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [sliderData.length]);

  return (
    <div className="relative w-full overflow-hidden group">
      <div
        className="flex transition-transform duration-1000 ease-[cubic-bezier(0.7,0,0.3,1)]"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {sliderData.map((slide, index) => (
          <div key={slide.id} className="min-w-full px-4 md:px-10">
            {/* The background color is now handled entirely by Tailwind classes */}
            <div 
              className={`flex flex-col-reverse md:flex-row items-center justify-between py-10 md:py-16 md:px-20 px-6 mt-6 rounded-3xl transition-colors duration-300 ${slide.lightBg} ${slide.darkBg}`}
            >
              {/* Text Content */}
              <div className={`md:pl-8 mt-10 md:mt-0 transition-all duration-1000 delay-300 ${currentSlide === index ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                <p className="font-medium uppercase tracking-widest text-sm md:text-base text-orange-600 pb-2">
                  {slide.offer}
                </p>
                <h1 className="max-w-lg text-3xl md:text-5xl md:leading-[1.2] font-bold text-gray-900 dark:text-white transition-colors">
                  {slide.title}
                </h1>
                
                <div className="flex items-center gap-4 mt-8">
                  <button className="px-8 md:px-10 py-3 md:py-4 bg-orange-600 hover:bg-orange-700 transition-all rounded-full text-white font-semibold shadow-lg shadow-orange-200 dark:shadow-none active:scale-95">
                    {slide.buttonText1}
                  </button>
                  <button className="group flex items-center gap-2 px-6 py-3 font-semibold text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white transition">
                    {slide.buttonText2}
                    <Image 
                      className="group-hover:translate-x-2 transition-transform duration-300 dark:invert" 
                      src={assets.arrow_icon} 
                      alt="arrow_icon" 
                    />
                  </button>
                </div>
              </div>

              {/* Image Content */}
              <div className={`flex flex-1 justify-center items-center transition-all duration-1000 delay-500 ${currentSlide === index ? 'opacity-100 scale-100 rotate-0' : 'opacity-0 scale-90 rotate-3'}`}>
                <Image
                  className="w-60 md:w-[400px] object-contain drop-shadow-2xl dark:brightness-90"
                  src={slide.imgSrc}
                  alt={slide.title}
                  priority={index === 0}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-3">
        {sliderData.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`transition-all duration-500 rounded-full ${
              currentSlide === index ? "w-8 h-2 bg-orange-600" : "w-2 h-2 bg-gray-400 dark:bg-gray-600 opacity-50 hover:opacity-100"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeaderSlider;