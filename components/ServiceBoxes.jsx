"use client";

import React from "react";
import { FiShield, FiGift, FiDownload } from "react-icons/fi";
import { useTranslations } from "next-intl"; // Localization hook

const ServiceBoxes = () => {
  const t = useTranslations("servicesBoxes"); // Specify the JSON namespace

  const services = [
    {
      id: 1,
      icon: <FiShield className="text-yellow-500 text-4xl mb-2" aria-hidden="true" />,
      title: t("secure_payments.title"),
      description: t("secure_payments.description"),
    },
    {
      id: 2,
      icon: <FiGift className="text-yellow-500 text-4xl mb-2" aria-hidden="true" />,
      title: t("best_prices.title"),
      description: t("best_prices.description"),
    },
    {
      id: 3,
      icon: <FiDownload className="text-yellow-500 text-4xl mb-2" aria-hidden="true" />,
      title: t("fast_shipping.title"),
      description: t("fast_shipping.description"),
    },
  ];

  return (
    <div className="flex flex-col sm:flex-row justify-center items-center gap-10 p-6 px-[80px]">
      {services.map((service) => (
        <div
          key={service.id}
          className="bg-white flex flex-col items-center w-full sm:w-1/3 px-6 py-14 shadow-lg rounded-lg text-center border border-gray-100 transition-transform transform hover:scale-105 hover:bg-yellow-50 duration-300"
        >
          {service.icon}
          <h3 className="text-black text-lg font-semibold mb-2">{service.title}</h3>
          <p className="text-gray-900 text-sm">{service.description}</p>
        </div>
      ))}
    </div>
  );
};

export default ServiceBoxes;
