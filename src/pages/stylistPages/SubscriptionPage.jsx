// import React, { useState, useContext, useEffect } from "react";
// import { ButtonSquare } from "../../components/ui/buttonSquare";
// import useAPI from "../../services/baseUrl/useApiHook";
// import { ToastService, ToastContainerWrapper } from "../../utils/ToastService";
// import { formatDate, handleApiError } from "../../utils/helpers/HelperFunction";
// import { AuthContext } from "../../services/context/AuthContext";
// import { Link, useNavigate } from "react-router-dom";

// const SubscriptionPage = () => {
//     const API = useAPI();
//     const navigate = useNavigate();
//     const auth = useContext(AuthContext);
//     const [subscription, setSubscription] = useState(null);
//     const [subscriptionType, setSubscriptionType] = useState(null);
//     const { authToken } = auth;
//     const { user } = auth;
//     let stripeCustomerId = user?.stripeCustomerId;
//     const [loading, setLoading] = useState(true);

//     const fetchUserSubscription = async () => {
//         setLoading(true);
//         try {
//             const response = await API.get("/api/business/payment/subscription", {
//                 headers: { Authorization: authToken },
//             });
//             const subscription = response.data.responseData.subscription;
//             setSubscription(subscription);
//             setSubscriptionType(response.data.responseData.subscriptionType);
//             ToastService.success(response.data?.responseMessage?.[0]);
//         } catch (err) {
//             handleApiError(err);
//         } finally {
//             setLoading(false);
//         }
//     };

//     const cancelUserSubscription = async () => {
//         setLoading(true);
//         try {
//             const response = await API.delete("/api/business/payment/card", {
//                 headers: { Authorization: authToken },
//             });
//             const subscription = response.data.responseData.subscription;
//             setSubscription(subscription);
//             setSubscriptionType(response.data.responseData.subscriptionType);
//             ToastService.success(response.data?.responseMessage?.[0]);
//         } catch (err) {
//             handleApiError(err);
//         } finally {
//             setLoading(false);
//             fetchUserSubscription();
//         }
//     };

//     useEffect(() => {
//         fetchUserSubscription();
//     }, []);

//     return (
//         <div>
//             <>
//                 <div className="">
//                     <div className="w-full">
//                         <div className="flex flex-col gap-6 h-full">
//                             {/* ===== Subscription Status ===== */}
//                             <div className="flex flex-col xs:flex-row justify-between xs:items-center gap-2 flex-wrap">
//                                 <div className="flex flex-col gap-6">
//                                     <h1 className="md:text-[25px] text-[14px] font-bold text-black-14 font-manrope">
//                                         Subscription Status
//                                     </h1>
//                                 </div>
//                                 <p className="text-[14px] md:text-[20px] font-medium font-manrope text-brown-A43">
//                                     {subscription?.subscriptionStatus}
//                                 </p>
//                             </div>

//                             {/* ===== Start Date ===== */}
//                             <div className="flex flex-col xs:flex-row justify-between xs:items-center gap-2 flex-wrap">
//                                 <div className="flex flex-col gap-6">
//                                     <h1 className="md:text-[25px] text-[14px] font-bold text-black-14 font-manrope">
//                                         Subscription Start Date
//                                     </h1>
//                                 </div>
//                                 <p className="text-[14px] md:text-[20px] font-medium font-manrope text-brown-A43">
//                                     {`${formatDate(subscription?.subscriptionStartDate)}`}
//                                 </p>
//                             </div>

//                             {/* ===== Expiry Date ===== */}
//                             <div className="flex flex-col xs:flex-row justify-between xs:items-center gap-2 flex-wrap">
//                                 <div className="flex flex-col gap-6">
//                                     <h1 className="md:text-[25px] text-[14px] font-bold text-black-14 font-manrope">
//                                         Subscription Expiry Date
//                                     </h1>
//                                 </div>
//                                 <p className="text-[14px] md:text-[20px] font-medium font-manrope text-brown-A43">
//                                     {`${formatDate(subscription?.subscriptionExpiryDate)}`}
//                                 </p>
//                             </div>

