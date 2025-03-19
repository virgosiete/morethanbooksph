import React from 'react';
import { MapPin } from 'lucide-react';

interface MapDisplayProps {
  address: string;
  city: string;
  province: string;
}

export const GoogleMap: React.FC<MapDisplayProps> = ({ address, city, province }) => {
  return (
    <div className="w-full h-[300px] rounded-lg overflow-hidden bg-gray-50 dark:bg-gray-800 relative">
      {/* Map Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="w-full h-full grid grid-cols-8 grid-rows-6">
          {Array.from({ length: 48 }).map((_, i) => (
            <div
              key={i}
              className="border border-gray-400 dark:border-gray-600"
            />
          ))}
        </div>
      </div>

      {/* Location Marker and Info */}
      <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
        <div className="relative">
          {/* Pulse Effect */}
          <div className="absolute -inset-4 rounded-full bg-pink-500/20 animate-ping" />
          <div className="absolute -inset-8 rounded-full bg-pink-500/10" />
          
          {/* Location Pin */}
          <div className="relative bg-pink-500 text-white p-3 rounded-full shadow-lg shadow-pink-500/30">
            <MapPin className="h-8 w-8" />
          </div>
        </div>

        {/* Address Information */}
        <div className="mt-6 max-w-sm bg-white dark:bg-gray-700 p-4 rounded-lg shadow-lg">
          <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-1">
            Delivery Location
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            {address}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            {city}, {province}
          </p>
        </div>
      </div>
    </div>
  );
};