import React from 'react';
import Image from 'next/image';
import landingImage from "@/public/engoy games landing.png";

const MyComponent = () => { 
  return (
    <div className="flex items-center justify-between w-full h-[655px] p-8 relative px-[100px]">
      {/* Left Side: Text and Button */}
      <div className="flex flex-col justify-center space-y-6 w-1/2 text-left">
        <h1 className="text-white text-6xl font-semibold leading-tight">
        Every point brings you<br />
          <span className="text-[#ffd700]">closer</span> to a win!
        </h1>
        <p className="text-white text-base leading-relaxed max-w-md">
        We offer you a unique experience with endless points and rewards, turning every moment into something more exciting!
        </p>
        <button className="bg-black text-white py-3 px-6 rounded-full text-base font-semibold w-max">
          Shop Now
        </button>
      </div>

      {/* Right Side: PNG Image */}
      <div className="w-1/2 flex justify-center items-center">
        <Image
          src={landingImage} // Replace with the actual PNG image URL
          alt="Your Product"
          className="max-w-full h-auto object-contain"
        />
      </div>
    </div>
  );
};

export default MyComponent;
