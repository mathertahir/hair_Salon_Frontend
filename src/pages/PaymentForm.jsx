


// import React, { useState, useContext } from "react";
// import { useStripe, useElements, PaymentElement } from "@stripe/react-stripe-js";
// import useAPI from "../services/baseUrl/useApiHook";
// import { AuthContext } from "../services/context/AuthContext";
// import { ToastService } from "../utils/ToastService";
// import { useNavigate } from "react-router-dom";

// const PaymentForm = ({ id }) => {
//     const stripe = useStripe();
//     const elements = useElements();
//     const API = useAPI();
//     const { authToken, user } = useContext(AuthContext);
//     const navigate = useNavigate();

//     const [loading, setLoading] = useState(false);
//     const [cardholder, setCardholder] = useState("");

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         if (!stripe || !elements) return;

//         setLoading(true);
//         try {
//             const result = await stripe.confirmSetup({
//                 elements,
//                 confirmParams: {
//                     payment_method_data: {
//                         billing_details: { name: cardholder || user?.name || "Unknown" },
//                     },
//                 },
//                 redirect: "if_required",
//             });

//             if (result.error) {
//                 ToastService.error(result.error.message);
//                 setLoading(false);
//                 return;
//             }

//             const setupIntent = result.setupIntent;
//             if (setupIntent?.status === "succeeded") {
//                 const stripePaymentMethodId = setupIntent.payment_method;

//                 // Decide between POST and PUT based on presence of ID
//                 const endpoint = "/api/business/payment/card";
//                 const payload = {
//                     stripeCustomerId: user?.stripeCustomerId,
//                     stripePaymentMethodId,
//                 };

//                 if (id) {
//                     await API.put(`${endpoint}`, payload, {
//                         headers: { Authorization: authToken },
//                     });
//                     ToastService.success("Card updated successfully!");
//                 } else {
//                     await API.post(endpoint, payload, {
//                         headers: { Authorization: authToken },
//                     });
//                     ToastService.success("Card saved successfully!");
//                 }

//                 navigate("/business/subscription");
//             } else {
//                 ToastService.error("Setup incomplete. Please try again.");
//             }
//         } catch (err) {
//             console.error(err);
//             ToastService.error("Error saving card");
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <form onSubmit={handleSubmit} className="space-y-6">
//             <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Cardholder Name
//                 </label>
//                 <input
//                     type="text"
//                     value={cardholder}
//                     onChange={(e) => setCardholder(e.target.value)}
//                     placeholder="Enter your full name"
//                     className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-indigo-100"
//                     required
//                 />
//             </div>

//             <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Payment Details
//                 </label>
//                 <div className="border border-gray-200 rounded-lg p-3">
//                     <PaymentElement options={{ layout: "tabs" }} />
//                 </div>
//             </div>

//             <div className="flex justify-between mt-4">
//                 <button
//                     type="button"
//                     onClick={() => window.history.back()}
//                     className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg"
//                     disabled={loading}
//                 >
//                     Cancel
//                 </button>

//                 <button
//                     type="submit"
//                     disabled={!stripe || loading}
//                     className="px-4 py-2 bg-blue-600 text-white rounded-lg"
//                 >
//                     {loading ? "Processing..." : id ? "Update Card" : "Save Card"}
//                 </button>
//             </div>
//         </form>
//     );
// };

// export default PaymentForm;


import React, { useState, useContext } from "react";
import { useStripe, useElements, PaymentElement } from "@stripe/react-stripe-js";
import useAPI from "../services/baseUrl/useApiHook";
import { AuthContext } from "../services/context/AuthContext";
import { ToastService } from "../utils/ToastService";
import { useNavigate } from "react-router-dom";

const PaymentForm = ({ id, bookingData }) => {
    const stripe = useStripe();
    const elements = useElements();
    const API = useAPI();
    const { authToken, user } = useContext(AuthContext);
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [cardholder, setCardholder] = useState("");


    console.log(bookingData, "Comming Booking Data")

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!stripe || !elements) return;

        setLoading(true);
        try {
            const result = await stripe.confirmSetup({
                elements,
                confirmParams: {
                    payment_method_data: {
                        billing_details: { name: cardholder || user?.name || "Unknown" },
                    },
                },
                redirect: "if_required",
            });

            if (result.error) {
                ToastService.error(result.error.message);
                setLoading(false);
                return;
            }

            const setupIntent = result.setupIntent;
            if (setupIntent?.status === "succeeded") {
                const stripePaymentMethodId = setupIntent.payment_method;

                // 🧠 CASE 1: Booking Payment
                if (bookingData?.id) {
                    const payload = {
                        stripePaymentMethodId,
                        rating: bookingData.rating,
                        comment: bookingData.comment,
                    };

                    await API.post(
                        `/api/user/booking/${bookingData.id}/processPayment`,
                        payload,
                        { headers: { Authorization: authToken } }
                    );

                    ToastService.success("Booking payment successful!");
                    navigate("/user/bookings");
                    return;
                }

                // 💳 CASE 2: Save or Update Card
                const endpoint = "/api/business/payment/card";
                const payload = {
                    stripeCustomerId: user?.stripeCustomerId,
                    stripePaymentMethodId,
                };

                if (id) {
                    await API.put(endpoint, payload, {
                        headers: { Authorization: authToken },
                    });
                    ToastService.success("Card updated successfully!");
                } else {
                    await API.post(endpoint, payload, {
                        headers: { Authorization: authToken },
                    });
                    ToastService.success("Card saved successfully!");
                }

                navigate("/business/subscription");
            } else {
                ToastService.error("Setup incomplete. Please try again.");
            }
        } catch (err) {
            console.error(err);
            ToastService.error("Error processing payment");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Cardholder Name
                </label>
                <input
                    type="text"
                    value={cardholder}
                    onChange={(e) => setCardholder(e.target.value)}
                    placeholder="Enter your full name"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-indigo-100"
                    required
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Payment Details
                </label>
                <div className="border border-gray-200 rounded-lg p-3">
                    <PaymentElement options={{ layout: "tabs" }} />
                </div>
            </div>

            <div className="flex justify-between mt-4">
                <button
                    type="button"
                    onClick={() => window.history.back()}
                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg"
                    disabled={loading}
                >
                    Cancel
                </button>

                <button
                    type="submit"
                    disabled={!stripe || loading}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg"
                >
                    {loading
                        ? "Processing..."
                        : bookingData?.id
                            ? "Pay for Booking"
                            : id
                                ? "Update Card"
                                : "Save Card"}
                </button>
            </div>
        </form>
    );
};

export default PaymentForm;
