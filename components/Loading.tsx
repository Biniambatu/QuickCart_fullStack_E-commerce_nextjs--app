'use client'
import React from 'react'

const Loading = () => {
    return (
        <div className="flex flex-col justify-center items-center h-[70vh] gap-6">
            <div className="relative flex items-center justify-center">
                {/* Outer Rotating Ring */}
                <div className="animate-spin rounded-full h-20 w-20 border-[3px] border-gray-100 border-t-orange-600"></div>
                
                {/* Inner Pulsing Core */}
                <div className="absolute h-10 w-10 bg-orange-600/20 rounded-full animate-ping"></div>
                
                {/* Static Center Point */}
                <div className="absolute h-4 w-4 bg-orange-600 rounded-full shadow-[0_0_15px_rgba(234,88,12,0.6)]"></div>
            </div>

            {/* Loading Text */}
            <div className="flex flex-col items-center gap-1">
                <p className="text-sm font-bold uppercase tracking-[0.3em] text-gray-400 animate-pulse pl-[0.3em]">
                    Loading
                </p>
                <div className="flex gap-1">
                    <span className="w-1 h-1 bg-orange-600 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                    <span className="w-1 h-1 bg-orange-600 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                    <span className="w-1 h-1 bg-orange-600 rounded-full animate-bounce"></span>
                </div>
            </div>
        </div>
    )
}

export default Loading