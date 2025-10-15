import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "./AuthContext";

const PrivateRoute = ({ allowedRoles = [] }) => {
    const auth = useContext(AuthContext);

    if (!auth) {
        throw new Error("AuthContext is not available");
    }

    const token = localStorage.getItem("auth_token");
    const userRole = auth.user?.userRole?.name || localStorage.getItem("role");

    // 🔒 If no token → redirect to login
    if (!token) {
        return <Navigate to="/login" replace />;
    }

    // 🚫 If allowedRoles exist but userRole not included → redirect home
    if (allowedRoles.length && !allowedRoles.includes(userRole)) {
        return <Navigate to="/" replace />;
    }

    // ✅ Otherwise, render the protected route content
    return <Outlet />;
};

export default PrivateRoute;
