import React from "react";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";

const Pagination = ({ currentPage, totalPages, limit, setLimit, onPageChange }) => {
    const handlePrev = () => {
        if (currentPage > 1) onPageChange(currentPage - 1);
    };

    const handleNext = () => {
        if (currentPage < totalPages) onPageChange(currentPage + 1);
    };

    const handleLimitChange = (e) => {
        setLimit(Number(e.target.value));
    };

    // Calculate visible pages
    const getVisiblePages = () => {
        const groupStart = Math.floor((currentPage - 1) / 1) * 1 + 1;
        const groupEnd = Math.min(groupStart + 1, totalPages);

        const pages = [];
        for (let i = groupStart; i <= groupEnd; i++) {
            pages.push(i);
        }
        return pages;
    };

    return (
        <div className="flex items-center justify-between mt-6 flex-wrap gap-3">
            {/* Limit Selector */}
            <div className="flex items-center gap-2">
                <span className="text-gray-600 text-sm">Rows per page:</span>
                <select
                    value={limit}
                    onChange={handleLimitChange}
                    className="border border-gray-300 rounded-lg text-sm px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    {[5, 10, 20, 50].map((val) => (
                        <option key={val} value={val}>
                            {val}
                        </option>
                    ))}
                </select>
            </div>

            {/* Pagination Controls */}
            <div className="flex items-center space-x-2">
                {/* Previous */}
                <button
                    onClick={handlePrev}
                    disabled={currentPage === 1}
                    className={`flex items-center justify-center px-4 h-10 text-base font-medium border rounded-lg transition ${currentPage === 1
                        ? "text-gray-400 bg-gray-100 cursor-not-allowed"
                        : "text-gray-600 bg-white hover:bg-gray-100"
                        }`}
                >
                    <HiChevronLeft className="w-5 h-5 me-1" />

                </button>

                {/* Page Numbers */}
                {getVisiblePages().map((num) => (
                    <button
                        key={num}
                        onClick={() => onPageChange(num)}
                        className={`px-4 h-10  rounded-lg text-base font-medium ${num === currentPage
                            ? "bg-brown-A43 text-white border-blue-500"
                            : "bg-white text-gray-600 hover:bg-gray-100 border-gray-300"
                            }`}
                    >
                        {num}
                    </button>
                ))}

                {/* Next */}
                <button
                    onClick={handleNext}
                    disabled={currentPage === totalPages}
                    className={`flex items-center justify-center px-4 h-10 text-base font-medium border rounded-lg transition ${currentPage === totalPages
                        ? "text-gray-400 bg-gray-100 cursor-not-allowed"
                        : "text-gray-600 bg-white hover:bg-gray-100"
                        }`}
                >

                    <HiChevronRight className="w-5 h-5 ms-1" />
                </button>
            </div>
        </div>
    );
};

export default Pagination;
