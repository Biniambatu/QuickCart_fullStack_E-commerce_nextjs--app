'use client';
import React, { useEffect, useState } from "react";
import { assets } from "@/assets/assets";
import Image from "next/image";
import { useAppContext } from "@/context/AppContext";
import Footer from "@/components/seller/Footer";
import Loading from "@/components/Loading";
import axios from "axios";
import toast from "react-hot-toast";

const Orders = () => {
    const { currency, getToken, user } = useAppContext() as any;
    const [orders, setOrders] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const fetchSellerOrders = async () => {
        try {
            const token = await getToken()
            const { data } = await axios.get('/api/order/seller-order', { headers: { Authorization: `Bearer ${token}` } })
            if (data.success) {
                setOrders(data.orders);
                setLoading(false);
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error((error as any).message)
        }
    };

    useEffect(() => {
        if (user) {
            fetchSellerOrders();
        }
    }, [user]);

    return (
        <div className="flex-1 min-h-screen flex flex-col justify-between bg-white dark:bg-gray-950 transition-colors duration-300">
            {loading ? (
                <Loading />
            ) : (
                <div className="md:p-10 p-4">
                    <div className="mb-8">
                        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">Recent <span className="text-orange-600">Orders</span></h1>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Track and manage your incoming customer orders.</p>
                    </div>

                    <div className="max-w-5xl space-y-4">
                        {orders.length > 0 ? orders.map((order: any, index: number) => (
                            <div
                                key={index}
                                className="flex flex-col lg:flex-row gap-6 justify-between p-6 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-3xl shadow-sm hover:shadow-md transition-shadow"
                            >
                                {/* Left Section: Package Info */}
                                <div className="flex-1 flex gap-5">
                                    <div className="h-16 w-16 md:h-20 md:w-20 bg-orange-50 dark:bg-orange-950/30 rounded-2xl flex items-center justify-center flex-shrink-0 border border-orange-100 dark:border-orange-900/30">
                                        <Image
                                            className="w-8 h-8 md:w-10 md:h-10 opacity-80"
                                            src={assets.box_icon}
                                            alt="box_icon"
                                        />
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <p className="font-bold text-gray-800 dark:text-gray-200 text-base">
                                            {order.items.map((item: any) => `${item.product.name} x ${item.quantity}`).join(", ")}
                                        </p>
                                        <div className="flex items-center gap-2 mt-1">
                                            <span className="px-2 py-0.5 bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 text-[10px] font-bold rounded uppercase">
                                                {order.items.length} {order.items.length > 1 ? 'Items' : 'Item'}
                                            </span>
                                            <span className="text-gray-400 text-xs">|</span>
                                            <span className="text-orange-600 font-bold text-xs">COD</span>
                                        </div>
                                        <p className="text-xs text-gray-400 mt-2 font-medium">Ordered: {new Date(order.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}</p>
                                    </div>
                                </div>

                                {/* Center Section: Shipping Details */}
                                <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                                    <div className="bg-gray-50/50 dark:bg-gray-800/30 p-3 rounded-2xl border border-gray-100 dark:border-gray-800">
                                        <p className="text-[10px] font-bold text-gray-400 uppercase mb-1">Shipping To</p>
                                        <p className="font-bold text-gray-800 dark:text-gray-200">{order.address?.fullName}</p>
                                        <p className="text-gray-500 dark:text-gray-400 leading-relaxed">
                                            {order.address?.area}, {order.address?.city}, <br />
                                            {order.address?.state}
                                        </p>
                                    </div>
                                    <div className="flex flex-col justify-center">
                                         <p className="text-[10px] font-bold text-gray-400 uppercase mb-1">Contact</p>
                                         <p className="text-gray-700 dark:text-gray-300 font-medium">{order.address?.phoneNumber}</p>
                                    </div>
                                </div>

                                {/* Right Section: Amount & Status */}
                                <div className="flex flex-row lg:flex-col justify-between lg:justify-center items-center lg:items-end gap-4 border-t lg:border-t-0 pt-4 lg:pt-0 border-gray-100 dark:border-gray-800">
                                    <p className="text-xl font-black text-gray-900 dark:text-white">
                                        {currency}{order.amount.toLocaleString()}
                                    </p>
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></div>
                                        <span className="text-xs font-bold text-amber-600 dark:text-amber-500 uppercase tracking-tighter">Payment Pending</span>
                                    </div>
                                </div>
                            </div>
                        )) : (
                            <div className="bg-gray-50 dark:bg-gray-900/50 rounded-3xl py-20 text-center border-2 border-dashed border-gray-200 dark:border-gray-800">
                                <p className="text-gray-400 font-medium">No orders received yet.</p>
                            </div>
                        )}
                    </div>
                </div>
            )}
            <Footer />
        </div>
    );
};

export default Orders;