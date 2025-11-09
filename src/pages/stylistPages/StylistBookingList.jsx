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
import FilterDropdown from "../../components/FilterDropdown";

const StylistBookingList = () => {
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
      let url = `/api/business/booking/list?page=${currentPage}&limit=${limit}`;
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
      await API.delete(`/api/business/booking/${selectedBookingId}`, {
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
        `/api/business/booking/${id}`,
        { bookingStatus: status },
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
              <th scope="col" className="px-6 py-3">
                Service
              </th>
              <th scope="col" className="px-6 py-3">
                Price
              </th>
              <th scope="col" className="px-6 py-3">
                Booking User
              </th>

              <th scope="col" className="px-6 py-3">
                Booking User Email
              </th>
              <th scope="col" className="px-6 py-3">
                Booking User Phone
              </th>
              <th scope="col" className="px-6 py-3">
                Date
              </th>

              <th scope="col" className="px-6 py-3">
                Status
              </th>
              <th scope="col" className="px-6 py-3">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td
                  colSpan="5"
                  className="text-center py-6 text-gray-400 italic"
                >
                  Loading...
                </td>
              </tr>
            ) : bookings.length > 0 ? (
              bookings.map((booking, index) => (
                <tr
                  key={booking._id || index}
                  className={`${
                    index % 2 === 0 ? "bg-white" : "bg-gray-50"
                  } border-b hover:bg-gray-100`}
                >
                  <td className="px-6 py-4 font-medium text-gray-900">
                    {booking?.serviceInfo?.name || "N/A"}
                  </td>
                  <td className="px-6 py-4">
                    ${booking?.serviceInfo?.price || "N/A"}
                  </td>
                  <td className="px-6 py-4">
                    {booking?.bookingUser.name || "N/A"}
                  </td>
                  <td className="px-6 py-4">
                    {booking?.bookingUser.email || "N/A"}
                  </td>
                  <td className="px-6 py-4">
                    {booking?.bookingUser.phone || "N/A"}
                  </td>
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
                    {/* ✅ View Detail */}
                    <Link
                      to={`/business/bookingDetails/${booking._id}`}
                      className="text-brown-A43"
                    >
                      <FaRegEye size={18} />
                    </Link>

                    {/* ✅ Approve */}
                    {booking.bookingStatus === 0 && (
                      <button
                        onClick={() => handleUpdateBooking(booking._id, 1)}
                        className="text-green-600 hover:text-green-800"
                      >
                        <FaEdit size={18} />
                      </button>
                    )}

                    {/* ✅ Complete */}
                    {booking.active === 1 && (
                      <button
                        onClick={() => handleUpdateBooking(booking._id, 2)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        ✓
                      </button>
                    )}

                    {/* ✅ Delete */}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="5"
                  className="text-center py-6 text-gray-400 italic"
                >
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
    </div>
  );
};

export default StylistBookingList;
