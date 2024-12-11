import { getCategory } from "@/actions/get-category";
import { getProducts } from "@/actions/get-products";
import { NoResults } from "@/components/ui/no-results";
import { ProductCard } from "@/components/ui/product-card";
import { getLocale } from "next-intl/server";

export const revalidate = 0;

interface CategoryPageProps {
  params: {
    categoryId: string;
  };
}

const CategoryPage: React.FC<CategoryPageProps> = async ({ params }) => {
  // Fetch products and category data
  const products = await getProducts({
    categoryId: params.categoryId,
  });

  const category = await getCategory(params.categoryId);

  const currentLang = await getLocale();

  return (
    <div className="min-h-screen py-10 flex flex-col items-center bg-gradient-to-bl from-[#7f36b9] via-[#6a3fbf] to-[#625bff]">
      <h1 className="text-3xl font-bold text-center mb-8 text-white">
        {currentLang == "ar" ? category.name : category.nameEn}
      </h1>

      <div className="w-full max-w-7xl px-4 sm:px-6 lg:px-8 pb-24">
        <div className="flex justify-center">
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.length === 0 ? (
              <NoResults />
            ) : (
              products.map((product) => (
                <ProductCard key={product.id} data={product} />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
