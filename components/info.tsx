"use client";

import { Product } from "@/types";
import { ShoppingCart } from "lucide-react";
import { Button } from "./ui/button";
import { Currency } from "./ui/currency";
import { useState, useEffect } from "react";
import { useTranslations, useLocale } from "next-intl";
import { useCart } from "@/hooks/use-cart";

interface InfoProps {
  data: Product;
}

export const Info: React.FC<InfoProps> = ({ data }) => {
  const t = useTranslations(); // Hook for translations
  const currentLang = useLocale(); // Hook for locale
  const cart = useCart(); // Access the cart hook
  const [isClicked, setIsClicked] = useState(false);

  // Check if the item has already been added to the cart on component mount
  useEffect(() => {
    const addedProduct = localStorage.getItem(`addedToCart_${data.id}`);
    if (addedProduct) {
      setIsClicked(true);
    }
  }, [data.id]);

  const handleClick = () => {
    // Add the item to the cart using the cart hook
    cart.addItem(data); // Assuming addItem is available in useCart

    // Persist cart state in localStorage for page refresh
    localStorage.setItem(`addedToCart_${data.id}`, "true");

    // Set clicked state for button feedback
    setIsClicked(true);

    // Reset the button after feedback (simulating the timeout)
    setTimeout(() => setIsClicked(false), 1500);
  };

  return (
    <div className="flex flex-col md:flex-row items-start gap-8">
      {/* Text Section */}
      <div className="flex-1 text-right mt-6">
        <h1 className="text-3xl font-bold text-white">
          {currentLang == "ar" ? data?.name : data?.nameEn}
        </h1>

        <div className="mt-3 flex items-end justify-between">
          <p className="text-2xl text-white">
            <Currency value={data?.price} color="white"/>
          </p>
        </div>

        <hr className="my-4 border-gray-300" />

        <h2 className="text-xl font-semibold text-white mt-6">
          {t("productOverview")}
        </h2>
        <p className="text-white mt-2 leading-relaxed">
          {currentLang == "ar"
            ? data?.category?.categoryDescription
            : data?.category?.categoryDescriptionEn}
        </p>

        {/* Add to Cart Button with Outline and Filled on Click */}
        <div className="mt-10 flex items-center gap-x-3">
          <Button
            onClick={handleClick}
            aria-label={t("addToCart")}
            className={`cursor-pointer w-full justify-center flex items-center gap-x-2 text-black ${
              isClicked
                ? "bg-black text-white border-black"
                : "bg-transparent border-2 border-white text-white"
            } hover:bg-white hover:text-black hover:border-black transition-all duration-300 ease-in-out`}
          >
            {isClicked ? t("addedToCart") : t("addToCart")}
            <ShoppingCart />
          </Button>
        </div>
      </div>
    </div>
  );
};
