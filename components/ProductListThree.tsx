import { Product } from "@/types";
import { NoResults } from "./ui/no-results";
import { ProductCardThree } from "./ui/ProductCardThree";

interface ProductListNewProps {
  title: string;
  items: Product[];
  productCount?: number; // Optional prop to control the number of products displayed
}

export const ProductListThree: React.FC<ProductListNewProps> = ({ title, items, productCount }) => {
  const displayedItems = productCount ? items.slice(0, productCount) : items;

  return (
    <div className="space-y-4 px-[80px] pb-[20px] pt-[-20px]">
      {/* Title Section */}
      <div className="relative text-center mb-8">
        <h2 className="text-5xl font-extrabold text-white p-4 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 text-transparent bg-clip-text transform transition-all duration-300 hover:scale-105 tracking-tight">
          {title}
        </h2>
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-[100px] h-[2px] bg-white"></div>
      </div>

      {/* Check for empty results */}
      {displayedItems.length === 0 ? (
        <NoResults />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedItems.map((item) => (
            <ProductCardThree key={item.id} data={item} />
          ))}
        </div>
      )}
    </div>
  );
};
