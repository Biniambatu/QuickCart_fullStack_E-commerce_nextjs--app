'use client'
import React from 'react';
import Link from 'next/link';
import { assets } from '../../assets/assets';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

const SideBar = () => {
    const pathname = usePathname()
    const menuItems = [
        { name: 'Add Product', path: '/seller', icon: assets.add_icon },
        { name: 'Product List', path: '/seller/product-list', icon: assets.product_list_icon },
        { name: 'Orders', path: '/seller/orders', icon: assets.order_icon },
    ];

    return (
        <div className='md:w-64 w-20 border-r min-h-screen text-base border-gray-100 dark:border-gray-800 py-6 flex flex-col bg-white dark:bg-gray-950 transition-colors duration-300'>
            <div className="flex flex-col gap-2">
                {menuItems.map((item) => {
                    const isActive = pathname === item.path;

                    return (
                        <Link href={item.path} key={item.name} passHref>
                            <div
                                className={
                                    `flex items-center py-3.5 px-4 md:px-6 gap-3 transition-all duration-200 group
                                    ${isActive
                                        ? "bg-orange-600/10 dark:bg-orange-600/20 border-r-4 border-orange-600 text-orange-600"
                                        : "hover:bg-gray-50 dark:hover:bg-gray-900/50 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
                                    }`
                                }
                            >
                                <div className={`relative p-1 rounded-lg transition-colors ${isActive ? 'text-orange-600' : 'group-hover:scale-110'}`}>
                                    <Image
                                        src={item.icon}
                                        alt={item.name}
                                        className={`w-6 h-6 transition-all ${isActive ? 'brightness-100' : 'opacity-70 dark:invert group-hover:opacity-100'}`}
                                    />
                                </div>
                                <p className='md:block hidden font-medium text-sm tracking-wide'>
                                    {item.name}
                                </p>
                            </div>
                        </Link>
                    );
                })}
            </div>
            
            {/* Optional: Footer section of Sidebar */}
            <div className='mt-auto px-6 py-8 md:block hidden'>
                <div className='p-4 bg-gray-50 dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800'>
                    <p className='text-xs font-bold text-gray-900 dark:text-gray-200 uppercase'>Support</p>
                    <p className='text-[10px] text-gray-500 mt-1'>Need help with your products?</p>
                    <button className='mt-3 text-xs text-orange-600 font-bold hover:underline'>Contact Admin</button>
                </div>
            </div>
        </div>
    );
};

export default SideBar;