import { Product } from "@/types";
import qs from "query-string";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/productPage`;

interface Query {
  categoryId?: string;
  isFeatured?: boolean;
  page?: number;
  limit?: number;
}

// actions/get-productPage.ts
export const getProducts = async (
  query: Query
): Promise<{ products: Product[]; totalProducts: number }> => {
  const url = qs.stringifyUrl({
    url: URL,
    query: {
      categoryId: query.categoryId,
      isFeatured: query.isFeatured,
      page: query.page || 1,
      limit: query.limit || 10,
    },
  });

  const res = await fetch(url, {
    method: "GET",
    cache: "no-store", // Disable caching
  });

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  const data = await res.json();

  return {
    products: data.products || [], // Ensure products exist
    totalProducts: data.totalProducts || 0, // Ensure totalProducts exists
  };
};
