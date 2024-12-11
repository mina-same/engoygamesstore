"use client";

import React, { useState } from "react";
import WheelPopup from "./PrizeWheelPopup";
import Image from "next/image";

const PopupManager: React.FC = () => {
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  const handlePopupToggle = () => {
    setIsPopupVisible((prev) => !prev);
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={handlePopupToggle}
        className="py-2 px-4 flex gap-2 fixed bottom-5 left-5 z-50 p-4 rounded-full shadow-2xl hover:scale-110 transform transition-all duration-300 ease-out bg-gradient-to-r from-purple-600 via-purple-700 to-purple-800"
      >
        <div className="relative">
          {/* Rotating Image */}
          <Image
            src="/fortune-wheel.png"
            alt="fortune wheel"
            width={35}
            height={35}
            className="animate-spin-slow rounded-full"
          />
        </div>
        <span className="block mt-2 text-white text-sm md:text-base font-semibold">
          عجلة الحظ تنتظرك
        </span>
      </button>

      {/* WheelPopup Component */}
      <WheelPopup visible={isPopupVisible} onClose={handlePopupToggle} />
    </>
  );
};

export default PopupManager;
