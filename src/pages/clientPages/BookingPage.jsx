


import React, { useContext, useEffect, useState } from "react";
import CustomCheckbox from "../../components/ui/CustomCheckbox";
import useAPI from "../../services/baseUrl/useApiHook";
import { AuthContext } from "../../services/context/AuthContext";
import { ToastService } from "../../utils/ToastService";
import { handleApiError } from "../../utils/helpers/HelperFunction";
import { ButtonSquare } from "../../components/ui/buttonSquare";
import { useNavigate, useParams } from "react-router-dom";
import { FiAlertCircle } from "react-icons/fi";

const BookingPage = () => {
  const [isChecked, setIsChecked] = useState(false);
  const [bookingDate, setBookingDate] = useState("");
  const [bookingContactNumber, setBookingContactNumber] = useState("");
  const [bookingMessage, setBookingMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [service, setServiceInfo] = useState(null);

  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showBusinessModal, setShowBusinessModal] = useState(false);

  const API = useAPI();
  const { id } = useParams();
  const auth = useContext(AuthContext);
  const { user, authToken } = auth;
  const navigate = useNavigate();

  // ✅ Fetch service detail
  const fetchServiceDetail = () => {
    setLoading(true);
    API.get(`/api/user/services/${id}`, {
      headers: { Authorization: authToken },
    })
      .then((response) => {
        const responseMessage = response.data?.responseMessage?.[0];
        setServiceInfo(response.data.responseData.service);
        // ToastService.success(responseMessage);
      })
      .catch((error) => {
        console.error("Error fetching service:", error);
        handleApiError(error);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    if (id) fetchServiceDetail();
  }, [id]);

  // ✅ Handle booking form submit
  const handleBookingSubmit = async (e) => {
    e.preventDefault();

    // 🧩 Validation 1: Not logged in
    if (!user || !authToken) {
      setShowLoginModal(true);
      return;
    }

    // 🧩 Validation 2: Business user
    if (user?.roleType === 1) {
      setShowBusinessModal(true);
      return;
    }

    if (!isChecked) {
      ToastService.error("Please agree to the terms and conditions.");
      return;
    }

    if (!bookingDate || !bookingContactNumber) {
      ToastService.error("Please fill all required fields.");
      return;
    }

    const payload = {
      serviceId: service?._id,
      businessId: service?.businessId,
      userId: service?.userId,
      bookingDate,
      bookingContactNumber,
      bookingMessage,
    };

    try {
      const response = await API.post(`/api/user/booking/`, payload, {
        headers: { Authorization: authToken },
      });

      const responseMessage =
        response.data?.responseMessage?.[0] || "Booking successful!";
      // ToastService.success(responseMessage);

      navigate(`/booking-confirm/${id}`);
    } catch (error) {
      console.error("Booking failed:", error);
      handleApiError(error);
    }
  };

  return (
    <div className="bg-background">
      <div className="container">
        <div className="py-20 flex flex-col gap-10 ">
          <form className="flex flex-col gap-10" onSubmit={handleBookingSubmit}>
            <div className="flex flex-col gap-10">
              <div className="text-black-14 font-semibold text-poppins sm:text-[30px] text-[20px]">
                Booking Information
              </div>

              <div className="grid sm:grid-cols-2 grid-cols-1 gap-10">
                <div className="p-[24px] border-[1px] border-gray-white-E9 rounded-[5px]">
                  <input
                    className="focus:border-none focus:outline-none border-none w-full bg-transparent"
                    type="text"
                    placeholder="Select Service"
                    value={service?.name || ""}
                    disabled
                  />
                </div>

                <div className="p-[24px] border-[1px] border-gray-white-E9 rounded-[5px]">
                  <input
                    className="focus:border-none focus:outline-none border-none w-full bg-transparent"
                    type="date"
                    placeholder="Pick Date & Time"
                    value={bookingDate}
                    onChange={(e) => setBookingDate(e.target.value)}
                    required
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-10">
              <div className="text-black-14 font-semibold text-poppins sm:text-[30px] text-[20px]">
                Personal Information
              </div>

              <div className="grid grid-cols-12 gap-10">
                <div className="p-[24px] border-[1px] border-gray-white-E9 rounded-[5px] col-span-12">
                  <input
                    className="focus:border-none focus:outline-none border-none w-full bg-transparent"
                    type="tel"
                    placeholder="Booking Contact Number"
                    value={bookingContactNumber}
                    onChange={(e) => setBookingContactNumber(e.target.value)}
                    required
                  />
                </div>

                <div className="p-[24px] border-[1px] border-gray-white-E9 rounded-[5px] col-span-12">
                  <textarea
                    className="focus:border-none focus:outline-none border-none w-full bg-transparent"
                    placeholder="Special Request"
                    rows={4}
                    value={bookingMessage}
                    onChange={(e) => setBookingMessage(e.target.value)}
                  />
                </div>
              </div>

              <div className="flex gap-10 items-center">
                <CustomCheckbox
                  id="terms-checkbox"
                  checked={isChecked}
                  onChange={(e) => setIsChecked(e.target.checked)}
                  label="I agree to the terms and conditions"
                />
              </div>
            </div>

            <ButtonSquare
              className="w-full bg-brown-A43 text-background p-[32px] font-extrabold text-[14px] font-manrope"
              variant="secondary"
              type="submit"
              disabled={loading}
            >
              {loading ? "Processing..." : "Book Now"}
            </ButtonSquare>
          </form>
        </div>
      </div>

      {/* 🧱 LOGIN MODAL */}
      {showLoginModal && (
        <div className="fixed inset-0 z-50 flex justify-center items-center bg-black-050 transition-opacity duration-300">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 text-center relative transform scale-100 transition-transform duration-300">
            <button
              onClick={() => setShowLoginModal(false)}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-700"
            >
              ✕
            </button>

            <div className="flex justify-center mb-5">
              <div className="bg-blue-100 text-blue-600 rounded-full p-4">
                <FiAlertCircle size={36} />
              </div>
            </div>

            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              You must log in first to create a booking
            </h3>
            <p className="text-gray-500 mb-6 text-sm">
              Please sign in to continue and complete your booking.
            </p>

            <div className="flex justify-center gap-4">
              <button
                onClick={() => navigate("/role/0")}
                className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 px-5 py-2.5 rounded-lg text-sm font-medium transition"
              >
                Login Now
              </button>
              <button
                onClick={() => setShowLoginModal(false)}
                className="text-gray-800 border border-gray-300 bg-gray-100 hover:bg-gray-200 px-5 py-2.5 rounded-lg text-sm font-medium transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 🧱 BUSINESS USER MODAL */}
      {showBusinessModal && (
        <div className="fixed inset-0 z-50 flex justify-center items-center bg-black-050 transition-opacity duration-300">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 text-center relative transform scale-100 transition-transform duration-300">
            <button
              onClick={() => setShowBusinessModal(false)}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-700"
            >
              ✕
            </button>

            <div className="flex justify-center mb-5">
              <div className="bg-red-100 text-red-600 rounded-full p-4">
                <FiAlertCircle size={36} />
              </div>
            </div>

            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              You’re a business user, so you can’t make bookings
            </h3>
            <p className="text-gray-500 mb-6 text-sm">
              Booking features are available only for standard users.
            </p>

            <div className="flex justify-center">
              <button
                onClick={() => setShowBusinessModal(false)}
                className="text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:ring-red-300 px-5 py-2.5 rounded-lg text-sm font-medium transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingPage;

