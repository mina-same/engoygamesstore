import React from "react";
import ArrowRight from "@/public/ArrowRight.svg";
import engoyGameAvatar from "@/public/engoyGameAvatar.svg";
import vipblot from "@/public/vipblot.svg";
import Image, { StaticImageData } from "next/image";

// Define the types for the props
interface ShopButtonProps {
  text: string;
}

interface ProductInfoProps {
  label: string;
  title: React.ReactNode;
  description: React.ReactNode;
  isFlipped?: boolean;
}

interface ProductCardProps {
  imgSrc: StaticImageData;
  label: string;
  title: string;
  description: string;
  isFlipped?: boolean;
  bgColor: string;
  textColor: string;
}

// Button component for "Shop Now"
const ShopButton: React.FC<ShopButtonProps> = ({ text }) => (
  <div className="px-6 py-2 bg-[#ffd700] rounded-sm flex items-center gap-2 cursor-pointer hover:bg-[#ffcc33] transition-colors">
    <div className="text-white text-sm font-bold font-['Public Sans'] uppercase leading-tight tracking-tight">
      {text}
    </div>
    <div className="w-5 h-5 relative">
      <Image src={ArrowRight} alt="Arrow Right" />
    </div>
  </div>
);

// Information section component
const ProductInfo: React.FC<ProductInfoProps> = ({
  label,
  title,
  description,
  isFlipped,
}) => (
  <div
    className={`flex-col items-start gap-5 ${isFlipped ? "rotate-180 origin-top-left" : ""
      }`}
  >
    <div className="px-3 py-1.5 bg-gradient-to-bl from-[#7f36b9] to-[#625bff] rounded-sm">
      <div className="text-white text-sm font-semibold">{label}</div>
    </div>
    <div className="text-[32px] font-semibold font-['Public Sans'] leading-10">
      {title}
    </div>
    <div className="text-base font-normal">{description}</div>
  </div>
);

// Product card component to display product information
const ProductCard: React.FC<ProductCardProps> = ({
  imgSrc,
  label,
  title,
  description,
  isFlipped,
  bgColor,
  textColor,
}) => (
  <div className={`flex w-full h-[336px] p-11 rounded justify-center items-center gap-10 ${bgColor}`}>
    <Image src={imgSrc} alt={title} className="w-[312px] h-auto max-h-[349px]" />
    <div className="flex-col justify-start items-start gap-5 inline-flex">
      <ProductInfo
        label={label}
        title={<span className={textColor}>{title}</span>}
        description={<span className={textColor}>{description}</span>}
        isFlipped={isFlipped}
      />
      <ShopButton text="Shop now" />
    </div>
  </div>
);

// Main component that displays both products
const AfterBillboard: React.FC = () => {
  return (  
    <div className="pt-[350px] pb-[50px] w-full h-[336px] px-[80px] justify-start items-start gap-6 inline-flex">
      <div className="flex flex-col justify-center items-center">
        {/* First Product Card */}
        <ProductCard
          imgSrc={engoyGameAvatar}
          label="INTRODUCING"
          title="New Apple Homepod Mini"
          description="Jam-packed with innovation, HomePod mini delivers unexpectedly."
          bgColor="bg-white"
          textColor="text-black"
        />
      </div>
      <div className="flex flex-col justify-center items-center">
        {/* Second Product Card */}
        <ProductCard
          imgSrc={vipblot}
          label="INTRODUCING NEW"
          title="Xiaomi Mi 11 Ultra 12GB+256GB"
          description="*Data provided by internal laboratories. Industry measurement."
          bgColor="bg-[#061743]"
          textColor="text-white"
        />
      </div>
    </div>
  );
};

export default AfterBillboard;
