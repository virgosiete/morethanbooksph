import React, { useState, useEffect } from 'react';

const bannerImages = [
  "https://qv8vrdgyhj.ufs.sh/f/sCcMfbAfOj6Tq8ZNVxiEVaCQOwqlbd5KznXpBUI96rSALyuH",
  "https://qv8vrdgyhj.ufs.sh/f/sCcMfbAfOj6TE1J2kIV1npLg89tUIZrc54H2aiXx7fKjChOo"
];

export const Hero: React.FC = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % bannerImages.length);
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-[300px] sm:h-[600px] w-full overflow-hidden">
      {/* Banner Images and Content - Only visible on sm screens and up */}
      <div className="hidden sm:block h-full">
        {/* Banner Images */}
        {bannerImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentImageIndex ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img
              src={image}
              alt={`Banner ${index + 1}`}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-30" />
          </div>
        ))}

        {/* Hero Content - Only visible on sm screens and up */}
        <div className="absolute inset-0 flex items-center justify-center text-center text-white">
          <div className="max-w-4xl px-4">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fade-in">
              Discover Your Next Spiritual Journey
            </h1>
            <p className="text-xl md:text-2xl mb-8 animate-fade-in animation-delay-200">
              Authentic Christian literature & inspirational resources delivered to your doorstep
            </p>
            <a
              href="/books.html"
              className="inline-block bg-pink-500 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-pink-600 transition-colors animate-fade-in animation-delay-400"
            >
              SHOP
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};