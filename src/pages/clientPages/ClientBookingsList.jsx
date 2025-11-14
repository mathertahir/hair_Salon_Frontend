

import React, { useContext, useEffect, useState } from "react";
import useAPI from "../../services/baseUrl/useApiHook";
import { AuthContext } from "../../services/context/AuthContext";
import { ToastService } from "../../utils/ToastService";
import { handleApiError } from "../../utils/helpers/HelperFunction";
import { ButtonSquare } from "../../components/ui/buttonSquare";
import Pagination from "../../components/ui/Pagination";

import { FaTrash } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa6";
import { RxCross1 } from "react-icons/rx";
import { Link } from "react-router-dom";
import FilterDropdown from "../../components/FilterDropdown";
import RatingStar from "../../components/ui/RatingStar";
import review from "../../assets/review.webp";

const ClientBookingsList = () => {
    const API = useAPI();
    const { authToken } = useContext(AuthContext);

    const [loading, setLoading] = useState(true);
    const [bookings, setBookings] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [totalPages, setTotalPages] = useState(1);
    const [selectedFilter, setSelectedFilter] = useState(null);
    const [bookingDate, setBookingDate] = useState("");
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [selectedBookingId, setSelectedBookingId] = useState(null);
    const [isCompleteBooking, setIsCompleteBooking] = useState(false);

    const [rating, setRating] = useState(3);
    const [comment, setComment] = useState("");

    const filterItems = [
        { key: 0, label: "Pending" },
        { key: 1, label: "Approved" },
        { key: 2, label: "Completed" },
    ];

    // Fetch bookings
    const fetchUserBookings = async () => {
        setLoading(true);
        try {
            let url = `/api/user/booking/list?page=${currentPage}&limit=${limit}`;
            if (selectedFilter !== null) url += `&active=${selectedFilter}`;
            if (bookingDate) url += `&bookingDate=${bookingDate}`;

            const response = await API.get(url, {
                headers: { Authorization: authToken },
            });

            const { bookings = [], pagination } = response.data.responseData || {};
            setBookings(bookings);
            setTotalPages(pagination?.totalPages || 1);
        } catch (error) {
            handleApiError(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUserBookings();
    }, [currentPage, limit, selectedFilter, bookingDate]);

    // Delete booking
    const handleDelete = async () => {
        try {
            await API.delete(`/api/user/booking/${selectedBookingId}`, {
                headers: { Authorization: authToken },
            });
            ToastService.success("Booking deleted successfully!");
            fetchUserBookings();
        } catch (error) {
            handleApiError(error);
        } finally {
            setDeleteModalOpen(false);
            setSelectedBookingId(null);
        }
    };

    // Open review modal
    const handleOpenCompleteModal = (id) => {
        setSelectedBookingId(id);
        setIsCompleteBooking(true);
    };

    // Complete booking + send review
    const handleCompleteBooking = async () => {
        if (!rating || !comment.trim()) {
            return ToastService.error("Please add rating & comment.");
        }

        try {
            const payload = { rating, comment };

            await API.post(
                `/api/user/booking/${selectedBookingId}/processPayment`,
                payload,
                { headers: { Authorization: authToken } }
            );

            ToastService.success("Review submitted & booking completed!");
            setIsCompleteBooking(false);
            setComment("");
            setRating(3);
            fetchUserBookings();
        } catch (error) {
            handleApiError(error);
        }
    };

    return (
        <div className="p-4 flex flex-col gap-8">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between gap-4 items-center">
                <p className="text-brown-A43 font-playfair font-bold sm:text-[30px] text-[20px]">
                    My Bookings
                </p>

                <div className="flex flex-wrap items-center gap-4">
                    <FilterDropdown
                        items={filterItems}
                        selectedKey={selectedFilter}
                        onSelect={setSelectedFilter}
                        placeholder="Filter by Status"
                    />

                    <input
                        type="date"
                        value={bookingDate}
                        onChange={(e) => setBookingDate(e.target.value)}
                        className="border px-3 py-2 rounded-md text-gray-700"
                    />

                    <ButtonSquare
                        className="bg-gray-200 text-gray-700"
                        onClick={() => {
                            setSelectedFilter(null);
                            setBookingDate("");
                        }}
                    >
                        Reset Filters
                    </ButtonSquare>
                </div>
            </div>

            {/* Table */}
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                        <tr>
                            <th className="px-6 py-3">Service</th>
                            <th className="px-6 py-3">Price</th>
                            <th className="px-6 py-3">Hairstylist</th>
                            <th className="px-6 py-3">Date</th>
                            <th className="px-6 py-3">Status</th>
                            <th className="px-6 py-3">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {loading ? (
                            <tr>
                                <td colSpan="6" className="text-center py-6 text-gray-400 italic">
                                    Loading...
                                </td>
                            </tr>
                        ) : bookings.length > 0 ? (
                            bookings.map((booking, index) => (
                                <tr
                                    key={booking._id}
                                    className={`${index % 2 === 0 ? "bg-white" : "bg-gray-50"} border-b hover:bg-gray-100`}
                                >
                                    <td className="px-6 py-4">{booking?.serviceInfo?.name || "N/A"}</td>
                                    <td className="px-6 py-4">${booking?.serviceInfo?.price || "N/A"}</td>
                                    <td className="px-6 py-4">{booking?.business?.businessName || "N/A"}</td>
                                    <td className="px-6 py-4">
                                        {new Date(booking.bookingDate).toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-4">
                                        {booking.bookingStatus === 0
                                            ? "Pending"
                                            : booking.bookingStatus === 1
                                                ? "Approved"
                                                : "Completed"}
                                    </td>

                                    <td className="px-6 py-4 flex items-center gap-3">
                                        <Link to={`/user/bookingDetails/${booking._id}`} className="text-brown-A43">
                                            <FaRegEye size={18} />
                                        </Link>

                                        {/* Only Show Complete Btn When Approved */}
                                        {booking.bookingStatus === 1 && (
                                            <button
                                                onClick={() => handleOpenCompleteModal(booking._id)}
                                                className="text-blue-600 hover:text-blue-800 font-bold text-lg"
                                            >
                                                ✓
                                            </button>
                                        )}

                                        <button
                                            onClick={() => {
                                                setSelectedBookingId(booking._id);
                                                setDeleteModalOpen(true);
                                            }}
                                            className="text-red-600 hover:text-red-800"
                                        >
                                            <FaTrash size={18} />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" className="text-center py-6 text-gray-400 italic">
                                    No bookings found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                limit={limit}
                setLimit={setLimit}
                onPageChange={setCurrentPage}
            />

            {/* Delete Modal */}
            {deleteModalOpen && (
                <div className="fixed inset-0 z-50 flex justify-center items-center bg-black-050">
                    <div className="relative p-4 w-full max-w-md bg-white rounded-lg shadow-lg">
                        <button
                            type="button"
                            className="absolute top-3 right-3 text-gray-400 hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 flex justify-center items-center"
                            onClick={() => setDeleteModalOpen(false)}
                        >
                            <RxCross1 size={20} />
                        </button>

                        <div className="p-5 text-center">
                            <h3 className="mb-5 text-lg font-normal text-gray-600">
                                Are you sure you want to delete this booking?
                            </h3>

                            <div className="flex justify-center gap-3">
                                <button
                                    onClick={handleDelete}
                                    className="text-white bg-red-600 rounded-lg px-5 py-2.5"
                                >
                                    Yes, Delete
                                </button>
                                <button
                                    onClick={() => setDeleteModalOpen(false)}
                                    className="bg-white border border-gray-300 rounded-lg px-5 py-2.5"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Complete Booking (Review Modal) */}
            {isCompleteBooking && (
                <div className="fixed inset-0 z-50 flex justify-center items-center bg-black-050">
                    <div className="relative p-4 w-full max-w-[650px] bg-white rounded-[20px] shadow-xl"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            className="absolute top-3 right-3 text-gray-500 hover:text-red-500"
                            onClick={() => setIsCompleteBooking(false)}
                        >
                            <RxCross1 size={24} />
                        </button>

                        <div className="flex flex-col gap-5 p-6 text-center">
                            <img src={review} alt="review" className="mx-auto w-40 rounded-lg" />
                            <h2 className="font-bold text-lg">Your Service Completed</h2>
                            <p className="text-gray-600">Thanks for choosing us.</p>

                            <h2 className="font-bold text-lg">Add a Review</h2>

                            <RatingStar value={rating} onChange={setRating} size={28} color="#fbbf24" />

                            <textarea
                                className="border w-full rounded-md p-3 bg-gray-50"
                                placeholder="Add a Review For Better Services"
                                rows={3}
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                required
                            />

                            <div className="flex gap-4 mt-2">
                                <ButtonSquare
                                    className="w-1/2 border border-brown-A43 text-brown-A43 font-bold"
                                    onClick={() => setIsCompleteBooking(false)}
                                >
                                    Cancel
                                </ButtonSquare>

                                <ButtonSquare
                                    className="w-1/2 bg-brown-A43 text-white font-bold"
                                    onClick={handleCompleteBooking}
                                >
                                    Completed
                                </ButtonSquare>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ClientBookingsList;
