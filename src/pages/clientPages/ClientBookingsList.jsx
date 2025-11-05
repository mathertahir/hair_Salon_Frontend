import React, { useContext, useEffect, useState } from "react";
import useAPI from "../../services/baseUrl/useApiHook";
import { AuthContext } from "../../services/context/AuthContext";
import { ToastService } from "../../utils/ToastService";
import { handleApiError } from "../../utils/helpers/HelperFunction";
import { ButtonSquare } from "../../components/ui/buttonSquare";
import Pagination from "../../components/ui/Pagination";
import { PhotoProvider, PhotoView } from "react-photo-view";
import { FaTrash, FaEdit } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa6";
import { RxCross1 } from "react-icons/rx";
import { Link } from "react-router-dom";
import FilterDropdown from '../../components/FilterDropdown';// ✅ Make sure this exists

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

    const filterItems = [
        { key: 0, label: "Pending" },
        { key: 1, label: "Approved" },
        { key: 2, label: "Completed" },
    ];

    // ✅ Fetch Bookings
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

    // ✅ Delete Booking
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

    // ✅ Update Booking (approve or mark complete)
    const handleUpdateBooking = async (id, status) => {
        try {
            await API.put(
                `/api/user/booking/${id}`,
                { active: status },
                { headers: { Authorization: authToken } }
            );
            ToastService.success(
                status === 1
                    ? "Booking approved!"
                    : status === 2
                        ? "Booking marked as completed!"
                        : "Booking updated!"
            );
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
                    {/* ✅ Filter Dropdown */}
                    <FilterDropdown
                        items={filterItems}
                        selectedKey={selectedFilter}
                        onSelect={setSelectedFilter}
                        placeholder="Filter by Status"
                    />

                    {/* ✅ Date Filter */}
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
                            <th scope="col" className="px-6 py-3">Service</th>
                            <th scope="col" className="px-6 py-3">Price</th>
                            <th scope="col" className="px-6 py-3">Hairstylist</th>
                            <th scope="col" className="px-6 py-3">Date</th>

                            <th scope="col" className="px-6 py-3">Status</th>
                            <th scope="col" className="px-6 py-3">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr>
                                <td colSpan="5" className="text-center py-6 text-gray-400 italic">
                                    Loading...
                                </td>
                            </tr>
                        ) : bookings.length > 0 ? (
                            bookings.map((booking, index) => (
                                <tr
                                    key={booking._id || index}
                                    className={`${index % 2 === 0 ? "bg-white" : "bg-gray-50"} border-b hover:bg-gray-100`}
                                >
                                    <td className="px-6 py-4 font-medium text-gray-900">
                                        {booking?.serviceInfo?.name || "N/A"}
                                    </td>
                                    <td className="px-6 py-4">
                                        ${booking?.serviceInfo?.price || "N/A"}
                                    </td>
                                    <td className="px-6 py-4">
                                        {booking?.business?.businessName || "N/A"}
                                    </td>
                                    <td className="px-6 py-4">
                                        {new Date(booking.bookingDate).toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-4">
                                        {booking.bookingStatus === 0
                                            ? "Pending"
                                            : booking.active === 1
                                                ? "Approved"
                                                : "Completed"}
                                    </td>
                                    <td className="px-6 py-4 flex items-center gap-3">
                                        {/* ✅ View Detail */}
                                        <Link
                                            to={`/user/bookingDetails/${booking._id}`}
                                            className="text-brown-A43"
                                        >
                                            <FaRegEye size={18} />
                                        </Link>

                                        {/* ✅ Approve */}
                                        {booking.active === 0 && (
                                            <button
                                                onClick={() =>
                                                    handleUpdateBooking(booking._id, 1)
                                                }
                                                className="text-green-600 hover:text-green-800"
                                            >
                                                <FaEdit size={18} />
                                            </button>
                                        )}

                                        {/* ✅ Complete */}
                                        {booking.active === 1 && (
                                            <button
                                                onClick={() =>
                                                    handleUpdateBooking(booking._id, 2)
                                                }
                                                className="text-blue-600 hover:text-blue-800"
                                            >
                                                ✓
                                            </button>
                                        )}

                                        {/* ✅ Delete */}
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
                                <td colSpan="5" className="text-center py-6 text-gray-400 italic">
                                    No bookings found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* ✅ Pagination */}
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                limit={limit}
                setLimit={setLimit}
                onPageChange={setCurrentPage}
            />

            {/* ✅ Delete Modal */}
            {deleteModalOpen && (
                <div className="fixed inset-0 z-50 flex justify-center items-center bg-black-050">
                    <div
                        className="relative p-4 w-full max-w-md bg-white rounded-lg shadow-lg"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            type="button"
                            className="absolute top-3 right-3 text-gray-400 hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center"
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
                                    type="button"
                                    className="text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5"
                                >
                                    Yes, Delete
                                </button>
                                <button
                                    onClick={() => setDeleteModalOpen(false)}
                                    type="button"
                                    className="text-gray-900 bg-white border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ClientBookingsList;
