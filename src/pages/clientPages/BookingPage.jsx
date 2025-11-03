// import React, { useContext, useEffect, useState } from 'react'
// import CustomCheckbox from '../../components/ui/CustomCheckbox'
// import useAPI from "../../services/baseUrl/useApiHook";
// import { AuthContext } from "../../services/context/AuthContext";
// import { ToastService } from '../../utils/ToastService'
// import { handleApiError } from '../../utils/helpers/HelperFunction'

// import { ButtonSquare } from '../../components/ui/buttonSquare'
// import { Link, useNavigate, useParams } from 'react-router-dom'
// import { useLocation } from 'react-router-dom'

// const BookingPage = () => {
//     const [isChecked, setIsChecked] = useState(false);
//     // const [id, setId] = useState(Math.random().toString(36).substring(2, 15));
//     const API = useAPI();
//     const { id } = useParams();
//     const auth = useContext(AuthContext);
//     const { user } = auth;
//     const { authToken } = auth;

//     const navigate = useNavigate();
//     const location = useLocation();

//     const [service, setServiceInfo] = useState(null);
//     const [loading, setLoading] = useState(true);



//     const fetchServiceDetail = () => {
//         setLoading(true);
//         API.get(`/api/user/services/${id}`, {
//             headers: { Authorization: authToken }
//         })
//             .then((response) => {
//                 const responseMessage = response.data?.responseMessage?.[0];
//                 setServiceInfo(response.data.responseData.service);
//                 ToastService.success(responseMessage);
//             })
//             .catch((error) => {
//                 console.error('Error fetching business profile:', error);
//                 handleApiError(error);
//             })
//             .finally(() => {
//                 setLoading(false); // ✅ Stop loader after success/failure
//             });
//     };

//     useEffect(() => {
//         if (id) {
//             fetchServiceDetail();
//         }
//     }, []);
//     console.log(user, "User")
//     console.log(service, "Service")

//     let serviceId = service?._id;
//     let businessId = service?.businessId;
//     let userId = service?.userId;
//     let bookingDate = new Date();
//     let bookingContactNumber = user?.phoneNumber;
//     let bookingMessage





//     // /user/booking/
//     return (
//         <div className='bg-background'>
//             <div className='container'>
//                 <div className='py-20 flex flex-col gap-10 '>

//                     <form className=' flex flex-col gap-10'>
//                         <div className='flex flex-col gap-10'>
//                             <div className='text-black-14 font-semibold text-poppins sm:text-[30px] text-[20px]'>Booking Information</div>
//                             <div className='grid sm:grid-cols-2 grid-cols-1 gap-10'>
//                                 <div className='p-[24px] border-[1px] border-gray-white-E9 rounded-[5px]  '>
//                                     <div className='flex gap-3 items-center '>
//                                         <input
//                                             className="focus:border-none focus:outline-none border-none w-full bg-transparent"
//                                             type="text"
//                                             placeholder='Select Service'
//                                             value={service?.name}
//                                             disabled
//                                         />

//                                     </div>



//                                 </div>
//                                 <div className='p-[24px] border-[1px] border-gray-white-E9 rounded-[5px]  '>
//                                     <div className='flex gap-3 items-center '>
//                                         <input
//                                             className="focus:border-none focus:outline-none border-none w-full bg-transparent"
//                                             type="date"
//                                             placeholder='pick date & Time'
//                                             value={id}
//                                         />

//                                     </div>

//                                 </div>
//                             </div>


//                         </div>

//                         <div className='flex flex-col gap-10'>
//                             <div className='text-black-14 font-semibold text-poppins sm:text-[30px] text-[20px]'>Personal Information</div>
//                             <div className='grid grid-cols-12  gap-10'>



//                                 <div className='p-[24px] border-[1px] border-gray-white-E9 rounded-[5px]  col-span-12  '>
//                                     <div className='flex gap-3 items-center '>
//                                         <input
//                                             className="focus:border-none focus:outline-none border-none w-full bg-transparent"
//                                             type="tel"
//                                             placeholder='Booking Contact Number'
//                                         />

//                                     </div>

//                                 </div>

//                                 <div className='p-[24px] border-[1px] border-white-E9 rounded-[5px]  col-span-12  '>
//                                     <div className='flex gap-3 items-center '>
//                                         <textarea
//                                             className="focus:border-none focus:outline-none border-none w-full bg-transparent"
//                                             type="text"
//                                             placeholder='Special Request'
//                                             rows={4}
//                                         />
//                                     </div>
//                                 </div>
//                             </div>
//                             <div className='flex gap-10 items-center '>
//                                 <CustomCheckbox
//                                     id="terms-checkbox"
//                                     checked={isChecked}
//                                     onChange={(e) => setIsChecked(e.target.checked)}
//                                     label="I agree to the terms and conditions"
//                                 />
//                             </div>

