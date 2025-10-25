// import React, { useEffect, useState, useContext } from "react";
// import { Elements } from "@stripe/react-stripe-js";
// import { loadStripe } from "@stripe/stripe-js";
// import PaymentForm from "./PaymentForm";
// import useAPI from "../../services/baseUrl/useApiHook";
// import { AuthContext } from "../../services/context/AuthContext";
// import { ToastService } from "../../utils/ToastService";

// const stripePromise = await loadStripe(`${process.env.VITE_STRIPE_PUBLISHABLE_KEY}`);

// console.log(stripePromise, "Comming Stripe Promise")

// const PaymentPage = () => {
//     const [clientSecret, setClientSecret] = useState(null);
//     const API = useAPI();
//     const { authToken, user } = useContext(AuthContext);

//     useEffect(() => {
//         const createSetupIntent = async () => {
//             try {
//                 const response = await API.post(
//                     "/api/business/payment/setupIntent",
//                     { stripeCustomerId: user?.stripeCustomerId },
//                     { headers: { Authorization: authToken } }
//                 );

//                 const secret = response.data.responseData?.setupIntent?.client_secret;
//                 if (!secret) throw new Error("No client secret returned from server");
//                 setClientSecret(secret);
//             } catch (error) {
//                 console.error(error);
//                 ToastService.error("Failed to create setup intent");
//             }
//         };

//         if (user?.stripeCustomerId) createSetupIntent();
//     }, [authToken, user]);

//     const appearance = {
//         theme: "stripe",
//         variables: {
//             colorPrimary: "#635BFF",
//             colorBackground: "#ffffff",
//             borderRadius: "8px",
//             fontFamily: "Inter, system-ui, sans-serif",
//             colorText: "#1a1a1a",
//         },
//         rules: {
//             ".Input": {
//                 border: "1px solid #e2e8f0",
//                 padding: "10px",
//             },
//             ".Label": {
//                 fontWeight: "500",
//             },
//         },
//     };

//     const options = { clientSecret, appearance };

//     return (
//         <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow rounded-2xl">
//             <h2 className="text-2xl font-bold mb-4 text-center">
//                 Add Payment Method
//             </h2>
//             <p className="text-center text-gray-600 mb-6">
//                 Enter your card details below to save your payment method.
//             </p>

//             {clientSecret ? (
//                 <Elements stripe={stripePromise} options={options}>
//                     <PaymentForm />
//                 </Elements>
//             ) : (
//                 <p className="text-center text-gray-500">Loading payment form...</p>
//             )}
//         </div>
//     );
// };

// export default PaymentPage;


import React, { useEffect, useState, useContext } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import PaymentForm from "./PaymentForm";
import useAPI from "../../services/baseUrl/useApiHook";
import { AuthContext } from "../../services/context/AuthContext";
import { ToastService } from "../../utils/ToastService";
import { Link, useNavigate, useParams } from "react-router-dom";


console.log("stripeKey", process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY)
const stripePromise = await loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

console.log(stripePromise)

const PaymentPage = () => {
    const [clientSecret, setClientSecret] = useState(null);
    const API = useAPI();
    const { authToken, user } = useContext(AuthContext);
    const { id } = useParams();

    useEffect(() => {
        const createSetupIntent = async () => {
            try {
                const response = await API.post(
                    "/api/business/payment/setupIntent",
                    { stripeCustomerId: user?.stripeCustomerId },
                    { headers: { Authorization: authToken } }
                );

                const secret = response.data.responseData?.setupIntent?.client_secret;
                if (!secret) throw new Error("No client secret returned from server");
                setClientSecret(secret);
            } catch (error) {
                console.error(error);
                ToastService.error("Failed to create setup intent");
            }
        };

        if (user?.stripeCustomerId) createSetupIntent();
    }, [authToken, user]);

    const appearance = {
        theme: "stripe",
        variables: {
            colorPrimary: "#635BFF",
            colorBackground: "#ffffff",
            borderRadius: "8px",
            fontFamily: "Inter, system-ui, sans-serif",
            colorText: "#1a1a1a",
        },
    };

    const options = { clientSecret, appearance };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow rounded-2xl">
            <h2 className="text-2xl font-bold mb-4 text-center">Add Payment Method</h2>
            <p className="text-center text-gray-600 mb-6">
                Enter your card details below to save your payment method.
            </p>

            {clientSecret ? (
                <Elements stripe={stripePromise} options={options}>


                    {id ? <PaymentForm id={id} /> : <PaymentForm />}
                </Elements>
            ) : (
                <p className="text-center text-gray-500">Loading payment form...</p>
            )}
        </div>
    );
};

export default PaymentPage;
