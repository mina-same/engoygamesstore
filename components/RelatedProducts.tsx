// src/components/RelatedProducts.tsx
import { getProducts } from '@/actions/get-products';
import { ProductList } from '@/components/product-list';

interface RelatedProductsProps {
  categoryId: string;
}

const RelatedProducts = async ({ categoryId }: RelatedProductsProps) => {
  // Fetch related products based on the category ID
  // console.log("categoryId", categoryId);
  const products = await await getProducts({
    categoryId: categoryId,
  });

  // If no related products are found, render nothing
  if (!products || products.length === 0) {
    return null;
  }

  return (
    <div className="mt-16">
      <h2 className="text-2xl font-bold text-white">Related Products</h2>
      <ProductList title="related" items={products}/>
    </div>
  );
};

export default RelatedProducts;
