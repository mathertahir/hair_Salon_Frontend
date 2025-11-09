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
import { Link, useParams } from "react-router-dom";
import FilterDropdown from '../../components/FilterDropdown';
import GoBack from "../../components/GoBack";

const StylistBookingDetail = () => {

    const API = useAPI();
    const { authToken } = useContext(AuthContext);

    const [loading, setLoading] = useState(true);
    const [booking, setBooking] = useState(null);
    const { id } = useParams();

    const fetchBookingDetail = async () => {
        setLoading(true);
        try {
            const response = await API.get(`/api/user/booking/${id}`, {
                headers: { Authorization: authToken },
            });
            const responseMessage = response.data?.responseMessage?.[0];
            setBooking(response.data.responseData.booking);
            ToastService.success(responseMessage);
        } catch (error) {
            handleApiError(error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchBookingDetail();
    }, []);


    console.log(booking, "Booking Detail")
    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <p className="text-lg text-gray-600 font-manrope">Loading Booking Detail...</p>
            </div>
        );
    }
    return (
        <div className="flex flex-col gap-4  ">
            <div><GoBack /></div>

            <p className="text-brown-A43 font-playfair font-bold sm:text-[30px] text-[20px]">
                Booking Info
            </p>
            <div className="flex flex-col gap-6 h-full w-full">
                {/* ===== Subscription Status ===== */}
                <div className="flex flex-col xs:flex-row justify-between xs:items-center gap-2 flex-wrap">
                    <div className="flex flex-col gap-6">
                        <h1 className="md:text-[25px] text-[14px] font-bold text-black-14 font-manrope">
                            Booking Service Name
                        </h1>
                    </div>
                    <p className="text-[14px] md:text-[20px] font-medium font-manrope text-brown-A43">
                        {booking?.serviceInfo?.name}
                    </p>
                </div>

                <div className="flex flex-col xs:flex-row justify-between xs:items-center gap-2 flex-wrap">
                    <div className="flex flex-col gap-6">
                        <h1 className="md:text-[25px] text-[14px] font-bold text-black-14 font-manrope">
                            Booking Service Price
                        </h1>
                    </div>
                    <p className="text-[14px] md:text-[20px] font-medium font-manrope text-brown-A43">
                        {booking?.serviceInfo?.price}
                    </p>
                </div>
                <div className="flex flex-col xs:flex-row justify-between xs:items-center gap-2 flex-wrap">
                    <div className="flex flex-col gap-6">
                        <h1 className="md:text-[25px] text-[14px] font-bold text-black-14 font-manrope">
                            Booking Salon Name
                        </h1>
                    </div>
                    <p className="text-[14px] md:text-[20px] font-medium font-manrope text-brown-A43">
                        {booking?.business?.businessName}
                    </p>
                </div>
                <div className="flex flex-col xs:flex-row justify-between xs:items-center gap-2 flex-wrap">
                    <div className="flex flex-col gap-6">
                        <h1 className="md:text-[25px] text-[14px] font-bold text-black-14 font-manrope">
                            Booking Client Name
                        </h1>
                    </div>
                    <p className="text-[14px] md:text-[20px] font-medium font-manrope text-brown-A43">
                        {booking?.bookingUser?.name}
                    </p>
                </div>
                <div className="flex flex-col   gap-2 ">
                    <div className="flex flex-col gap-6">
                        <h1 className="md:text-[25px] text-[14px] font-bold text-black-14 font-manrope">
                            Booking Special Request
                        </h1>

                    </div>
                    <p className="text-[14px] md:text-[20px] font-medium font-manrope text-brown-A43">
                        {booking?.bookingMessage}
                    </p>




                </div>

                <div className="flex flex-col xs:flex-row justify-between xs:items-center gap-2 flex-wrap">
                    <div className="flex flex-col gap-6">
                        <h1 className="md:text-[25px] text-[14px] font-bold text-black-14 font-manrope">
                            Booking Date
                        </h1>
                    </div>
                    <p className="text-[14px] md:text-[20px] font-medium font-manrope text-brown-A43">
                        {new Date(booking?.bookingDate).toLocaleDateString()}
                    </p>
                </div>
                <div className="flex flex-col xs:flex-row justify-between xs:items-center gap-2 flex-wrap">
                    <div className="flex flex-col gap-6">
                        <h1 className="md:text-[25px] text-[14px] font-bold text-black-14 font-manrope">
                            Booking Client Phone Number
                        </h1>
                    </div>
                    <p className="text-[14px] md:text-[20px] font-medium font-manrope text-brown-A43">
                        {booking?.business?.phone}
                    </p>
                </div>

                <div className="flex flex-col xs:flex-row justify-between xs:items-center gap-2 flex-wrap">
                    <div className="flex flex-col gap-6">
                        <h1 className="md:text-[25px] text-[14px] font-bold text-black-14 font-manrope">
                            Booking Service Photo
                        </h1>
                    </div>
                    <PhotoProvider>
                        <div className="flex gap-2 flex-wrap">

                            <PhotoView src={booking?.serviceInfo?.servicePhoto?.url}>
                                <img
                                    src={booking?.serviceInfo?.servicePhoto?.url}

                                    className="w-[80px] h-[80px] object-cover rounded-md cursor-pointer"
                                />
                            </PhotoView>


                        </div>
                    </PhotoProvider>
                </div>
            </div>

        </div>
    )
}

export default StylistBookingDetail