//                         </div>

//                         <Link to={`/booking-confirm/${id}`}>
//                             <ButtonSquare className='w-full bg-brown-A43 text-background  p-[32px]  font-extrabold text-[14px] font-manrope' variant='secondary' >Book Now</ButtonSquare>
//                         </Link>

//                     </form>

//                 </div>
//             </div>
//         </div>
//     )
// }


// export default BookingPage

import React, { useContext, useEffect, useState } from 'react'
import CustomCheckbox from '../../components/ui/CustomCheckbox'
import useAPI from "../../services/baseUrl/useApiHook";
import { AuthContext } from "../../services/context/AuthContext";
import { ToastService } from '../../utils/ToastService'
import { handleApiError } from '../../utils/helpers/HelperFunction'
import { ButtonSquare } from '../../components/ui/buttonSquare'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useLocation } from 'react-router-dom'

const BookingPage = () => {
    const [isChecked, setIsChecked] = useState(false);
    const [bookingDate, setBookingDate] = useState('');
    const [bookingContactNumber, setBookingContactNumber] = useState('');
    const [bookingMessage, setBookingMessage] = useState('');
    const [loading, setLoading] = useState(true);
    const [service, setServiceInfo] = useState(null);

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
                ToastService.success(responseMessage);
            })
            .catch((error) => {
                console.error('Error fetching service:', error);
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
            userId: user?.id, // assuming this comes from AuthContext
            bookingDate,
            bookingContactNumber,
            bookingMessage,
        };

        try {
            const response = await API.post(
                `/api/user/booking/`,
                payload,
                { headers: { Authorization: authToken } }
            );

            const responseMessage = response.data?.responseMessage?.[0] || "Booking successful!";
            ToastService.success(responseMessage);

            navigate(`/booking-confirm/${id}`);
        } catch (error) {
            console.error("Booking failed:", error);
            handleApiError(error);
        }
    };

    return (
        <div className='bg-background'>
            <div className='container'>
                <div className='py-20 flex flex-col gap-10 '>
                    <form className='flex flex-col gap-10' onSubmit={handleBookingSubmit}>
                        <div className='flex flex-col gap-10'>
                            <div className='text-black-14 font-semibold text-poppins sm:text-[30px] text-[20px]'>Booking Information</div>

                            <div className='grid sm:grid-cols-2 grid-cols-1 gap-10'>
                                <div className='p-[24px] border-[1px] border-gray-white-E9 rounded-[5px]'>
                                    <input
                                        className="focus:border-none focus:outline-none border-none w-full bg-transparent"
                                        type="text"
                                        placeholder='Select Service'
                                        value={service?.name || ''}
                                        disabled
                                    />
                                </div>

                                <div className='p-[24px] border-[1px] border-gray-white-E9 rounded-[5px]'>
                                    <input
                                        className="focus:border-none focus:outline-none border-none w-full bg-transparent"
                                        type="date"
                                        placeholder='Pick Date & Time'
                                        value={bookingDate}
                                        onChange={(e) => setBookingDate(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        <div className='flex flex-col gap-10'>
                            <div className='text-black-14 font-semibold text-poppins sm:text-[30px] text-[20px]'>Personal Information</div>

                            <div className='grid grid-cols-12 gap-10'>
                                <div className='p-[24px] border-[1px] border-gray-white-E9 rounded-[5px] col-span-12'>
                                    <input
                                        className="focus:border-none focus:outline-none border-none w-full bg-transparent"
                                        type="tel"
                                        placeholder='Booking Contact Number'
                                        value={bookingContactNumber}
                                        onChange={(e) => setBookingContactNumber(e.target.value)}
                                        required
                                    />
                                </div>

                                <div className='p-[24px] border-[1px] border-gray-white-E9 rounded-[5px] col-span-12'>
                                    <textarea
                                        className="focus:border-none focus:outline-none border-none w-full bg-transparent"
                                        placeholder='Special Request'
                                        rows={4}
                                        value={bookingMessage}
                                        onChange={(e) => setBookingMessage(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className='flex gap-10 items-center'>
                                <CustomCheckbox
                                    id="terms-checkbox"
                                    checked={isChecked}
                                    onChange={(e) => setIsChecked(e.target.checked)}
                                    label="I agree to the terms and conditions"
                                />
                            </div>
                        </div>

                        <ButtonSquare
                            className='w-full bg-brown-A43 text-background p-[32px] font-extrabold text-[14px] font-manrope'
                            variant='secondary'
                            type="submit"
                            disabled={loading}
                        >
                            {loading ? "Processing..." : "Book Now"}
                        </ButtonSquare>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default BookingPage;
