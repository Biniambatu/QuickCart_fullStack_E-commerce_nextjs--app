'use client'
import React from 'react'
import { assets } from '@/assets/assets'
import Image from 'next/image';
import { useAppContext } from '@/context/AppContext';

const ProductCard = ({ product }: any) => {

    const { currency, router } = useAppContext() as any

    return (
        <div
            onClick={() => { router.push('/product/' + product._id); scrollTo(0, 0) }}
            className="group flex flex-col items-start w-full cursor-pointer transition-all duration-300"
        >
            {/* Image Container */}
            <div className="relative bg-[#F5F5F5] dark:bg-gray-800 rounded-2xl w-full aspect-[4/5] flex items-center justify-center overflow-hidden transition-colors duration-300">
                <Image
                    src={product.image && product.image[0] ? product.image[0] : assets.upload_area}
                    alt={product.name || 'product Image'}
                    className="group-hover:scale-110 transition-transform duration-500 object-contain p-4 w-full h-full mix-blend-multiply dark:mix-blend-normal dark:brightness-90"
                    width={600} 
                    height={600}
                />

                {/* Wishlist Button */}
                <button 
                    onClick={(e) => { e.stopPropagation(); /* Add wishlist logic */ }}
                    className="absolute top-3 right-3 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm p-2 rounded-full shadow-sm hover:bg-white dark:hover:bg-gray-700 hover:scale-110 transition-all z-10"
                >
                    <Image
                        className="h-4 w-4 dark:invert"
                        src={assets.heart_icon}
                        alt="wishlist"
                    />
                </button>

                {/* Quick Add Overlay */}
                <div className="absolute bottom-0 left-0 right-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-black/5 dark:bg-white/5 backdrop-blur-[2px] p-3 flex justify-center z-10">
                    <button className="w-full py-2 bg-white dark:bg-gray-900 text-black dark:text-white text-xs font-bold rounded-lg shadow-md hover:bg-orange-600 dark:hover:bg-orange-600 hover:text-white transition-colors">
                        QUICK VIEW
                    </button>
                </div>
            </div>

            {/* Product Info */}
            <div className="w-full pt-4 px-1">
                <p className="text-sm md:text-base font-semibold text-gray-900 dark:text-gray-100 truncate transition-colors">
                    {product.name}
                </p>
                
                <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-1 mt-0.5 transition-colors">
                    {product.description}
                </p>

                {/* Rating */}
                <div className="flex items-center gap-1.5 mt-2">
                    <div className="flex items-center">
                        {[...Array(5)].map((_, index) => (
                            <Image
                                key={index}
                                className={`h-2.5 w-2.5 ${index < 4 ? '' : 'opacity-30 dark:invert'}`}
                                src={index < 4 ? assets.star_icon : assets.star_dull_icon}
                                alt="rating"
                            />
                        ))}
                    </div>
                    <span className="text-[10px] font-bold text-gray-400 dark:text-gray-500">(45)</span>
                </div>

                {/* Price and CTA */}
                <div className="flex items-center justify-between w-full mt-3">
                    <div className="flex items-baseline gap-1">
                        <span className="text-xs font-bold text-orange-600">{currency}</span>
                        <span className="text-lg font-bold text-gray-900 dark:text-white transition-colors">{product.offerPrice}</span>
                    </div>
                    
                    <button className="h-8 w-8 flex items-center justify-center rounded-full border border-gray-200 dark:border-gray-700 hover:bg-orange-600 dark:hover:bg-orange-600 hover:border-orange-600 transition-all group/btn">
                        <Image 
                            src={assets.arrow_icon} 
                            alt="buy" 
                            className="w-2.5 dark:invert group-hover/btn:brightness-0 group-hover/btn:invert transition-all"
                        />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ProductCard