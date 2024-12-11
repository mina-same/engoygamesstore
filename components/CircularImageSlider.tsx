"use client";

import { useEffect, useState } from 'react';
import Image from 'next/image';

const CircularImageSlider: React.FC = () => {

  const images = [
    'https://cdn.salla.sa/form-builder/g9C0CpD53qu7pSGAVOeR1xUWznmAEDvVcbGactId.webp',
    'https://cdn.salla.sa/form-builder/HUaOmKJU8v8Z8C6RrPWNMzBj99m0EA40guuYsg1P.webp',
    'https://cdn.salla.sa/form-builder/5b9dJZZHGjamrFKnN3ty8Pxej3rDepEvjGkxXnob.webp',
    'https://cdn.salla.sa/form-builder/t0CkjM5fN8KheOwcTHftu0Qvmxtrbkn3G5Dm0oeP.webp',
    'https://cdn.salla.sa/form-builder/9PnvQ3dn9r4JX0lehaXtx83wWqBX7FWBMKTD7Dqu.webp',
    'https://cdn.salla.sa/form-builder/cMHBVczm3FsOPqL6yLxUIlbX9HZyCvjMRhAwWCIn.png',
  ];

  const interval = 3000; // Time interval to move the images
  const [currentIndex, setCurrentIndex] = useState(0);

  // Function to move the carousel images
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, interval);

    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, [images.length, interval]);

  return (
    <div className="overflow-hidden w-full pb-10">
      <div
        className="flex transition-all duration-1000 ease-in-out"
        style={{
          transform: `translateX(-${(currentIndex % images.length) * 20}%)`, // 20% per image to show 5 images at once
        }}
      >
        {images.concat(images).map((image, index) => (
          <div key={index} className="flex-shrink-0 w-1/5 flex justify-center items-center p-2">
            <div className="w-28 h-28 rounded-full overflow-hidden">
              <Image width={150} height={150} src={image} alt={`Image ${index + 1}`} className="object-cover w-full h-full" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CircularImageSlider;
