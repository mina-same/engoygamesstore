"use client";

import { useState } from "react";
import { FaBell, FaFingerprint, FaClock, FaDollarSign, FaTags } from "react-icons/fa";
import { useTranslations } from "next-intl";

const iconMap: Record<string, JSX.Element> = {
  FaBell: <FaBell />,
  FaFingerprint: <FaFingerprint />,
  FaClock: <FaClock />,
  FaDollarSign: <FaDollarSign />,
  FaTags: <FaTags />,
};

interface Ad {
  icon: keyof typeof iconMap;
  text: string;
}

const AngelAd: React.FC = () => {
  const t = useTranslations(); // Translation function
  const [isVisible, setIsVisible] = useState(true);

  // Retrieve raw data as an array of Ad objects
  const ads = t.raw("ads") as Ad[];

  const closeAd = () => {
    setIsVisible(false);
  };

  return (
    isVisible && (
      <div className="relative bg-black text-white overflow-hidden">
        {/* Scrolling Section */}
        <div className="w-full overflow-hidden">
          <div className="flex whitespace-nowrap animate-scroll gap-10">
            {ads.map((ad, index) => (
              <div
                key={index}
                className="flex items-center gap-3 px-6 py-2 text-lg"
              >
                <span className="text-yellow-400 text-2xl">
                  {iconMap[ad.icon]} {/* Render the mapped icon */}
                </span>
                <span>{ad.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Close Button */}
        <button
          onClick={closeAd}
          className="absolute top-2 left-2 text-white rounded-full w-8 h-8 flex items-center justify-center bg-red-600 hover:bg-red-900"
        >
          ✕
        </button>
      </div>
    )
  );
};

export default AngelAd;
