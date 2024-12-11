// components/Pagination.tsx (Client Component)

"use client";
import { useTranslations } from "next-intl";

const Pagination = ({
  currentPage,
  totalPages,
}: {
  currentPage: number;
  totalPages: number;
}) => {
  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= totalPages) {
      // Update the URL with the new page number and reload the page
      window.location.href = `/shop?page=${newPage}`; // This will reload the page with the updated URL
    }
  };

  const t = useTranslations(""); // For translations (previous/next)

  const pageNumbers: (number | string)[] = [];
  const maxVisiblePages = 3; // Number of pages to show before ellipsis

  // Logic to determine which page numbers to show
  if (currentPage === 1) {
    // First page: show 1, 2, 3, ... last
    for (let i = 1; i <= maxVisiblePages && i <= totalPages; i++) {
      pageNumbers.push(i);
    }
    if (totalPages > maxVisiblePages) pageNumbers.push("...");
    pageNumbers.push(totalPages);
  } else if (currentPage === totalPages) {
    // Last page: show pages... (total-3), (total-2), total
    pageNumbers.push(totalPages - 2);
    pageNumbers.push(totalPages - 1);
    pageNumbers.push(totalPages);
  } else {
    // Middle pages: show current-1, current, current+1, ... last
    pageNumbers.push(currentPage - 1);
    pageNumbers.push(currentPage);
    pageNumbers.push(currentPage + 1);
    if (currentPage + 1 < totalPages) pageNumbers.push("...");
    pageNumbers.push(totalPages);
  }

  return (
    <div className="flex justify-center items-center gap-4 mb-8 px-8">
      {/* Previous Button */}
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-4 py-2 bg-[#000] text-white rounded-md"
      >
        {t("Previous")}
      </button>

      {/* Page Number Buttons */}
      {pageNumbers.map((page, index) => (
        <button
          key={index}
          onClick={() => handlePageChange(typeof page === "number" ? page : currentPage)}
          className={`px-4 py-2 rounded-md ${typeof page === "number" && page === currentPage ? 'bg-[#625bff] text-white' : 'bg-[#E8E8E8] text-[#000]'}`}
          disabled={typeof page === "string"}
        >
          {page}
        </button>
      ))}

      {/* Next Button */}
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-4 py-2 bg-[#000] text-white rounded-md"
      >
        {t("Next")}
      </button>
    </div>
  );
};

export default Pagination;
