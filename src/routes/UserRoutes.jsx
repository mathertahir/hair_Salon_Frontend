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
                <Route path="role" element={<RoleSelection />} />
                <Route path="signup-client" element={<SignupClient />} />
                <Route path="signin-client" element={<SignInClient />} />
                <Route path="forgotPassword" element={<ForgotPassword />} />
                <Route path="otp" element={<OTP />} />
                <Route path="resetPassword" element={<ResetPassword />} />
            </Route>
        </Routes>
    );
};

export default UserRoutes;
