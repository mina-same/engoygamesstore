"use client";

import React, { useState } from "react";
import { CategoryType, Category, CategoryDisplayNames } from "@/types";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useTranslations, useLocale } from "next-intl";

const CategoryFilter: React.FC<{ categories: Category[] }> = ({ categories }) => {
  const [selectedCategoryType, setSelectedCategoryType] = useState<CategoryType | null>(null);
  const router = useRouter();

  const t = useTranslations("noCategoriesMessage");
  const currentLang = useLocale(); // Get the current language

  // Filter categories based on selected category type
  const filteredCategories = selectedCategoryType
    ? categories.filter((category) => category.categoryType === selectedCategoryType)
    : categories;

  return (
    <div>
      <div className="flex space-x-4 mb-6 justify-center z-40 relative">
        {Object.values(CategoryType).map((type) => (
          <button
            key={type}
            onClick={() => setSelectedCategoryType(type)} // Set the selected category type directly
            className={`px-4 py-2 rounded-md transition-colors duration-200 ${
              selectedCategoryType === type
                ? "bg-[#061743] text-white"
                : "bg-white text-black"
            }`}
            aria-pressed={selectedCategoryType === type}
            aria-label={`Filter categories by ${CategoryDisplayNames[type]}`}
          >
            {CategoryDisplayNames[type]}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
        {filteredCategories.length > 0 ? (
          filteredCategories.map((category) => (
            <div
              key={category.id}
              onClick={() => router.push(`/category/${category.id}`)}
              className="p-4 rounded-lg transition-transform duration-200 hover:scale-105 cursor-pointer"
            >
              <Image
                src={category.billboard.imageUrl || "/placeholder-image.png"}
                alt={currentLang === "ar" ? category.name : category.nameEn} // Use the appropriate name based on language
                width={300}
                height={300}
                className="rounded-md"
                placeholder="blur"
                blurDataURL="/placeholder-image.png"
              />
              <h1 className="text-2xl text-white mb-2 text-center">
                {currentLang === "ar" ? category.name : category.nameEn} {/* Render name or nameEn */}
              </h1>
            </div>
          ))
        ) : (
          <div className="text-center text-white">
            {t("noCategoriesMessage")}
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryFilter;
