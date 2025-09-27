// import React from "react";
// import {
//     Routes,
//     Route,
// } from "react-router-dom";

// import Home from "../pages/clientPages/Home.jsx";
// import Contact from "../pages/clientPages/Contact.jsx";
// import AboutUs from "../pages/clientPages/About.jsx";
// import SalonDetailPage from "../pages/clientPages/SalonDetailPage.jsx";
// import BookingPage from "../pages/clientPages/BookingPage.jsx";

// // Create placeholder components for new routes
// const Profile = () => (
//     <div className="p-6">
//         <h1 className="text-2xl font-bold mb-4">Profile</h1>
//         <p>This is the profile page.</p>
//     </div>
// );

// const Settings = () => (
//     <div className="p-6">
//         <h1 className="text-2xl font-bold mb-4">Settings</h1>
//         <p>This is the settings page.</p>
//     </div>
// );

// // ✅ App Router Component
// const UserRoutes = () => {
//     return (
//         <Routes>
//             <Route path="/" element={<Home />} />
//             <Route path="/about" element={<AboutUs />} />
//             <Route path="/contact" element={<Contact />} />
//             <Route path="/profile" element={<Profile />} />
//             <Route path="/settings" element={<Settings />} />
//             <Route path="/salon-detail/:id" element={<SalonDetailPage />} />
//             <Route path="/booking" element={<BookingPage />} />
//         </Routes>
//     );
// };

// export default UserRoutes;

import { Routes, Route } from "react-router-dom";
import Layout from "../components/layouts/Layout.jsx";

import Home from "../pages/clientPages/Home.jsx";
import Contact from "../pages/clientPages/Contact.jsx";
import AboutUs from "../pages/clientPages/About.jsx";
import SalonDetailPage from "../pages/clientPages/SalonDetailPage.jsx";
import BookingPage from "../pages/clientPages/BookingPage.jsx";
import BookingConfirmPage from "../pages/clientPages/BookingConfirmPage.jsx";
import RoleSelection from "../pages/RoleSelection.jsx";
import SignupClient from "../pages/clientPages/SignupClient.jsx";
import SignInClient from "../pages/clientPages/SignInClient.jsx";
import ForgotPassword from "../pages/ForgotPassword.jsx";
import OTP from "../pages/OTP.jsx";
import ResetPassword from "../pages/ResetPassword.jsx";
import ClientBookingPage from "../pages/clientPages/ClientBookingPage.jsx";
import ClientBookingInfo from "../pages/clientPages/ClientBookingInfo.jsx";
import StylistSignUpPage from "../pages/stylistPages/StylistSignUpPage.jsx";
import ProfileUnderReview from "../pages/stylistPages/ProfileUnderReview.jsx";
import ApprovedPage from "../pages/stylistPages/ApprovedPage.jsx";
import PricingPage from "../pages/stylistPages/PricingPage.jsx";
import PaymentForm from "../pages/stylistPages/PaymentForm.jsx";
import StylistBookingPage from "../pages/stylistPages/StylistBookingPage.jsx";
import StylistBookingInfo from "../pages/stylistPages/StylistBookingInfo.jsx";
import SalonDetailedInfo from "../pages/stylistPages/SalonDetailedInfo.jsx";
// Temporary placeholder components
const Profile = () => (
    <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Profile</h1>
        <p>This is the profile page.</p>
    </div>
);

const Settings = () => (
    <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Settings</h1>
        <p>This is the settings page.</p>
    </div>
);

const UserRoutes = () => {
    return (
        <Routes>
            {/* 👇 All routes now share Layout */}
            <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="about" element={<AboutUs />} />
                <Route path="contact" element={<Contact />} />
                <Route path="profile" element={<Profile />} />
                <Route path="settings" element={<Settings />} />
                <Route path="salon-detail/:id" element={<SalonDetailPage />} />
                <Route path="booking" element={<BookingPage />} />
                <Route path="booking-confirm/:id" element={<BookingConfirmPage />} />
                <Route path="role/:id?" element={<RoleSelection />} />
                <Route path="signup-client" element={<SignupClient />} />
                <Route path="signin-client/:id?" element={<SignInClient />} />
                <Route path="forgotPassword" element={<ForgotPassword />} />
                <Route path="otp" element={<OTP />} />
                <Route path="resetPassword" element={<ResetPassword />} />
                <Route path="client-bookings" element={<ClientBookingPage />} />
                <Route path="client-booking-info/:id" element={<ClientBookingInfo />} />
                <Route path="stylist-signup" element={<StylistSignUpPage />} />
                <Route path="profile-under-review" element={<ProfileUnderReview />} />
                <Route path="approved" element={<ApprovedPage />} />
                <Route path="pricing" element={<PricingPage />} />
                <Route path="payment-form" element={<PaymentForm />} />
                <Route path="stylist-bookings" element={<StylistBookingPage />} />
                <Route path="stylist-booking-info/:id" element={<StylistBookingInfo />} />
                <Route path="salon-detailed-info/:id" element={<SalonDetailedInfo />} />
            </Route>
        </Routes>
    );
};

export default UserRoutes;
