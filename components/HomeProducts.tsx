"use client";
import { useAppContext } from "@/context/AppContext";
import ProductCard from "./ProductCard";
import { ProductSkeleton } from "../components/Skeleton"; 

const HomeProducts = () => {
  const { products, router } = useAppContext() as any;
  
  const isLoading = !products || products.length === 0;

  return (
    <section className="flex flex-col items-center pt-20 px-4 md:px-10 lg:px-16 max-w-[1440px] mx-auto w-full transition-colors duration-300">
      
      {/* Section Header */}
      <div className="flex items-center justify-between w-full mb-12 px-2">
        <div className="flex flex-col gap-1">
          <h2 className="text-2xl md:text-4xl font-bold text-gray-900 dark:text-white tracking-tight">
            Popular Products
          </h2>
          <div className="w-16 h-1.5 bg-orange-600 rounded-full"></div>
        </div>
        
        <button 
          onClick={() => router.push('/all-products')}
          className="text-orange-600 font-bold hover:text-orange-700 transition-colors flex items-center gap-2 group text-sm md:text-base uppercase tracking-wider"
        >
          View All 
          <span className="group-hover:translate-x-2 transition-transform duration-300">→</span>
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-y-12 gap-x-5 md:gap-x-8 w-full mb-20">
        {isLoading ? (
          Array.from({ length: 10 }).map((_, index) => (
            <ProductSkeleton key={index} />
          ))
        ) : products.length > 0 ? (
          products.slice(0, 10).map((product: any, index: any) => (
            <ProductCard key={product._id || index} product={product} />
          ))
        ) : (
          /* Empty state adapted for dark mode */
          <div className="col-span-full text-center py-24 text-gray-400 dark:text-gray-500 border-2 border-dashed border-gray-100 dark:border-gray-800 rounded-3xl transition-colors">
            No products available at the moment.
          </div>
        )}
      </div>

      {/* Bottom CTA Button - Reverse colors for Dark Mode */}
      <button 
        onClick={() => router.push('/all-products')}
        className="group relative px-16 py-4 overflow-hidden rounded-full border-2 border-gray-900 dark:border-white bg-white dark:bg-gray-950 text-gray-900 dark:text-white transition-all hover:text-white dark:hover:text-gray-900 active:scale-95 shadow-lg dark:shadow-none"
      >
        <span className="relative z-10 font-bold uppercase tracking-widest text-sm">Explore More</span>
        
        {/* Animated Background Overlay */}
        <div className="absolute inset-0 z-0 bg-gray-900 dark:bg-white translate-y-full transition-transform duration-500 ease-out group-hover:translate-y-0"></div>
      </button>
    </section>
  );
};

export default HomeProducts;