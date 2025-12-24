'use client'
import React from "react";
import { assets } from "@/assets/assets";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="w-full bg-white dark:bg-gray-950 border-t border-gray-100 dark:border-gray-900 transition-colors duration-300">
      <div className="flex flex-col md:flex-row items-start justify-between px-4 md:px-10 lg:px-16 max-w-[1440px] mx-auto gap-12 py-16">
        
        {/* Brand Section */}
        <div className="flex flex-col md:w-1/3 w-full">
          <Image 
            className="w-32 md:w-36 transition-opacity hover:opacity-80 cursor-pointer dark:invert" 
            src={assets.logo} 
            alt="logo" 
          />
          <p className="mt-6 text-sm md:text-base text-gray-500 dark:text-gray-400 leading-relaxed max-w-sm">
            Elevating your digital lifestyle with premium sound and gaming gear. 
            Join thousands of gamers who trust us for quality, speed, and 
            unparalleled performance.
          </p>
          
          {/* Social Icons */}
          <div className="flex gap-4 mt-6">
             <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-900 flex items-center justify-center hover:bg-orange-50 dark:hover:bg-orange-950/30 hover:text-orange-600 transition-colors cursor-pointer text-gray-400 dark:text-gray-500">
                <i className="fab fa-facebook-f text-xs"></i>
             </div>
             <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-900 flex items-center justify-center hover:bg-orange-50 dark:hover:bg-orange-950/30 hover:text-orange-600 transition-colors cursor-pointer text-gray-400 dark:text-gray-500">
                <i className="fab fa-twitter text-xs"></i>
             </div>
             <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-900 flex items-center justify-center hover:bg-orange-50 dark:hover:bg-orange-950/30 hover:text-orange-600 transition-colors cursor-pointer text-gray-400 dark:text-gray-500">
                <i className="fab fa-instagram text-xs"></i>
             </div>
          </div>
        </div>

        {/* Links Sections Container */}
        <div className="flex flex-row flex-1 w-full justify-between md:justify-around">
          
          {/* Company Links */}
          <div className="flex flex-col">
            <h2 className="font-bold text-gray-900 dark:text-white mb-6 uppercase tracking-widest text-xs">Company</h2>
            <ul className="text-sm md:text-base text-gray-500 dark:text-gray-400 space-y-3">
              <li>
                <a className="hover:text-orange-600 dark:hover:text-orange-500 transition-colors flex items-center group" href="/">
                  <span className="w-0 group-hover:w-2 h-0.5 bg-orange-600 mr-0 group-hover:mr-2 transition-all"></span>
                  Home
                </a>
              </li>
              <li>
                <a className="hover:text-orange-600 dark:hover:text-orange-500 transition-colors flex items-center group" href="#">
                  <span className="w-0 group-hover:w-2 h-0.5 bg-orange-600 mr-0 group-hover:mr-2 transition-all"></span>
                  About us
                </a>
              </li>
              <li>
                <a className="hover:text-orange-600 dark:hover:text-orange-500 transition-colors flex items-center group" href="#">
                  <span className="w-0 group-hover:w-2 h-0.5 bg-orange-600 mr-0 group-hover:mr-2 transition-all"></span>
                  Contact us
                </a>
              </li>
              <li>
                <a className="hover:text-orange-600 dark:hover:text-orange-500 transition-colors flex items-center group" href="#">
                  <span className="w-0 group-hover:w-2 h-0.5 bg-orange-600 mr-0 group-hover:mr-2 transition-all"></span>
                  Privacy policy
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Section */}
          <div className="flex flex-col">
            <h2 className="font-bold text-gray-900 dark:text-white mb-6 uppercase tracking-widest text-xs">Get in touch</h2>
            <div className="text-sm md:text-base text-gray-500 dark:text-gray-400 space-y-3">
              <p className="hover:text-gray-900 dark:hover:text-gray-200 cursor-pointer transition-colors">+1-234-567-890</p>
              <p className="hover:text-gray-900 dark:hover:text-gray-200 cursor-pointer transition-colors">contact@greatstack.dev</p>
              <div className="pt-2">
                <p className="text-xs font-semibold text-gray-400 dark:text-gray-500 transition-colors">Support Hours:</p>
                <p className="text-xs dark:text-gray-400">Mon - Fri, 9:00AM - 6:00PM</p>
              </div>
            </div>
          </div>
          
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="w-full bg-gray-50 dark:bg-gray-900/50 border-t border-gray-100 dark:border-gray-900 transition-colors duration-500">
        <div className="max-w-[1440px] mx-auto px-4 md:px-10 lg:px-16 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs md:text-sm text-gray-400 dark:text-gray-500 font-medium text-center">
            Copyright 2025 © <span className="text-gray-600 dark:text-gray-300">GreatStack.dev</span> All Rights Reserved.
          </p>
          <div className="flex items-center gap-6 opacity-50 dark:opacity-30 grayscale hover:grayscale-0 transition-all cursor-pointer dark:text-white">
              <span className="text-[10px] font-bold tracking-tighter">VISA</span>
              <span className="text-[10px] font-bold tracking-tighter">MASTERCARD</span>
              <span className="text-[10px] font-bold tracking-tighter">PAYPAL</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;