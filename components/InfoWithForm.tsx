"use client";

import { Product } from "@/types";
import { ShoppingCart } from "lucide-react";
import { Button } from "./ui/button";
import { Currency } from "./ui/currency";
import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { useCart } from "@/hooks/use-cart";
import DynamicForm from "./DynamicForm";

interface InfoWithFormProps {
  data: Product;
  categoryFields: any[];
  currentLang: string;
}

export const InfoWithForm: React.FC<InfoWithFormProps> = ({
  data,
  categoryFields,
  currentLang,
}) => {
  const t = useTranslations();
  const cart = useCart(); // Access the cart hook
  const [isAdded, setIsAdded] = useState(false); // Persistent state for the button

  // Check if the item is already added when the component mounts
  useEffect(() => {
    const addedProduct = localStorage.getItem(`addedToCart_${data.id}`);
    if (addedProduct) {
      setIsAdded(true);
    }
  }, [data.id]);

  const handleClick = () => {
    if (!isAdded) {
      // Add the item to the cart only if it hasn't been added
      cart.addItem(data);

      // Set the button to "addedToCart" state
      setIsAdded(true);

      // Persist the state in localStorage
      localStorage.setItem(`addedToCart_${data.id}`, "true");
    }
  };

  return (
    <div className="flex flex-col md:flex-row items-start gap-8">
      {/* Product Info */}
      <div className="flex-1 text-right mt-6">
        <h1 className="text-3xl font-bold text-white">
          {currentLang == "ar" ? data?.name : data?.nameEn}
        </h1>

        <div className="mt-3 flex items-end justify-between">
          <p className="text-2xl text-white">
            <Currency value={data?.price} color="white" />
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

        {/* Dynamic Form */}
        {categoryFields && (
          <DynamicForm
            fields={categoryFields}
            currentLang={currentLang}
            submitForm={() => console.log("Form Submitted")}
          />
        )}

        {/* Add to Cart Button */}
        <div className="mt-10 flex items-center gap-x-3">
          <Button
            onClick={handleClick}
            aria-label={t("addToCart")}
            className={`cursor-pointer w-full justify-center flex items-center gap-x-2 text-black ${
              isAdded
                ? "bg-black text-white border-black"
                : "bg-transparent border-2 border-white text-white"
            } hover:bg-white hover:text-black hover:border-black transition-all duration-300 ease-in-out`}
          >
            {isAdded ? t("addedToCart") : t("addToCart")}
            <ShoppingCart />
          </Button>
        </div>
      </div>
    </div>
  );
};
