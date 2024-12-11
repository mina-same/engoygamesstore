import { getBillboards } from "@/actions/get-billboards";
import { getProducts } from "@/actions/get-products";
import { Billboard as BillboardType } from "@/types";
import { Container } from "@/components/ui/container";
import RotatedBanner from "@/components/RotatedBanner";
import AfterBillboard from "@/components/AfterBillboard";
import { BillboardSlider } from "@/components/BillboardSlider";
import ServiceBoxes from "@/components/ServiceBoxes";
import Testimonials from "@/components/Testimonials";
import { ProductListNew } from "@/components/ProductListNew";
import CategoryDisplay from "@/components/CategoryDisplay";
import sliderOne from "@/public/1.jpg";
import { ProductListThree } from "@/components/ProductListThree";
import { getTranslations } from "next-intl/server";
import CircularImageSlider from "@/components/CircularImageSlider";
import PrizeWheelPopup from "@/components/PrizeWheelPopup";  // Import the client component

export const revalidate = 0;

const HomePage = async () => {
  // Fetch all billboards and products on the server side
  const billboards: BillboardType[] = await getBillboards();
  const products = await getProducts({ isFeatured: true });

  const t = await getTranslations();

  const SpeashialProducts = await getProducts({
    categoryId: "6712b6b5ef2bd5e550f49c78",
  });

  return (
    <Container>
      <div className="pb-10 bg-gradient-to-bl from-[#7f36b9] via-[#6a3fbf] to-[#625bff]">
        <RotatedBanner />

        {/* Pass fetched billboards to CustomSlider */}
        <BillboardSlider data={billboards} />

        <CircularImageSlider />

        <ProductListNew
          title={t("home.newProducts")}
          items={products}
          productCount={6}
        />

        <CategoryDisplay
          backgroundImage={sliderOne.src}
          title={t("category.lighting")}
          description={t("home.comfortableDesign")}
          products={SpeashialProducts}
        />

        <AfterBillboard />

        <ProductListThree
          title={t("home.specialProducts")}
          items={SpeashialProducts}
          productCount={6}
        />

        <ServiceBoxes />

        <CategoryDisplay
          backgroundImage={sliderOne.src}
          title={t("category.lighting")}
          description={t("home.comfortableDesign")}
          products={SpeashialProducts}
        />

        <Testimonials />

        {/* Add the PrizeWheelPopup component here */}
        <PrizeWheelPopup />
      </div>
    </Container>
  );
};

export default HomePage;
