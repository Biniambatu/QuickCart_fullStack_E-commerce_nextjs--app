'use client'
import { assets } from '@/assets/assets'
import { useAppContext } from '@/context/AppContext'
import Image from 'next/image'
import { useEffect, useState } from 'react'

const OrderPlaced = () => {
  const { router } = useAppContext() as any
  const [countdown, setCountdown] = useState(5)

  useEffect(() => {
    // Countdown timer logic
    const timer = setInterval(() => {
      setCountdown((prev) => (prev > 0 ? prev - 1 : 0))
    }, 1000)

    // Redirect after 5 seconds
    const redirect = setTimeout(() => {
      router.push('/my-orders')
    }, 5000)

    return () => {
      clearInterval(timer)
      clearTimeout(redirect)
    }
  }, [router])

  return (
    <div className='h-screen flex flex-col justify-center items-center gap-8 bg-white dark:bg-gray-950 transition-colors duration-300'>
      
      {/* Animated Success Icon */}
      <div className="flex justify-center items-center relative">
        <div className="absolute inset-0 bg-green-500/20 dark:bg-green-500/10 blur-3xl rounded-full scale-150 animate-pulse"></div>
        <div className="relative z-10 bg-green-500 rounded-full p-6 shadow-2xl shadow-green-500/40 transform scale-110 animate-bounce">
            <Image 
                className="w-10 h-10 invert brightness-0" 
                src={assets.checkmark} 
                alt='Success' 
            />
        </div>
        {/* Spinning Ring */}
        <div className="absolute h-32 w-32 border-4 border-dashed border-green-500/30 rounded-full animate-[spin_10s_linear_infinite]"></div>
      </div>

      <div className="text-center space-y-3">
        <h1 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white tracking-tight">
            Order <span className="text-green-500">Confirmed!</span>
        </h1>
        <p className="text-gray-500 dark:text-gray-400 font-medium">
            Thank you for your purchase. Your order is being processed.
        </p>
      </div>

      {/* Redirect Badge */}
      <div className="flex flex-col items-center gap-4">
        <div className="bg-gray-100 dark:bg-gray-900 px-6 py-3 rounded-2xl border border-gray-200 dark:border-gray-800 flex items-center gap-3">
            <div className="flex gap-1">
                {[...Array(3)].map((_, i) => (
                    <div key={i} className="w-1.5 h-1.5 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: `${i * 0.2}s` }}></div>
                ))}
            </div>
            <span className="text-xs font-bold text-gray-600 dark:text-gray-400 uppercase tracking-widest">
                Redirecting in {countdown}s
            </span>
        </div>

        <button 
            onClick={() => router.push('/my-orders')}
            className="text-sm font-bold text-orange-600 hover:text-orange-700 underline underline-offset-8 decoration-2 transition-all"
        >
            View My Orders Now
        </button>
      </div>

      {/* Confetti Decoration (CSS only) */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[10%] w-2 h-2 bg-orange-400 rounded-full animate-ping"></div>
        <div className="absolute top-[20%] right-[15%] w-3 h-3 bg-green-400 rounded-full animate-bounce"></div>
        <div className="absolute bottom-[20%] left-[15%] w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
      </div>
    </div>
  )
}

export default OrderPlaced