'use client'
import React from "react";
import { assets } from "@/assets/assets";
import Image from "next/image";
import { useAppContext } from "@/context/AppContext";
import Navbar from "../../components/Navbar";
import OrderSummary from "../../components/OrderSummary";
import Footer from "../../components/Footer";

const Cart = () => {
  const { products, router, cartItems, addToCart, updateCartQuantity, getCartCount }: any = useAppContext();

  const cartCount = getCartCount();

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 flex flex-col transition-colors duration-300">
      <Navbar />
      
      <main className="flex-grow px-6 md:px-16 lg:px-32 pt-14 mb-20">
        {/* Header Section */}
        <div className="flex items-end justify-between mb-10 pb-6 border-b border-gray-100 dark:border-gray-800 transition-colors">
          <div className="flex flex-col gap-1">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
              Your <span className="text-orange-600">Cart</span>
            </h1>
            <div className="w-12 h-1 bg-orange-600 rounded-full"></div>
          </div>
          <p className="text-gray-500 dark:text-gray-400 font-medium">{cartCount} {cartCount === 1 ? 'Item' : 'Items'}</p>
        </div>

        {cartCount > 0 ? (
          <div className="flex flex-col lg:flex-row gap-16">
            
            {/* --- Left Side: Product List --- */}
            <div className="flex-1">
              {/* Desktop Table Header */}
              <div className="hidden md:grid grid-cols-4 pb-4 px-4 text-sm font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500 border-b border-gray-50 dark:border-gray-900">
                <span className="col-span-1">Product Details</span>
                <span className="text-center">Price</span>
                <span className="text-center">Quantity</span>
                <span className="text-right">Subtotal</span>
              </div>

              {/* Items List */}
              <div className="flex flex-col">
                {Object.keys(cartItems).map((itemId) => {
                  const product = products.find((p: any) => p._id === itemId);
                  if (!product || cartItems[itemId] <= 0) return null;

                  return (
                    <div 
                      key={itemId} 
                      className="group grid grid-cols-1 md:grid-cols-4 items-center py-8 px-4 border-b border-gray-50 dark:border-gray-900 hover:bg-gray-50/50 dark:hover:bg-gray-900/30 transition-colors rounded-xl"
                    >
                      {/* Product Detail Column */}
                      <div className="flex items-center gap-6 col-span-1">
                        <div className="relative w-24 h-24 flex-shrink-0 rounded-2xl overflow-hidden bg-gray-100 dark:bg-gray-800 p-2 group-hover:scale-105 transition-all duration-300">
                          <Image
                            src={product.image[0]}
                            alt={product.name}
                            fill
                            className="object-contain dark:brightness-90 mix-blend-multiply dark:mix-blend-normal"
                          />
                        </div>
                        <div className="flex flex-col gap-1">
                          <p className="font-bold text-gray-900 dark:text-white leading-tight">{product.name}</p>
                          <p className="text-xs text-gray-400 dark:text-gray-500 uppercase tracking-tighter">{product.category}</p>
                          <button
                            onClick={() => updateCartQuantity(product._id, 0)}
                            className="text-xs font-bold text-red-400 hover:text-red-600 mt-2 flex items-center gap-1 transition-colors"
                          >
                            <span className="text-lg">×</span> Remove
                          </button>
                        </div>
                      </div>

                      {/* Price Column */}
                      <div className="hidden md:flex flex-col items-center">
                        <span className="font-bold text-gray-700 dark:text-gray-300">${product.offerPrice}</span>
                      </div>

                      {/* Quantity Column */}
                      <div className="flex items-center justify-between md:justify-center mt-6 md:mt-0 bg-gray-100/50 dark:bg-gray-900/50 md:bg-transparent p-4 md:p-0 rounded-xl">
                        <span className="md:hidden text-sm font-bold text-gray-500 uppercase">Quantity</span>
                        <div className="flex items-center bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full px-2 py-1 shadow-sm">
                          <button 
                            className="p-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-full transition-colors"
                            onClick={() => updateCartQuantity(product._id, cartItems[itemId] - 1)}
                          >
                            <Image src={assets.decrease_arrow} alt="decrease" className="w-3 h-3 dark:invert" />
                          </button>
                          
                          <input 
                            readOnly
                            type="number" 
                            value={cartItems[itemId]} 
                            className="w-10 text-center font-bold text-gray-800 dark:text-white bg-transparent outline-none" 
                          />
                          
                          <button 
                            className="p-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-full transition-colors"
                            onClick={() => addToCart(product._id)}
                          >
                            <Image src={assets.increase_arrow} alt="increase" className="w-3 h-3 dark:invert" />
                          </button>
                        </div>
                      </div>

                      {/* Subtotal Column */}
                      <div className="flex items-center justify-between md:justify-end mt-4 md:mt-0 px-4 md:px-0">
                        <span className="md:hidden text-sm font-bold text-gray-500 uppercase">Subtotal</span>
                        <span className="text-lg font-black text-gray-900 dark:text-white">
                          ${(product.offerPrice * cartItems[itemId]).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Back to Shop Button */}
              <button 
                onClick={() => router.push('/all-products')} 
                className="group flex items-center mt-10 gap-3 text-gray-500 dark:text-gray-400 hover:text-orange-600 dark:hover:text-orange-500 font-bold transition-all"
              >
                <div className="w-10 h-10 rounded-full border border-gray-200 dark:border-gray-800 flex items-center justify-center group-hover:border-orange-600 dark:group-hover:border-orange-500 transition-colors">
                  <span className="group-hover:-translate-x-1 transition-transform">←</span>
                </div>
                Continue Shopping
              </button>
            </div>

            {/* --- Right Side: Summary --- */}
            <div className="lg:w-96">
                <div className="sticky top-24">
                    <OrderSummary />
                </div>
            </div>
          </div>
        ) : (
          /* --- Empty Cart State --- */
          <div className="flex flex-col items-center justify-center py-32 text-center">
            <div className="w-24 h-24 bg-orange-50 dark:bg-orange-900/10 rounded-full flex items-center justify-center mb-6">
               <Image src={assets.cart_icon} alt="cart" className="w-10 h-10 opacity-20 dark:invert" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Your cart is empty</h2>
            <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-xs">Looks like you haven't added anything to your cart yet.</p>
            <button 
              onClick={() => router.push('/all-products')}
              className="px-10 py-4 bg-gray-900 dark:bg-orange-600 text-white font-bold rounded-full hover:bg-orange-600 dark:hover:bg-orange-700 transition-all shadow-xl active:scale-95"
            >
              Start Shopping
            </button>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Cart;