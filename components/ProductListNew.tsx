import { Product } from "@/types";
import { NoResults } from "./ui/no-results";
import { ProductCardNew } from "./ui/ProductCardNew";

interface ProductListNewProps {
  title: string;
  items: Product[];
  productCount: number; // Specify the number of products to display
}

export const ProductListNew: React.FC<ProductListNewProps> = ({
  title,
  items,
  productCount,
}) => {
  // Limit the displayed items to the specified count
  const displayedItems = items.slice(0, productCount);

  return (
    <div className="space-y-4 px-[50px] pb-[50px] pt-[-20px]">

      {/* Check for empty results */}
      {displayedItems.length === 0 ? (
        <NoResults />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
          {displayedItems.map((item) => (
            <ProductCardNew key={item.id} data={item} />
          ))}
        </div>
      )}
    </div>
  );
};
