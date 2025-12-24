'use client';
import React, { useEffect, useState } from "react";
import { assets } from "@/assets/assets";
import Image from "next/image";
import { useAppContext } from "@/context/AppContext";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Loading from "@/components/Loading";
import axios from "axios";
import toast from "react-hot-toast";

const MyOrders = () => {
    const { currency, getToken, user, router } = useAppContext() as any;
    const [orders, setOrders] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchOrders = async () => {
        try {
            const token = await getToken()
            const { data } = await axios.get('/api/order/list', { headers: { Authorization: `Bearer ${token}` } })

            if (data.success) {
                setOrders(data.orders.reverse());
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error((error as any).message)
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (user) fetchOrders();
    }, [user]);

    return (
        <div className="min-h-screen bg-gray-50/50 dark:bg-gray-950 flex flex-col transition-colors duration-300">
            <Navbar />
            <div className="flex-grow px-4 md:px-16 lg:px-32 py-12">

                {/* Header Section */}
                <div className="flex flex-col gap-1 mb-10">
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
                        My <span className="text-orange-600">Orders</span>
                    </h1>
                    <div className="w-12 h-1 bg-orange-600 rounded-full"></div>
                    <p className="text-gray-500 dark:text-gray-400 mt-2 font-medium italic">Everything you've ever loved, all in one place.</p>
                </div>

                {loading ? (
                    <div className="py-20 flex justify-center"><Loading /></div>
                ) : orders.length > 0 ? (
                    <div className="space-y-8 max-w-6xl">
                        {orders.map((order: any, index: number) => (
                            <div
                                key={index}
                                className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-[2rem] overflow-hidden shadow-sm hover:shadow-xl hover:shadow-gray-200/50 dark:hover:shadow-none transition-all duration-300"
                            >
                                {/* Order Top Bar */}
                                <div className="bg-gray-50/80 dark:bg-gray-800/50 px-6 py-5 flex flex-wrap justify-between items-center gap-4 border-b border-gray-100 dark:border-gray-800">
                                    <div className="flex gap-10">
                                        <div className="flex flex-col">
                                            <span className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest">Order Placed</span>
                                            <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">{new Date(order.date).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest">Total Amount</span>
                                            <span className="text-sm font-bold text-gray-900 dark:text-white">{currency}{order.amount.toLocaleString()}</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2.5 bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-500 px-5 py-2 rounded-full border border-orange-100 dark:border-orange-900/30">
                                        <div className="w-2 h-2 bg-orange-600 dark:bg-orange-500 rounded-full animate-pulse"></div>
                                        <span className="text-[11px] font-black uppercase tracking-widest">{order.status || 'Processing'}</span>
                                    </div>
                                </div>

                                {/* Order Content */}
                                <div className="p-6 md:p-8 flex flex-col lg:flex-row justify-between gap-10">
                                    {/* Product Details */}
                                    <div className="flex-1 flex flex-col gap-6">
                                        {order.items.map((item: any, idx: number) => (
                                            <div key={idx} className="flex gap-5 items-center group">
                                                <div className="w-20 h-20 bg-gray-50 dark:bg-gray-800 rounded-2xl p-3 flex-shrink-0 border border-gray-100 dark:border-gray-700">
                                                    <Image
                                                        src={item.product.image[0] || assets.box_icon}
                                                        alt="product"
                                                        width={80}
                                                        height={80}
                                                        className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300 dark:brightness-90"
                                                    />
                                                </div>
                                                <div className="flex flex-col gap-1">
                                                    <span className="text-base font-bold text-gray-800 dark:text-gray-200 group-hover:text-orange-600 transition-colors">{item.product.name}</span>
                                                    <span className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                                                        Qty: <span className="text-gray-900 dark:text-white font-bold">{item.quantity}</span> • {currency}{item.product.offerPrice.toLocaleString()}
                                                    </span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Shipping Address */}
                                    <div className="flex-1 lg:border-l lg:pl-10 border-gray-100 dark:border-gray-800 flex flex-col gap-3">
                                        <span className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest">Delivery Address</span>
                                        <div className="bg-gray-50/50 dark:bg-gray-800/30 p-4 rounded-2xl border border-gray-100 dark:border-gray-800">
                                            <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                                                <span className="font-bold text-gray-900 dark:text-white">{order.address?.fullName}</span><br />
                                                {order.address?.area}, {order.address?.city}<br />
                                                {order.address?.state} - {order.address?.pincode}
                                            </p>
                                            <p className="text-orange-600 dark:text-orange-500 text-xs font-bold mt-2">📞 {order.address?.phoneNumber}</p>
                                        </div>
                                    </div>

                                    {/* Payment & Action */}
                                    <div className="flex flex-col gap-4 justify-center min-w-[200px]">
                                        <div className={`px-5 py-4 rounded-2xl border flex flex-col items-center text-center ${order.payment ? 'bg-green-50 dark:bg-green-900/10 border-green-100 dark:border-green-900/30' : 'bg-blue-50 dark:bg-blue-900/10 border-blue-100 dark:border-blue-900/30'}`}>
                                            <p className={`text-[10px] font-bold uppercase tracking-widest mb-1 ${order.payment ? 'text-green-500' : 'text-blue-500'}`}>Payment Status</p>
                                            <p className={`text-xs font-black ${order.payment ? 'text-green-700 dark:text-green-500' : 'text-blue-700 dark:text-blue-500'}`}>
                                                {order.payment ? 'PAID' : 'CASH ON DELIVERY'}
                                            </p>
                                        </div>
                                        <button 
                                            onClick={fetchOrders}
                                            className="w-full px-6 py-4 bg-gray-900 dark:bg-orange-600 text-white text-xs font-bold rounded-2xl hover:bg-orange-600 dark:hover:bg-orange-700 transition-all active:scale-95 shadow-xl shadow-gray-200 dark:shadow-none"
                                        >
                                            Track Status
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    /* Enhanced Empty State */
                    <div className="flex flex-col items-center justify-center py-24 text-center">
                        <div className="w-32 h-32 bg-gray-100 dark:bg-gray-900 rounded-full flex items-center justify-center mb-8 animate-bounce">
                            <Image src={assets.box_icon} alt="empty" className="w-12 opacity-20 dark:invert" />
                        </div>
                        <h3 className="text-2xl font-black text-gray-900 dark:text-white">Your wardrobe is empty!</h3>
                        <p className="text-gray-500 dark:text-gray-400 max-w-sm mt-3 mb-10 leading-relaxed">Looks like you haven't made your move yet. Discover the latest trends and start your collection today.</p>
                        <button 
                            onClick={() => router.push('/')} 
                            className="bg-orange-600 text-white px-10 py-4 rounded-full font-black text-sm shadow-2xl shadow-orange-600/30 hover:scale-105 transition-transform active:scale-95 tracking-widest uppercase"
                        >
                            Start Shopping
                        </button>
                    </div>
                )}
            </div>
            <Footer />
        </div>
    );
};

export default MyOrders;