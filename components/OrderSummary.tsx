'use client'
import React, { useState, useEffect } from "react";
import { useAppContext } from "@/context/AppContext";
import axios from "axios";
import toast from "react-hot-toast";
import Image from "next/image";
import { assets } from "@/assets/assets";

const OrderSummary = () => {
  const { currency, router, getCartCount, getCartAmount, getToken, user, cartItems, setCartItems } = useAppContext() as any;

  const [selectedAddress, setSelectedAddress] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [userAddresses, setUserAddresses] = useState([]);

  const fetchUserAddresses = async () => {
    try {
      const token = await getToken();
      const { data } = await axios.get('/api/user/get-address', { headers: { Authorization: `Bearer ${token}` } });
      if (data.success) {
        setUserAddresses(data.addresses);
        if (data.addresses.length > 0) {
          setSelectedAddress(data.addresses[0]);
        }
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error((error as any).message);
    }
  };

  const handleAddressSelect = (address: any) => {
    setSelectedAddress(address);
    setIsDropdownOpen(false);
  };

  const createOrder = async () => {
    try {
      if (!selectedAddress) return toast.error('Please select an address');
      let cartItemsArray = Object.keys(cartItems).map((key) => ({ product: key, quantity: cartItems[key] }));
      cartItemsArray = cartItemsArray.filter(item => item.quantity > 0);
      
      if (cartItemsArray.length === 0) return toast.error('Cart is empty');

      const token = await getToken();
      const { data } = await axios.post('/api/order/create', {
        address: (selectedAddress as any)._id,
        items: cartItemsArray
      }, { headers: { Authorization: `Bearer ${token}` } });

      if (data.success) {
        toast.success(data.message);
        setCartItems({});
        router.push('/order-placed');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error((error as any).message);
    }
  };

  useEffect(() => {
    if (user) fetchUserAddresses();
  }, [user]);

  const subtotal = getCartAmount();
  const tax = Math.floor(subtotal * 0.02);
  const total = subtotal + tax;

  return (
    <div className="w-full lg:w-96 bg-gray-50/50 dark:bg-gray-900/40 border border-gray-100 dark:border-gray-800 rounded-3xl p-6 h-fit sticky top-24 transition-colors">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Order Summary</h2>
      
      <div className="space-y-6">
        {/* Address Selection */}
        <div>
          <label className="text-xs font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500 block mb-3">
            Shipping Address
          </label>
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="w-full flex items-center justify-between gap-3 px-4 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm text-left hover:border-orange-300 dark:hover:border-orange-500 transition-all focus:ring-2 focus:ring-orange-100 dark:focus:ring-orange-900/20"
            >
              <div className="truncate">
                {selectedAddress ? (
                  <span className="text-gray-800 dark:text-gray-200 font-medium">
                    {(selectedAddress as any).fullName}, {(selectedAddress as any).city}
                  </span>
                ) : (
                  <span className="text-gray-400 dark:text-gray-600">Select an address</span>
                )}
              </div>
              <Image 
                src={assets.dropdown_arrow} 
                className={`w-3 dark:invert transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} 
                alt="" 
              />
            </button>

            {isDropdownOpen && (
              <div className="absolute w-full mt-2 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 shadow-xl rounded-xl z-20 overflow-hidden animate-in fade-in slide-in-from-top-2">
                <ul className="max-h-48 overflow-y-auto">
                  {userAddresses.map((address: any, index) => (
                    <li
                      key={index}
                      className="px-4 py-3 hover:bg-orange-50 dark:hover:bg-orange-950/30 cursor-pointer text-sm text-gray-700 dark:text-gray-300 border-b border-gray-50 dark:border-gray-700 last:border-none"
                      onClick={() => handleAddressSelect(address)}
                    >
                      <p className="font-bold">{address.fullName}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-500 truncate">{address.area}, {address.city}</p>
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => router.push("/add-address")}
                  className="w-full py-3 bg-gray-50 dark:bg-gray-900 text-orange-600 text-xs font-bold hover:bg-orange-600 hover:text-white transition-colors"
                >
                  + Add New Address
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Promo Code */}
        <div>
          <label className="text-xs font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500 block mb-3">
            Promo Code
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Enter code"
              className="flex-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-orange-500 transition-colors"
            />
            <button className="bg-gray-900 dark:bg-orange-600 text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-orange-600 dark:hover:bg-orange-700 transition-all active:scale-95">
              Apply
            </button>
          </div>
        </div>

        {/* Price Breakdown */}
        <div className="bg-white dark:bg-gray-800/50 rounded-2xl p-5 border border-gray-50 dark:border-gray-700 space-y-3 shadow-sm">
          <div className="flex justify-between text-sm">
            <p className="text-gray-500 dark:text-gray-400">Subtotal ({getCartCount()} items)</p>
            <p className="font-bold text-gray-900 dark:text-white">{currency}{subtotal.toFixed(2)}</p>
          </div>
          <div className="flex justify-between text-sm">
            <p className="text-gray-500 dark:text-gray-400">Shipping</p>
            <p className="font-bold text-green-500 uppercase text-xs">Free</p>
          </div>
          <div className="flex justify-between text-sm">
            <p className="text-gray-500 dark:text-gray-400">Estimated Tax (2%)</p>
            <p className="font-bold text-gray-900 dark:text-white">{currency}{tax.toFixed(2)}</p>
          </div>
          <div className="border-t border-dashed border-gray-100 dark:border-gray-700 pt-3 flex justify-between items-center">
            <p className="font-bold text-gray-900 dark:text-white">Total Amount</p>
            <p className="text-xl font-black text-orange-600">{currency}{total.toFixed(2)}</p>
          </div>
        </div>
      </div>

      <button 
        onClick={createOrder} 
        className="w-full bg-orange-600 text-white py-4 rounded-2xl mt-8 font-bold uppercase tracking-widest text-sm hover:bg-orange-700 transition-all shadow-lg shadow-orange-200 dark:shadow-none active:scale-[0.98]"
      >
        Place Order
      </button>

      <p className="text-center text-[10px] text-gray-400 dark:text-gray-500 mt-4 px-6 uppercase tracking-tight">
        By placing your order, you agree to our Terms of Service and Privacy Policy.
      </p>
    </div>
  );
};

export default OrderSummary;