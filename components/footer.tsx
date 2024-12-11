import React from "react";
import "./FotterStyle.css";
import Image from "next/image";
import { getTranslations } from "next-intl/server"; // Importing useTranslation

interface FooterProps {
  className?: string;
}

export const Footer: React.FC<FooterProps> = async ({ className }) => {
  const t = await getTranslations(); // Using useTranslation hook

  return (
    <div className="flex flex-col bg-[#f9fafb]">
      <Image src="/svg/Shape.svg" alt="shape" width={2000} height={400} />

      <div className="w-full max-w-[1090px] h-auto relative mx-auto top-[-150px] p-4">
        <div className="w-full h-full bg-[#ffd700] rounded-[10px] relative flex flex-col lg:flex-row justify-between items-center p-6">
          <div className="flex flex-col gap-3 lg:max-w-[60%] text-left">
            <h2 className="text-black text-[28px] font-normal font-playfair px-10">
              {t("footer_title")}
            </h2>
            <p className="text-black text-sm font-light font-poppins opacity-70 lg:max-w-[400px]">
              {t("footer_description")}
            </p>
          </div>

          <div className="flex justify-between items-center w-full lg:w-[40%] mt-4 lg:mt-0">
            <input
              type="email"
              placeholder={t("email_placeholder")}
              className="w-[70%] h-[56px] p-2 rounded border border-gray-300 text-gray-800 font-poppins placeholder-gray-400 transition focus:outline-none focus:ring-2 focus:ring-[#23204c] focus:border-transparent"
            />
            <button className="w-[30%] h-[56px] bg-[#23204c] text-white font-poppins uppercase rounded transition hover:bg-[#1b1d2c] focus:outline-none">
              {t("subscribe_button")}
            </button>
          </div>
        </div>
      </div>

      <div className="w-[1314px] h-6 my-10 ml-16 justify-around items-center gap-[570px] flex">
        <div className="w-[520px] h-[18px] relative flex-row justify-between items-start flex">
          <div className="text-[#09132e] text-base font-normal font-['Poppins']">
            {t("footer_links.home")}
          </div>
          <div className="text-[#09132e] text-base font-normal font-['Poppins']">
            {t("footer_links.categories")}
          </div>
          <div className="text-[#09132e] text-base font-normal font-['Poppins']">
            {t("footer_links.shop")}
          </div>
          <div className="text-[#09132e] text-base font-normal font-['Poppins']">
            {t("footer_links.contact_us")}
          </div>
        </div>

        <div className="w-60 h-6 relative ml-40 flex flex-row gap-4">
          <Image
            className="w-[26.67px] h-[17px]"
            src="/svg/facebookBurble.svg"
            alt="social"
            width={500}
            height={24}
          />
          <Image
            className="w-[26.67px] h-[17px]"
            src="/svg/twitterBurble.svg"
            alt="social"
            width={500}
            height={24}
          />
          <Image
            className="w-[26.67px] h-[17px]"
            src="/svg/vimeoBurble.svg"
            alt="social"
            width={500}
            height={24}
          />
          <Image
            className="w-[26.67px] h-[17px]"
            src="/svg/youtubeBurble.svg"
            alt="social"
            width={500}
            height={24}
          />
        </div>
      </div>

      <div className="h-[61px] mb-10 ml-16 py-5 border-t border-black/25 justify-start items-start gap-[880px] inline-flex">
        <div className="text-[#09132e] text-sm font-normal font-['Poppins']">
          {t("rights_reserved")}
        </div>
        <div className="w-[256.67px] text-right text-[#09132e] text-sm font-normal font-['Poppins']">
          {t("terms_and_conditions")}
          <a
            href="https://mina-portfolio-developer.netlify.app/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="text-[#6e00ff]">@MinaSamy</span>
          </a>
        </div>
      </div>
    </div>
  );
};
