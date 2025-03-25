"use client"
import React from 'react';
import { useLoader } from '../../store/LoaderContext';

const Loader: React.FC = () => {
  const { isLoading } = useLoader();

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="relative">
        {/* Outer circle */}
        <div className="w-16 h-16 border-4 border-[#6C8AB5] border-t-transparent rounded-full animate-spin"></div>
        
        {/* Inner circle */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="w-8 h-8 border-4 border-[#8B9B6B] border-t-transparent rounded-full animate-spin"></div>
        </div>
      </div>
    </div>
  );
};

export default Loader; 