// components/SocialShare.tsx
import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaWhatsapp,
  FaInstagram,
  FaSnapchatGhost,
} from "react-icons/fa";
import { getLocale } from "next-intl/server";

interface SocialShareProps {
  productUrl: string;
  productTitle: string;
  productImage: string;
}

const SocialShare: React.FC<SocialShareProps> = async ({
  productUrl,
  productTitle,
  productImage,
}) => {
  // Encode the URL and title for sharing
  const encodedUrl = encodeURIComponent(productUrl);
  const encodedTitle = encodeURIComponent(productTitle);
  const encodedImage = encodeURIComponent(productImage);

  // Social media share links
  const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
  const twitterShareUrl = `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`;
  const whatsappShareUrl = `https://wa.me/?text=${encodedTitle} ${encodedUrl}`;
  const instagramShareUrl = `https://www.instagram.com/?url=${encodedUrl}`; // Instagram does not support direct sharing via URL
  const snapchatShareUrl = `https://www.snapchat.com/scan?attachmentUrl=${encodedUrl}&text=${encodedTitle}`; // No direct share API, but opens Snapchat

  const currentLang = await getLocale();

  return (
    <div className="flex flex-col sm:flex-row items-center sm:items-start mt-6 justify-between">

      {/* Social Icons */}
      <div className="flex gap-6 mt-2 sm:mt-0">
        {/* Facebook Share */}
        <a
          href={facebookShareUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="social-icon"
        >
          <FaFacebookF className="text-white hover:text-blue-600" size={30} />
        </a>

        {/* Twitter Share */}
        <a
          href={twitterShareUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="social-icon"
        >
          <FaTwitter className="text-white hover:text-blue-400" size={30} />
        </a>

        {/* WhatsApp Share */}
        <a
          href={whatsappShareUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="social-icon"
        >
          <FaWhatsapp className="text-white hover:text-green-500" size={30} />
        </a>

        {/* Instagram Share */}
        <a
          href={instagramShareUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="social-icon"
        >
          <FaInstagram className="text-white hover:text-[#C13584]" size={30} />
        </a>

        {/* Snapchat Share */}
        <a
          href={snapchatShareUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="social-icon"
        >
          <FaSnapchatGhost className="text-white hover:text-yellow-500" size={30} />
        </a>
      </div>

      <div className="text-xl font-semibold sm:mr-4 text-white">
        {currentLang === "ar" ? ":شارك هذا المنتج عبر" : "Share this product:"}
      </div>
    </div>
  );
};

export default SocialShare;
