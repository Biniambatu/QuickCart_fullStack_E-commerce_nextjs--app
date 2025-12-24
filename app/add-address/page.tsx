'use client'
import { assets } from "@/assets/assets";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Image from "next/image";
import { useState } from "react";
import axios from "axios";
import { useAppContext } from "@/context/AppContext";
import toast from "react-hot-toast";

const AddAddress = () => {
    const { getToken, router } = useAppContext() as any;

    const [address, setAddress] = useState({
        fullName: '',
        phoneNumber: '',
        pincode: '',
        area: '',
        city: '',
        state: '',
    })

    const onSubmitHandler = async (e: any) => {
        e.preventDefault();
        try {
            const token = await getToken()
            const { data } = await axios.post('/api/user/add-address', { address }, { headers: { Authorization: `Bearer ${token}` } })

            if (data.success) {
                toast.success(data.message)
                router.push('/cart')
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error((error as any).message)
        }
    }

    // Updated reusable styles with dark mode support
    const inputStyle = "w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl outline-none focus:border-orange-500 dark:focus:border-orange-500 focus:bg-white dark:focus:bg-gray-800 focus:ring-4 focus:ring-orange-50 dark:focus:ring-orange-900/20 transition-all duration-200 text-gray-700 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-600";

    return (
        <div className="min-h-screen bg-white dark:bg-gray-950 transition-colors duration-300">
            <Navbar />
            
            <div className="max-w-[1440px] mx-auto px-6 md:px-16 lg:px-32 py-16">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-16">
                    
                    {/* --- Left Side: Form --- */}
                    <div className="w-full lg:max-w-xl">
                        <div className="mb-10">
                            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white leading-tight">
                                Add Shipping <span className="text-orange-600">Address</span>
                            </h1>
                            <div className="w-16 h-1.5 bg-orange-600 rounded-full mt-3"></div>
                            <p className="text-gray-500 dark:text-gray-400 mt-4 font-medium">Please fill in your correct delivery details to ensure smooth shipping.</p>
                        </div>

                        <form onSubmit={onSubmitHandler} className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div className="md:col-span-2">
                                <label className="text-sm font-bold text-gray-600 dark:text-gray-400 uppercase tracking-widest mb-2 block px-1">Full Name</label>
                                <input
                                    className={inputStyle}
                                    type="text"
                                    placeholder="Enter your full name"
                                    onChange={(e) => setAddress({ ...address, fullName: e.target.value })}
                                    value={address.fullName}
                                    required
                                />
                            </div>

                            <div>
                                <label className="text-sm font-bold text-gray-600 dark:text-gray-400 uppercase tracking-widest mb-2 block px-1">Phone Number</label>
                                <input
                                    className={inputStyle}
                                    type="tel"
                                    placeholder="00000 00000"
                                    onChange={(e) => setAddress({ ...address, phoneNumber: e.target.value })}
                                    value={address.phoneNumber}
                                    required
                                />
                            </div>

                            <div>
                                <label className="text-sm font-bold text-gray-600 dark:text-gray-400 uppercase tracking-widest mb-2 block px-1">Pincode</label>
                                <input
                                    className={inputStyle}
                                    type="text"
                                    placeholder="6 Digit PIN"
                                    onChange={(e) => setAddress({ ...address, pincode: e.target.value })}
                                    value={address.pincode}
                                    required
                                />
                            </div>

                            <div className="md:col-span-2">
                                <label className="text-sm font-bold text-gray-600 dark:text-gray-400 uppercase tracking-widest mb-2 block px-1">Area and Street</label>
                                <textarea
                                    className={`${inputStyle} resize-none`}
                                    rows={3}
                                    placeholder="Flat, House no., Building, Company, Apartment"
                                    onChange={(e) => setAddress({ ...address, area: e.target.value })}
                                    value={address.area}
                                    required
                                />
                            </div>

                            <div>
                                <label className="text-sm font-bold text-gray-600 dark:text-gray-400 uppercase tracking-widest mb-2 block px-1">Town/City</label>
                                <input
                                    className={inputStyle}
                                    type="text"
                                    placeholder="City Name"
                                    onChange={(e) => setAddress({ ...address, city: e.target.value })}
                                    value={address.city}
                                    required
                                />
                            </div>

                            <div>
                                <label className="text-sm font-bold text-gray-600 dark:text-gray-400 uppercase tracking-widest mb-2 block px-1">State</label>
                                <input
                                    className={inputStyle}
                                    type="text"
                                    placeholder="State Name"
                                    onChange={(e) => setAddress({ ...address, state: e.target.value })}
                                    value={address.state}
                                    required
                                />
                            </div>

                            <div className="md:col-span-2 mt-4">
                                <button 
                                    type="submit" 
                                    className="w-full bg-gray-900 dark:bg-orange-600 text-white py-4 rounded-2xl font-bold uppercase tracking-widest text-sm hover:bg-orange-600 dark:hover:bg-orange-700 transition-all duration-300 shadow-xl shadow-gray-200 dark:shadow-none active:scale-[0.98]"
                                >
                                    Save Address
                                </button>
                                <button 
                                    type="button"
                                    onClick={() => router.back()}
                                    className="w-full mt-3 py-3 text-gray-400 dark:text-gray-500 font-bold uppercase tracking-widest text-xs hover:text-gray-900 dark:hover:text-white transition-colors"
                                >
                                    Cancel & Go Back
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* --- Right Side: Visual Image --- */}
                    <div className="hidden lg:block flex-1 animate-float">
                        <Image
                            className="w-full h-auto drop-shadow-2xl dark:brightness-90 dark:contrast-125"
                            src={assets.my_location_image}
                            alt="Location illustration"
                        />
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default AddAddress;