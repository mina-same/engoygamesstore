"use client";

import React from "react";
import { FaWhatsapp } from "react-icons/fa";
import { useLocale } from "next-intl";

const WhatsAppButton: React.FC = () => {
  const locale = useLocale();

  const handleWhatsAppClick = () => {
    const phone = "+905070000339"; // Your WhatsApp number
    const message =
      locale === "ar" ? "مرحبا انجوي جيمز" : "Hello Enjoy Games";
    const whatsappURL = `https://wa.me/${phone}?text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappURL, "_blank");
  };

  return (
    <div
      className="fixed right-4 bottom-4 flex items-center gap-2 bg-green-500 text-white py-2 px-4 rounded-full shadow-lg cursor-pointer hover:bg-green-600 transition-all duration-300 z-50"
      onClick={handleWhatsAppClick}
    >
      <FaWhatsapp className="text-xl" />
      <span className="font-medium">
        {locale === "ar" ? "راسلنا" : "Contact Us"}
      </span>
    </div>
  );
};

export default WhatsAppButton;
