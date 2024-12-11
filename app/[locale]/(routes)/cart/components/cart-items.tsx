"use client";

import { Currency } from "@/components/ui/currency";
import { IconButton } from "@/components/ui/icon-button";
import { useCart } from "@/hooks/use-cart";
import { Product } from "@/types";
import { X } from "lucide-react";
import { useLocale } from "next-intl";
import Image from "next/image";
import React, { useState, useEffect } from "react";

interface CartItemProps {
  data: Product;
  onQuantityChange: (itemId: string, quantity: number) => void;
}

export const CartItems: React.FC<CartItemProps> = ({
  data,
  onQuantityChange,
}) => {
  const cart = useCart();

  const onRemove = () => {
    cart.removeItem(data.id);
  };

  const currentlang = useLocale();
  const [quantity, setQuantity] = useState(data.quantity || 1);

  const totalPrice = data.price * quantity;

  const handleIncrement = () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    onQuantityChange(data.id, newQuantity);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      onQuantityChange(data.id, newQuantity);
    }
  };

  useEffect(() => {}, [quantity]);

  return (
    <li className="flex py-6 border-b border-gray-300 transition-colors">
      <div className="relative h-24 w-24 rounded-md overflow-hidden sm:h-48 sm:w-48">
        <Image
          fill
          src={data?.images?.[0]?.url}
          alt={data.name}
          className="object-cover object-center"
        />
      </div>

      <div className="relative ml-4 flex flex-1 flex-col justify-between sm:ml-6">
        <div className="absolute z-10 right-0 top-0">
          <IconButton onClick={onRemove} icon={<X size={15} />} />
        </div>

        <div className="flex flex-col justify-between pr-9 gap-8 sm:pr-0">
          <p className="text-lg font-semibold text-white">
            {currentlang == "ar" ? data.name : data.nameEn}
          </p>

          <div className="flex items-center space-x-4 mt-2">
            {/* Decrement Button */}
            <button
              onClick={handleDecrement}
              className="w-10 h-10 flex items-center justify-center bg-gray-800 text-white rounded-full transition-transform duration-200 transform hover:scale-110 focus:outline-none"
            >
              <span className="text-2xl font-bold">-</span>
            </button>

            {/* Display quantity */}
            <span className="text-xl font-semibold text-gray-900 py-2 px-4 rounded-md shadow-md border border-gray-300">
              {quantity}
            </span>

            {/* Increment Button */}
            <button
              onClick={handleIncrement}
              className="w-10 h-10 flex items-center justify-center bg-gray-800 text-white rounded-full transition-transform duration-200 transform hover:scale-110 focus:outline-none"
            >
              <span className="text-2xl font-bold">+</span>
            </button>
          </div>

          {/* Display the total price based on quantity */}
          <Currency
            value={totalPrice}
            className="text-2xl font-extrabold text-white"
          />
        </div>
      </div>
    </li>
  );
};
