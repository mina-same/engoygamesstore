// pages/CategoryPage.tsx
import React from "react";
import { getCategories } from "@/actions/get-categories";
import { getBillboardById } from "@/actions/get-billoard";
import { Category } from "@/types";
import CategoryFilter from "./CategoryFilter";
import { getTranslations } from "next-intl/server";

const CategoryPage: React.FC = async () => {
    const categories = await getCategories();

    // console.log(categories)

    const t = await getTranslations();
    
    // Fetching billboards for each category
    const billboards = await Promise.all(
        categories.map((category) => getBillboardById(category.billboardId))
    );

    // Map billboards to categories for easier access
    const categoryData = categories.map((category, index) => ({
        ...category,
        billboard: billboards[index], // Attach the fetched billboard data
    }));

    return (
        <div className="px-28 p-6 bg-gradient-to-bl from-[#7f36b9] via-[#6a3fbf] to-[#625bff]">
            <h1 className="text-4xl text-white mb-6 text-center">{t('categoriesTitle')}</h1>
            <CategoryFilter categories={categoryData} /> {/* Pass combined data */}
        </div>
    );
};

export default CategoryPage;