//                             {/* ===== Subscription Type ===== */}
//                             <div className="flex flex-col xs:flex-row justify-between xs:items-center gap-2 flex-wrap">
//                                 <div className="flex flex-col gap-6">
//                                     <h1 className="md:text-[25px] text-[14px] font-bold text-black-14 font-manrope">
//                                         Subscription Type
//                                     </h1>
//                                 </div>
//                                 <p className="text-[14px] md:text-[20px] font-medium font-manrope text-brown-A43">
//                                     {subscriptionType}
//                                 </p>
//                             </div>

//                             {/* ===== Alert if no payment card ===== */}
//                             {!subscription?.paymentCard ? (


//                                 < div className="flrx flex-col gap-5">
//                                     <div
//                                         id="alert-border-1"
//                                         className="flex items-center p-4 mb-4 text-blue-800 border-t-4 border-blue-300 bg-blue-50 dark:text-blue-400 dark:bg-gray-800 dark:border-blue-800"
//                                         role="alert"
//                                     >
//                                         <svg
//                                             className="shrink-0 w-4 h-4"
//                                             aria-hidden="true"
//                                             xmlns="http://www.w3.org/2000/svg"
//                                             fill="currentColor"
//                                             viewBox="0 0 20 20"
//                                         >
//                                             <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
//                                         </svg>
//                                         <div className="ms-3 text-sm font-medium">
//                                             No payment card found.{" "}
//                                             <a
//                                                 href="#"
//                                                 className="font-semibold underline hover:no-underline"
//                                             >
//                                                 Add a card
//                                             </a>{" "}
//                                             to continue your subscription.
//                                         </div>
//                                     </div>

//                                     <div className="w-full" >
//                                         <Link to="/business/payment-page/1">
//                                             <ButtonSquare
//                                                 className={`w-full bg-transparent text-brown-A43 py-[32px] px-[110px] font-extrabold text-[14px] font-manrope hover:bg-brown-A43 text-background bg-brown-A43-o20 hover:text-background`}
//                                                 variant="secondary"
//                                             >
//                                                 Add Card
//                                             </ButtonSquare>
//                                         </Link>
//                                     </div>
//                                 </div>




//                             ) : (
//                                 <>
//                                     {/* ===== Payment Card Info ===== */}
//                                     <div className="flex justify-between items-center">
//                                         <div className="flex flex-col gap-6">
//                                             <h1 className="md:text-[35px] text-[20px] font-bold text-brown-A43 font-manrope">
//                                                 Payment Card Info:
//                                             </h1>
//                                         </div>
//                                     </div>

//                                     <div className="flex flex-col xs:flex-row justify-between xs:items-center gap-2 flex-wrap">
//                                         <div className="flex flex-col gap-6">
//                                             <h1 className="md:text-[25px] text-[14px] font-bold text-black-14 font-manrope">
//                                                 Card Brand
//                                             </h1>
//                                         </div>
//                                         <p className="text-[14px] md:text-[20px] font-medium font-manrope text-brown-A43 flex items-center">
//                                             <span className="ml-2">
//                                                 {subscription?.paymentCard?.cardBrand}
//                                             </span>
//                                         </p>
//                                     </div>

//                                     <div className="flex flex-col xs:flex-row justify-between xs:items-center gap-2 flex-wrap">
//                                         <div className="flex flex-col gap-6">
//                                             <h1 className="md:text-[25px] text-[14px] font-bold text-black-14 font-manrope">
//                                                 Card Number
//                                             </h1>
//                                         </div>
//                                         <div className="flex items-center gap-2">
//                                             <p className="text-[14px] md:text-[20px] font-medium font-manrope text-brown-A43 flex items-center">
//                                                 **** **** ****{" "}
//                                             </p>
//                                             <p className="text-[14px] md:text-[20px] font-medium font-manrope text-brown-A43 flex items-center">
//                                                 {subscription?.paymentCard?.cardLast4Number}
//                                             </p>
//                                         </div>
//                                     </div>

//                                     <div className="grid grid-cols-1 gap-4 w-full">
//                                         <div className="w-full" onClick={cancelUserSubscription}>
//                                             <ButtonSquare
//                                                 className={`w-full bg-transparent text-brown-A43 py-[32px] px-[110px] font-extrabold text-[14px] font-manrope hover:bg-brown-A43 text-background bg-brown-A43-o20 hover:text-background`}
//                                                 variant="secondary"
//                                             >
//                                                 Cancel Subscription
//                                             </ButtonSquare>
//                                         </div>
//                                     </div>
//                                 </>
//                             )}
//                         </div>
//                     </div>
//                 </div>
//             </>
//         </div>
//     );
// };

