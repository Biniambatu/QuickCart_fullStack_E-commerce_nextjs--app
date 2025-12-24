'use client'
import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import ProductCard from "../../components/ProductCard";
import { useAppContext } from "@/context/AppContext";
import Image from "next/image";
import { assets } from "@/assets/assets";
import { ProductSkeleton } from "../../components/Skeleton";

const AllProduct = () => {
    const { products } = useAppContext() as { products: any };
    const [showFilters, setShowFilters] = useState(false);
    
    // Check if products are loading
    const isLoading = !products || products.length === 0;

    const categories = ["Headphone", "Earphone", "Watch", "Speaker", "Mobile"];

    return (
        <div className="min-h-screen bg-white dark:bg-gray-950 transition-colors duration-300">
            <Navbar />
            
            <div className="flex flex-col lg:flex-row px-6 md:px-16 lg:px-32 pt-12 gap-10">
                
                {/* --- Left Side: Filters --- */}
                <div className="min-w-60">
                    <button 
                        onClick={() => setShowFilters(!showFilters)}
                        className="flex items-center gap-2 text-xl font-semibold mb-5 lg:cursor-default text-gray-900 dark:text-white"
                    >
                        Filters
                        <Image 
                            src={assets.dropdown_arrow} 
                            className={`h-3 lg:hidden transition-transform dark:invert ${showFilters ? 'rotate-180' : ''}`} 
                            alt="" 
                        />
                    </button>

                    {/* Category Filter Box */}
                    <div className={`border border-gray-100 dark:border-gray-800 rounded-2xl p-6 bg-gray-50/50 dark:bg-gray-900/40 backdrop-blur-sm transition-all duration-300 ${showFilters ? '' : 'hidden lg:block'}`}>
                        <p className="mb-4 text-sm font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500">Categories</p>
                        <div className="flex flex-col gap-3 text-sm font-medium text-gray-700 dark:text-gray-300">
                            {categories.map((category) => (
                                <label key={category} className="flex items-center gap-3 cursor-pointer hover:text-orange-600 dark:hover:text-orange-500 transition-colors">
                                    <input type="checkbox" className="w-4 h-4 accent-orange-600 rounded border-gray-300 dark:border-gray-700 dark:bg-gray-800" value={category} />
                                    {category}
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Sort Filter Box */}
                    <div className={`border border-gray-100 dark:border-gray-800 rounded-2xl p-6 bg-gray-50/50 dark:bg-gray-900/40 backdrop-blur-sm mt-6 transition-all duration-300 ${showFilters ? '' : 'hidden lg:block'}`}>
                        <p className="mb-4 text-sm font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500">Sort By</p>
                        
                        <div className="relative group">
                            <select 
                                className="w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg py-2.5 px-4 outline-none text-sm font-medium text-gray-700 dark:text-gray-200 cursor-pointer appearance-none transition-all hover:border-orange-200 focus:border-orange-500 dark:focus:border-orange-500"
                            >
                                <option value="relevant">Relevant</option>
                                <option value="low-high">Price: Low to High</option>
                                <option value="high-low">Price: High to Low</option>
                            </select>
                            
                            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none transition-transform group-hover:translate-y-[-40%]">
                                <Image 
                                    src={assets.dropdown_arrow} 
                                    className="w-2.5 h-2.5 opacity-50 dark:invert" 
                                    alt="dropdown" 
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* --- Right Side: Product Grid --- */}
                <div className="flex-1">
                    <div className="flex flex-col sm:flex-row justify-between items-baseline gap-4 mb-8">
                        <div className="flex flex-col">
                            <h2 className="text-3xl font-bold text-gray-900 dark:text-white leading-tight">
                                Explore <span className="text-orange-600">All Products</span>
                            </h2>
                            <div className="w-12 h-1 bg-orange-600 mt-2 rounded-full"></div>
                        </div>
                        <p className="text-gray-400 dark:text-gray-500 text-sm font-medium">
                            {isLoading ? "Loading products..." : `Showing ${products.length} products`}
                        </p>
                    </div>

                    {/* Grid Section */}
                    <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 gap-y-10 pb-24">
                        {isLoading ? (
                            Array.from({ length: 8 }).map((_, index) => (
                                <ProductSkeleton key={index} />
                            ))
                        ) : products.length > 0 ? (
                            products.map((product: any, index: any) => (
                                <div key={product._id || index} className="hover:-translate-y-2 transition-transform duration-300">
                                    <ProductCard product={product} />
                                </div>
                            ))
                        ) : (
                            <div className="col-span-full py-20 text-center text-gray-400 dark:text-gray-600">
                                No products found matching your criteria.
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default AllProduct;