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
import { Link, useNavigate } from "react-router-dom";
import FilterDropdown from '../../components/FilterDropdown';// ✅ Make sure this exists
import RatingStar from "../../components/ui/RatingStar";
import review from '../../assets/review.webp'

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
    const [isCompleteBooking, setIsCompleteBooking] = useState(false)
    const [activeTab, setActiveTab] = useState(null)
    const [isOpen, setIsOpen] = useState(false);
    const [activebtn, setActivebtn] = useState(2);
    const navigate = useNavigate();

    const [rating, setRating] = useState(3);
    const [comment, setComment] = useState("");


    const toggleTab = (tabIndex) => {
        setActiveTab(activeTab === tabIndex ? null : tabIndex)
    }


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
    const handleProcessPayment = async (id) => {
        try {

            setIsCompleteBooking(true)
            setSelectedBookingId(id)
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
                                            : booking.bookingStatus === 1
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


                                        {/* ✅ Complete */}
                                        {booking.bookingStatus === 1 && (
                                            <button
                                                onClick={() =>
                                                    handleProcessPayment(booking._id)
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


            {isCompleteBooking && (
                <div
                    className="fixed inset-0 z-50 flex justify-center items-center bg-black-050 "
                    onClick={() => setIsCompleteBooking(false)} // close on outside click
                >
                    <div
                        className="relative p-4 w-full max-w-[98%] sm:w-[80%]  lg:w-[80%]  xl:max-w-[80%]  h-[80%]  sm:h-[90%] m-8 bg-background 
                       rounded-[30px] shadow-sm overflow-y-auto flex flex-col justify-center  webkit-scrollbar-none 
                        "
                        onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside
                    >
                        {/* Close button */}
                        <button
                            type="button"
                            className="absolute top-3 right-2.5 text-gray-400 bg-transparent 
                         hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 
                         inline-flex justify-center items-center 
                         "
                            onClick={() => setIsCompleteBooking(false)}
                        >

                            <div className='text-red0'>
                                <RxCross1
                                    size={22}
                                />
                            </div>

                            <span className="sr-only">Close modal</span>
                        </button>

                        {/* Modal Content */}

                        <div className='py-4 flex flex-col gap-4 justify-center  px-0  px-[30px] 2xl:px-[100px]  '>

                            <div className='flex justify-center'>
                                <div className='w-[150px] h-[100px]  rounded-lg'>
                                    <img src={review} alt="review" className='object-fit rounded-lg' />
                                </div>
                            </div>

                            <div className="   md:text-[20px] text-[15px]  md:text-[20px]  xl:text-[20px] font-poppins font-extrabold text-black  text-center"> Your Service Completed</div>
                            <p className='   md:text-[18px] text-[15px] font-poppins font-normal text-gray-55 text-center'>Thanks For choosing us.</p>
                            <div className='flex flex-col gap-6'>

                                <div className='md:text-[20px] text-[15px]  md:text-[20px]  xl:text-[20px] font-poppins font-extrabold text-black text-center'> Add a Review </div>

                                <div className='flex justify-center '>
                                    <RatingStar value={rating} onChange={setRating} size={28} color="#fbbf24" />
                                </div>

                                <div className='p-[10px] border-[1px] border-white-E9 rounded-[5px] '>
                                    <div className='flex gap-3  '>

                                        <textarea
                                            className="focus:border-none focus:outline-none border-none w-full bg-transparent"
                                            placeholder="Add a Review For Better Services"
                                            rows={3}
                                            value={comment}
                                            onChange={(e) => setComment(e.target.value)}
                                            required
                                        />
                                    </div>

                                </div>


                            </div>
                            <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 w-full'>
                                <div className='w-full' onMouseEnter={() => setActivebtn(1)} onClick={(e) => {
                                    e.stopPropagation();
                                    setIsCompleteBooking(false);
                                }}>

                                    <ButtonSquare className={`w-full bg-transparent border border-brown-A43 text-brown-A43  py-[32px] px-[110px]  font-extrabold text-[14px] font-manrope ${activebtn === 1 ? 'bg-brown-A43 text-background' : ''} hover:bg-brown-A43 hover:text-background`} variant='secondary' >Cancel</ButtonSquare>

                                </div>

                                <div
                                    className="w-full"
                                    onMouseEnter={() => setActivebtn(2)}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setIsCompleteBooking(false);

                                        const bookingData = {
                                            id: selectedBookingId,
                                            rating,
                                            comment,
                                        };

                                        // ✅ Navigate to payment page with booking data in state
                                        navigate("/user/payment-page", { state: { bookingData } });
                                    }}
                                >
                                    <ButtonSquare
                                        className={`w-full bg-transparent border border-brown-A43 text-brown-A43 py-[32px] px-[110px] font-extrabold text-[14px] ${activebtn === 2 ? "bg-brown-A43 text-background" : ""
                                            } hover:bg-brown-A43 hover:text-background`}
                                        variant="secondary"
                                    >
                                        Completed
                                    </ButtonSquare>
                                </div>
                            </div>

                        </div>

                    </div>
                </div>
            )}
        </div>
    );
};

export default ClientBookingsList;
