import { getProducts } from "@/actions/get-productPage";
import { getCategories } from "@/actions/get-categories";
import ProductFilters from "@/components/ProductFilters";
import Pagination from "@/components/Pagination"; // Include your Pagination component
import { Product } from "@/types"; // Assuming you have a Product type
import React from "react";

interface ShopPageProps {
  params: {
    locale: string;
  };
  searchParams: {
    page?: string; // To get the current page from the URL
  };
}

const ShopPage = async ({ searchParams }: ShopPageProps) => {
  const page = Number(searchParams.page) || 1; 
  const limit = 18;

  // Fetch products and categories from the server
  const productsData = await getProducts({ isFeatured: true, page, limit });
  const AllProducts = await getProducts({ isFeatured: true });
  const categories = await getCategories();

  // Calculate total pages (assuming you have the total count of products available)
  const totalPages = Math.ceil(productsData.totalProducts / limit);

  return (
    <div>
      <div className="flex flex-col gap-y-8 sm:px-6 lg:px-8 pt-14 bg-gradient-to-bl from-[#7f36b9] to-[#625bff] rounded-sm">
        {/* Pass products and categories data to the ProductFilters component */}
        <ProductFilters products={productsData.products} categories={categories} />

        {/* Pagination controls */}
        <Pagination currentPage={page} totalPages={totalPages} />
      </div>
    </div>
  );
};

export default ShopPage;