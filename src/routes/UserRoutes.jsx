import React from "react";
import {
    Routes,
    Route,
} from "react-router-dom";

import Home from "../pages/clientPages/Home.jsx";
import Contact from "../pages/clientPages/Contact.jsx";
import AboutUs from "../pages/clientPages/About.jsx";
import SalonDetailPage from "../pages/clientPages/SalonDetailPage.jsx";

// Create placeholder components for new routes
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

// ✅ App Router Component
const UserRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/salon-detail/:id" element={<SalonDetailPage />} />
        </Routes>
    );
};

export default UserRoutes;
