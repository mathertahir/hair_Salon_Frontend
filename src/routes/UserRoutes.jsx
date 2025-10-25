import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
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
import ProfileSetup from "../pages/stylistPages/ProfileSetup.jsx";
import BusinessLayout from "../components/layouts/BusinessLayout.jsx";
import SubscriptionPage from "../pages/stylistPages/SubscriptionPage.jsx";
import PersonalProfile from "../pages/stylistPages/PersonalProfile.jsx";
import BusinessProfile from "../pages/stylistPages/BusinessProfile.jsx";
import BusinessProfileEdit from "../pages/stylistPages/BusinessProfileEdit.jsx";
import ServicesPage from "../pages/stylistPages/ServicesPage.jsx";
import ViewServicePage from "../pages/stylistPages/ViewServicePage.jsx";
import PaymentPage from "../pages/stylistPages/PaymentPage.jsx";
import ProtectedRoute from "../pages/stylistPages/ProtectedRoute.jsx";

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
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { index: true, element: <Home /> },
        { path: "about", element: <AboutUs /> },
        { path: "contact", element: <Contact /> },
        { path: "profile", element: <Profile /> },
        { path: "settings", element: <Settings /> },
        { path: "salon-detail/:id", element: <SalonDetailPage /> },
        { path: "booking", element: <BookingPage /> },
        { path: "booking-confirm/:id", element: <BookingConfirmPage /> },
        { path: "role/:id?", element: <RoleSelection /> },
        { path: "signup-client", element: <SignupClient /> },
        { path: "login/:id?", element: <SignInClient /> },
        { path: "forgotPassword/:id?", element: <ForgotPassword /> },
        { path: "otp/:id?", element: <OTP /> },
        { path: "resetPassword/:id?", element: <ResetPassword /> },
        { path: "client-bookings", element: <ClientBookingPage /> },
        { path: "client-booking-info/:id", element: <ClientBookingInfo /> },
        { path: "stylist-signup", element: <StylistSignUpPage /> },
        { path: "profile-under-review", element: <ProfileUnderReview /> },
        { path: "approved", element: <ApprovedPage /> },
        { path: "pricing", element: <PricingPage /> },
        { path: "payment-form", element: <PaymentForm /> },
        { path: "stylist-bookings", element: <StylistBookingPage /> },
        { path: "stylist-booking-info/:id", element: <StylistBookingInfo /> },
        { path: "salon-detailed-info/:id", element: <SalonDetailedInfo /> },
        { path: "profile-setup/:id?", element: <ProfileSetup /> },
      ],
    },

    {
      path: "/business",
      element: <BusinessLayout />,
      children: [
        {
          index: true,
          element: <PersonalProfile />,
        },

        {
          path: "subscription",
          element: (
            <ProtectedRoute checkType="subscription">
              <SubscriptionPage />
            </ProtectedRoute>
          ),
        },
        {
          path: "services/:id?",
          element: (
            <ProtectedRoute checkType="subscription">
              <ServicesPage />
            </ProtectedRoute>
          ),
        },

        {
          path: "viewService/:id?",
          element: (
            <ProtectedRoute checkType="subscription">
              <ViewServicePage />
            </ProtectedRoute>
          ),
        },
        {
          path: "profile",
          element: <PersonalProfile />,
        },
        {
          path: "businessProfile",
          element: <BusinessProfile />,
        },
        {
          path: "businessProfile",
          element: <BusinessProfile />,
        },
        {
          path: "businessProfileEdit",
          element: <BusinessProfileEdit />,
        },
        { path: "profile-under-review", element: <ProfileUnderReview /> },
        { path: "approved", element: <ApprovedPage /> },
        { path: "pricing", element: <PricingPage /> },

        { path: "payment-page/:id?", element: <PaymentPage /> },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default UserRoutes;