// export default SubscriptionPage;

import React, { useState, useContext, useEffect } from "react";
import { ButtonSquare } from "../../components/ui/buttonSquare";
import useAPI from "../../services/baseUrl/useApiHook";
import { ToastService } from "../../utils/ToastService";
import { formatDate, handleApiError } from "../../utils/helpers/HelperFunction";
import { AuthContext } from "../../services/context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import SubscriptionSkeleton from "../../components/ui/SubscriptionSkeleton"; // 👈 Add this import

const SubscriptionPage = () => {
    const API = useAPI();
    const navigate = useNavigate();
    const auth = useContext(AuthContext);
    const [subscription, setSubscription] = useState(null);
    const [subscriptionType, setSubscriptionType] = useState(null);
    const { authToken, user } = auth;
    const [loading, setLoading] = useState(true);

    const fetchUserSubscription = async () => {
        setLoading(true);
        try {
            const response = await API.get("/api/business/payment/subscription", {
                headers: { Authorization: authToken },
            });
            const subscription = response.data.responseData.subscription;
            setSubscription(subscription);
            setSubscriptionType(response.data.responseData.subscriptionType);
            ToastService.success(response.data?.responseMessage?.[0]);
        } catch (err) {
            handleApiError(err);
        } finally {
            setLoading(false);
        }
    };

    const cancelUserSubscription = async () => {
        setLoading(true);
        try {
            const response = await API.delete("/api/business/payment/card", {
                headers: { Authorization: authToken },
            });
            const subscription = response.data.responseData.subscription;
            setSubscription(subscription);
            setSubscriptionType(response.data.responseData.subscriptionType);
            ToastService.success(response.data?.responseMessage?.[0]);
        } catch (err) {
            handleApiError(err);
        } finally {
            setLoading(false);
            fetchUserSubscription();
        }
    };

    useEffect(() => {
        fetchUserSubscription();
    }, []);

    return (
        <div className="p-4">
            {loading ? (
                // 👇 Skeleton shown while loading
                <SubscriptionSkeleton />
            ) : (
                <>
                    <div className="flex flex-col gap-6 h-full">
                        {/* ===== Subscription Status ===== */}
                        <div>
                            <>
                                <div className="">
                                    <div className="w-full">
                                        <div className="flex flex-col gap-6 h-full">
                                            {/* ===== Subscription Status ===== */}
                                            <div className="flex flex-col xs:flex-row justify-between xs:items-center gap-2 flex-wrap">
                                                <div className="flex flex-col gap-6">
                                                    <h1 className="md:text-[25px] text-[14px] font-bold text-black-14 font-manrope">
                                                        Subscription Status
                                                    </h1>
                                                </div>
                                                <p className="text-[14px] md:text-[20px] font-medium font-manrope text-brown-A43">
                                                    {subscription?.subscriptionStatus}
                                                </p>
                                            </div>

                                            {/* ===== Start Date ===== */}
                                            <div className="flex flex-col xs:flex-row justify-between xs:items-center gap-2 flex-wrap">
                                                <div className="flex flex-col gap-6">
                                                    <h1 className="md:text-[25px] text-[14px] font-bold text-black-14 font-manrope">
                                                        Subscription Start Date
                                                    </h1>
                                                </div>
                                                <p className="text-[14px] md:text-[20px] font-medium font-manrope text-brown-A43">
                                                    {`${formatDate(subscription?.subscriptionStartDate)}`}
                                                </p>
                                            </div>

                                            {/* ===== Expiry Date ===== */}
                                            <div className="flex flex-col xs:flex-row justify-between xs:items-center gap-2 flex-wrap">
                                                <div className="flex flex-col gap-6">
                                                    <h1 className="md:text-[25px] text-[14px] font-bold text-black-14 font-manrope">
                                                        Subscription Expiry Date
                                                    </h1>
                                                </div>
                                                <p className="text-[14px] md:text-[20px] font-medium font-manrope text-brown-A43">
                                                    {`${formatDate(subscription?.subscriptionExpiryDate)}`}
                                                </p>
                                            </div>

                                            {/* ===== Subscription Type ===== */}
                                            <div className="flex flex-col xs:flex-row justify-between xs:items-center gap-2 flex-wrap">
                                                <div className="flex flex-col gap-6">
                                                    <h1 className="md:text-[25px] text-[14px] font-bold text-black-14 font-manrope">
                                                        Subscription Type
                                                    </h1>
                                                </div>
                                                <p className="text-[14px] md:text-[20px] font-medium font-manrope text-brown-A43">
                                                    {subscriptionType}
                                                </p>
                                            </div>

                                            {/* ===== Alert if no payment card ===== */}
                                            {!subscription?.paymentCard ? (


                                                < div className="flrx flex-col gap-5">
                                                    <div
                                                        id="alert-border-1"
                                                        className="flex items-center p-4 mb-4 text-white   bg-brown-A43"
                                                        role="alert"
                                                    >
                                                        <svg
                                                            className="shrink-0 w-4 h-4"
                                                            aria-hidden="true"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            fill="currentColor"
                                                            viewBox="0 0 20 20"
                                                        >
                                                            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                                                        </svg>
                                                        <div className="ms-3 text-sm font-medium">
                                                            No payment card found.{" "}
                                                            <a
                                                                href="#"
                                                                className="font-semibold underline hover:no-underline"
                                                            >
                                                                Add a card
                                                            </a>{" "}
                                                            to continue your subscription.
                                                        </div>
                                                    </div>

                                                    <div className="w-full" >
                                                        <Link to="/business/payment-page/1">
                                                            <ButtonSquare
                                                                className={`w-full bg-transparent text-brown-A43 py-[32px] px-[110px] font-extrabold text-[14px] font-manrope hover:bg-brown-A43 text-black-14 bg-brown-A43-o20 hover:text-background`}
                                                                variant="secondary"
                                                            >
                                                                Add Card
                                                            </ButtonSquare>
                                                        </Link>
                                                    </div>
                                                </div>




                                            ) : (
                                                <>
                                                    {/* ===== Payment Card Info ===== */}
                                                    <div className="flex justify-between items-center">
                                                        <div className="flex flex-col gap-6">
                                                            <h1 className="md:text-[35px] text-[20px] font-bold text-brown-A43 font-manrope">
                                                                Payment Card Info:
                                                            </h1>
                                                        </div>
                                                    </div>

                                                    <div className="flex flex-col xs:flex-row justify-between xs:items-center gap-2 flex-wrap">
                                                        <div className="flex flex-col gap-6">
                                                            <h1 className="md:text-[25px] text-[14px] font-bold text-black-14 font-manrope">
                                                                Card Brand
                                                            </h1>
                                                        </div>
                                                        <p className="text-[14px] md:text-[20px] font-medium font-manrope text-brown-A43 flex items-center">
                                                            <span className="ml-2">
                                                                {subscription?.paymentCard?.cardBrand}
                                                            </span>
                                                        </p>
                                                    </div>

                                                    <div className="flex flex-col xs:flex-row justify-between xs:items-center gap-2 flex-wrap">
                                                        <div className="flex flex-col gap-6">
                                                            <h1 className="md:text-[25px] text-[14px] font-bold text-black-14 font-manrope">
                                                                Card Number
                                                            </h1>
                                                        </div>
                                                        <div className="flex items-center gap-2">
                                                            <p className="text-[14px] md:text-[20px] font-medium font-manrope text-brown-A43 flex items-center">
                                                                **** **** ****{" "}
                                                            </p>
                                                            <p className="text-[14px] md:text-[20px] font-medium font-manrope text-brown-A43 flex items-center">
                                                                {subscription?.paymentCard?.cardLast4Number}
                                                            </p>
                                                        </div>
                                                    </div>

                                                    <div className="grid grid-cols-1 gap-4 w-full">
                                                        <div className="w-full" onClick={cancelUserSubscription}>
                                                            <ButtonSquare
                                                                className={`w-full bg-transparent text-brown-A43 py-[32px] px-[110px] font-extrabold text-[14px] font-manrope hover:bg-brown-A43 text-black-14 bg-brown-A43-o20 hover:text-background`}
                                                                variant="secondary"
                                                            >
                                                                Cancel Subscription
                                                            </ButtonSquare>
                                                        </div>
                                                    </div>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </>
                        </div>

                        {/* Rest of your content remains same... */}
                    </div>
                </>
            )}
        </div>
    );
};

export default SubscriptionPage;

