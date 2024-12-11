"use client";

import { IconButton } from "@/components/ui/icon-button";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Product } from "@/types";
import { Currency } from "@/components/ui/currency";
import { BsCart4 } from "react-icons/bs";
import { useCart } from "@/hooks/use-cart";
import {
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";
import { useLocale } from "next-intl";

interface CategoryDisplayProps {
  backgroundImage: string;
  title: string;
  description: string;
  products?: Product[]; // Optional to allow undefined as a valid value
}

const CategoryDisplay: React.FC<CategoryDisplayProps> = ({
  backgroundImage,
  title,
  description,
  products = [],
}) => {
  const [startIndex, setStartIndex] = useState(0);
  const [mounted, setMounted] = useState(false); // To handle hydration error
  const itemsPerPage = 4;
  const { addItem } = useCart();
  const currentLang = useLocale();

  useEffect(() => {
    setMounted(true); // Set mounted to true after the component is mounted
  }, []);

  if (!mounted) return null; // Avoid rendering until mounted on the client side

  // Calculate the visible products using startIndex and itemsPerPage
  const visibleProducts = [];
  for (let i = startIndex; i < startIndex + itemsPerPage && i < products.length; i++) {
    visibleProducts.push(products[i]);
  }

  const handleNext = () => {
    // Move to next product if there's room
    if (startIndex + 1 < products.length) {
      setStartIndex((prevIndex) => prevIndex + 1); // Increment by 1 for single item shift
    }
  };

  const handlePrevious = () => {
    // Move to previous product if not at the start
    if (startIndex > 0) {
      setStartIndex((prevIndex) => prevIndex - 1); // Decrement by 1 for single item shift
    }
  };

  return (
    <div
      className="relative bg-cover bg-center h-[500px] flex flex-col items-center text-center pb-[px]"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      {/* Title and Description Container */}
      <div className="w-full flex justify-end text-right pr-8 z-10">
        <div className="px-16 pt-20">
          <h2 className="text-white text-lg font-bold mb-2">{title}</h2>
          <p className="text-white text-sm mb-6">{description}</p>
        </div>
      </div>

      {/* Slider Controls */}
      <div className="flex justify-between items-center z-10 p-8 w-full px-20">
        <div className="flex space-x-4 mb-6">
          <button
            className={`w-12 h-12 text-white text-3xl p-2 rounded-full border-2 border-white ${
              startIndex === 0
                ? "text-[#ffffff66] border-[#ffffff66] cursor-not-allowed"
                : "bg-opacity-50 transition-transform transform hover:scale-105 hover:bg-opacity-70"
            }`}
            onClick={handlePrevious}
            disabled={startIndex === 0}
          >
            <MdOutlineKeyboardArrowLeft />
          </button>

          <button
            className={`w-12 h-12 text-white text-3xl p-2 rounded-full border-2 border-white ${
              startIndex + 1 >= products.length
                ? "text-[#ffffff66] border-[#ffffff66] cursor-not-allowed"
                : "bg-opacity-50 transition-transform transform hover:scale-105 hover:bg-opacity-70"
            }`}
            onClick={handleNext}
            disabled={startIndex + 1 >= products.length}
          >
            <MdOutlineKeyboardArrowRight />
          </button>
        </div>

        <div className="border-2 rounded-3xl py-2 px-4 border-white text-white">
          عرض الكل
        </div>
      </div>

      {/* Products */}
      {visibleProducts.length > 0 ? (
        <div className="relative z-10 rounded-t-lg shadow-lg grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 transition-transform duration-500 ease-in-out">
          {visibleProducts.map((product, index) => (
            <div
              key={product.id} // Use a unique key for each product, assuming product.id is available
              className="bg-white border rounded-lg shadow-md flex flex-col items-center text-center transition-transform transform hover:scale-105 hover:shadow-xl hover:ease-in-out hover:duration-300"
            >
              <div className="w-[320px] h-[270px] relative mb-4 transition-transform ease-in-out hover:scale-105">
                <Image
                  src={product.images[0].url}
                  alt={product.name}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-lg"
                />
              </div>
              <div className="p-4">
                <h3 className="w-[230px] text-lg font-semibold mb-2">{currentLang == "ar" ? product.name : product.nameEn}</h3>
                <p className="font-bold mb-4">
                  <Currency value={product.price} />
                </p>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    addItem(product);
                  }}
                  className="w-full font-extrabold text-yellow-600 border border-yellow-500 rounded-lg px-6 py-2 hover:bg-yellow-500 hover:text-white transition-all duration-300 flex items-center justify-center"
                >
                  {currentLang == "ar" ? "أضف إلى السلة" : "Add to Cart"}
                  <BsCart4 className="ml-2" />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-white mt-8">No products available</p> // Fallback message
      )}
    </div>
  );
};

export default CategoryDisplay;
