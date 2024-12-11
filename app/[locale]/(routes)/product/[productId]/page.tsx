import { getProduct } from "@/actions/get-product";
import { getProducts } from "@/actions/get-products";
import { getCategory } from "@/actions/get-category";
import { Gallery } from "@/components/gallery";
import { ProductList } from "@/components/product-list";
import { Container } from "@/components/ui/container";
import ProductTabs from "@/components/ProductTabs";
import { getLocale, getTranslations } from "next-intl/server";
import dynamic from "next/dynamic";
import { InfoWithForm } from "@/components/InfoWithForm";
import SocialShare from "@/components/SocialShare"; // Import the SocialShare component

interface ProductPageProps {
  params: {
    productId: string;
  };
}

const ProductPage: React.FC<ProductPageProps> = async ({ params }) => {
  const product = await getProduct(params.productId);
  const suggestedProducts = await getProducts({
    categoryId: product?.category?.id,
  });
  const category = await getCategory(product?.category?.id);

  const currentLang = await getLocale();
  const t = await getTranslations("productPage");

  // Define the product URL, title, and image for sharing
  const productUrl = `https://EngoyGames.com/product/${product.id}`; // Replace with actual product URL
  const productTitle =
    currentLang === "ar" ? String(product.name) : String(product.nameEn);
  const productImage = product.images[0]?.url || ""; // Assuming the first image is used for sharing

  return (
    <div className="bg-gradient-to-bl from-[#7f36b9] via-[#6a3fbf] to-[#625bff] py-[80px] px-8">
      <Container>
        <div className="px-4 py-10 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
            {/* Product Gallery */}
            <Gallery images={product.images} />

            {/* Product Info with Form */}
            <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
              <InfoWithForm
                data={product}
                categoryFields={category?.fields}
                currentLang={currentLang}
              />
              {/* Social Share Component */}
              <SocialShare
                productUrl={productUrl}
                productTitle={productTitle}
                productImage={productImage}
              />
            </div>
          </div>

          {/* Suggested Products */}
          <ProductList title={t("similarProducts")} items={suggestedProducts} />
        </div>
      </Container>
    </div>
  );
};

export default ProductPage;
