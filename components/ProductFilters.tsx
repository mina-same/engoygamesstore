"use client";

import React, { useState } from "react";
import { ProductList } from "@/components/product-list";
import { Product } from "@/types";
import { Category } from "@/types";
import { FaFilterCircleDollar } from "react-icons/fa6"; // Import the filter icon
import { useTranslations, useLocale } from "next-intl"; // Import the translation hook
import makeAction from "@/components/makeAction"; // Import the makeAction function

interface Filters {
  priceRange: "low" | "high" | null;
  rating: number | null;
}

interface ProductFiltersProps {
  products: Product[];
  categories: Category[];
}

const ProductFilters: React.FC<ProductFiltersProps> = ({
  products,
  categories,
}) => {
  const t = useTranslations("productFilters"); // Get translations for this page

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [filters, setFilters] = useState<Filters>({
    priceRange: null,
    rating: null,
  });
  const [categoryDropdownOpen, setCategoryDropdownOpen] = useState(false);
  const [filterDropdownOpen, setFilterDropdownOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [allProducts, setAllProducts] = useState<Product[]>(products); // Store all products here

  const currentLang = useLocale(); // Get the current locale

  // Function to handle category selection
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setCategoryDropdownOpen(false); // Close dropdown after selection
  };

  // Function to handle filter change
  const handleFilterChange = (
    filterName: keyof Filters,
    value: Filters[keyof Filters]
  ) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterName]: value,
    }));
    setFilterDropdownOpen(false); // Close dropdown after selection
  };

  // Filtered Products
  const filteredProducts = allProducts
    .filter((product) => {
      // Filter by category if selected
      if (selectedCategory) {
        return product.categoryId === selectedCategory;
      }
      return true;
    })
    .sort((a, b) => {
      // Sort by price based on priceRange filter
      if (filters.priceRange === "low") {
        return a.price - b.price;
      } else if (filters.priceRange === "high") {
        return b.price - a.price;
      }
      return 0;
    });

  return (
    <div className="text-black min-h-screen p-10  ">
      {/* Filters and Categories */}
      <div className="flex justify-between items-center mb-8 border-b border-gray-300 pb-4 px-[100px]">
        {/* Filters Dropdown Section */}
        <div className="relative">
          <button
            className="bg-white font-semibold text-lg py-2 px-4 border border-gray-300 rounded flex items-center gap-2"
            onClick={() => setFilterDropdownOpen(!filterDropdownOpen)}
          >
            {t("filters")}
            <FaFilterCircleDollar className="text-xl" />{" "}
            {/* Add the filter icon */}
          </button>
          {filterDropdownOpen && (
            <div className="absolute left-0 mt-2 w-48 bg-white border border-gray-300 rounded shadow-lg z-10">
              <button
                onClick={() => handleFilterChange("priceRange", "low")}
                className={`block w-full text-left px-4 py-2 hover:bg-gray-100 ${
                  filters.priceRange === "low" ? "font-bold" : ""
                }`}
              >
                {t("lowPrice")}
              </button>
              <button
                onClick={() => handleFilterChange("priceRange", "high")}
                className={`block w-full text-left px-4 py-2 hover:bg-gray-100 ${
                  filters.priceRange === "high" ? "font-bold" : ""
                }`}
              >
                {t("highPrice")}
              </button>
            </div>
          )}
        </div>

        {/* Categories Dropdown Section */}
        <div className="relative">
          <button
            className="bg-white font-semibold text-lg py-2 px-4 border border-gray-300 rounded flex items-center gap-2"
            onClick={() => setCategoryDropdownOpen(!categoryDropdownOpen)}
          >
            {t("categories")}
            <span
              className={`transform transition-transform ${
                categoryDropdownOpen ? "rotate-180" : "rotate-0"
              }`}
            >
              ▼
            </span>
          </button>
          {categoryDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded shadow-lg z-10">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => handleCategoryChange(category.id)}
                  className={`block w-full text-left px-4 py-2 hover:bg-gray-100 ${
                    selectedCategory === category.id ? "font-bold" : ""
                  }`}
                >
                  {currentLang == "ar" ? category.name : category.nameEn}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Product List with Filtered Products */}
      <ProductList title={t("category")} items={filteredProducts} />
    </div>
  );
};

export default ProductFilters;