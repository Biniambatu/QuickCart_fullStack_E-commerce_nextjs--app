import React from 'react';

const Skeleton = ({ className }: { className: string }) => {
  return (
    <div className={`animate-pulse bg-gray-200 rounded-md ${className}`}></div>
  );
};

export const ProductSkeleton = () => {
  return (
    <div className="flex flex-col gap-4 w-full">
      {/* Product Image Area */}
      <Skeleton className="aspect-square rounded-2xl w-full" />
      
      <div className="space-y-2">
        {/* Title */}
        <Skeleton className="h-4 w-3/4" />
        {/* Description/Category */}
        <Skeleton className="h-3 w-1/2" />
        
        <div className="flex justify-between items-center pt-2">
          {/* Price */}
          <Skeleton className="h-5 w-1/4" />
          {/* Button/Icon */}
          <Skeleton className="h-8 w-8 rounded-full" />
        </div>
      </div>
    </div>
  );
};

export default Skeleton;