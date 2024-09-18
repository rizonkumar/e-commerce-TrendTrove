import React from "react";

const ShimmerUI = () => {
  return (
    <div className="animate-pulse space-y-4 py-4">
      {[...Array(3)].map((_, index) => (
        <div key={index} className="flex items-center space-x-4">
          <div className="h-16 w-16 rounded bg-gray-300"></div>
          <div className="flex-1 space-y-2">
            <div className="h-4 w-3/4 rounded bg-gray-300"></div>
            <div className="h-4 w-1/2 rounded bg-gray-300"></div>
          </div>
          <div className="h-8 w-16 rounded bg-gray-300"></div>
        </div>
      ))}
      <div className="mt-8 space-y-3">
        <div className="h-4 w-full rounded bg-gray-300"></div>
        <div className="h-4 w-5/6 rounded bg-gray-300"></div>
        <div className="h-8 w-full rounded bg-gray-300"></div>
      </div>
    </div>
  );
};

export default ShimmerUI;
