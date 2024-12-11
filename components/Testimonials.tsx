import Image from "next/image";
import React from "react";
import { BsCheckCircleFill } from "react-icons/bs";
import { useTranslations } from "next-intl";

const Testimonials = () => {
  const t = useTranslations("testimonials");

  // Extract reviews as an array
  const testimonials = t.raw("reviews") as any[];

  return (
    <section className="pt-[350px] pb-20">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white">{t("heading")}</h2>
      </div>

      <div className="flex justify-center gap-14 pt-10 flex-wrap">
        {testimonials.map((testimonial, index) => (
          <div
            key={index}
            className={`w-[320px] bg-white rounded-lg shadow-lg p-6 text-${
              t("direction") === "rtl" ? "right" : "left"
            }`}
          >
            <div className="flex items-center gap-4 mb-4">
              <Image
                src={testimonial.avatar} // Accessing `avatar` directly from the testimonial object
                width={48}
                height={48}
                alt={testimonial.name}
                className="w-12 h-12 rounded-full"
              />
              <div>
                <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-1">
                  {testimonial.name}{" "}
                </h3>
                <p className="text-gray-500">{testimonial.username}</p>
              </div>
            </div>
            <p className="text-gray-700 mb-4">{testimonial.text}</p>
            <div className="flex justify-between items-center text-gray-400">
              <p className="text-gray-500 text-sm">{testimonial.date}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
