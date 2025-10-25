import React, { useEffect, useState, useContext } from "react";
import { Navigate } from "react-router-dom";
import useAPI from "../../services/baseUrl/useApiHook";
import { AuthContext } from "../../services/context/AuthContext";
import { handleApiError } from "../../utils/helpers/HelperFunction";

const ProtectedRoute = ({ children, checkType }) => {
    const API = useAPI();
    const { authToken } = useContext(AuthContext);

    const [loading, setLoading] = useState(true);
    const [businessProfile, setBusinessProfile] = useState(null);
    const [subscription, setSubscription] = useState(null);
    const [redirectPath, setRedirectPath] = useState(null);

    useEffect(() => {
        const checkAccess = async () => {
            try {
                setLoading(true);

                // ✅ 1. Fetch business profile
                const profileRes = await API.get("/api/business/profile", {
                    headers: { Authorization: authToken },
                });

                const business = profileRes.data.responseData.business;
                setBusinessProfile(business);

                // ❌ Not approved → redirect to review page
                if (!business?.isApproved) {
                    setRedirectPath("/business/profile-under-review");
                    return;
                }

                // ✅ 2. Fetch subscription info
                let subscriptionData = null;
                try {
                    const subRes = await API.get("/api/business/payment/subscription", {
                        headers: { Authorization: authToken },
                    });
                    subscriptionData = subRes.data.responseData.subscription;
                } catch (error) {
                    // 👇 Handle 404 gracefully (no active subscription)
                    if (error?.response?.status === 404) {
                        subscriptionData = null;
                    } else {
                        console.error("Error fetching subscription:", error);
                        throw error; // rethrow other errors
                    }
                }

                setSubscription(subscriptionData);

                // ✅ 3. Apply rules
                if (checkType === "approval") {
                    if (!business?.isApproved) {
                        setRedirectPath("/business/profile-under-review");
                    }
                } else if (checkType === "subscription") {
                    if (!business?.isApproved) {
                        setRedirectPath("/business/profile-under-review");
                    } else if (!subscriptionData) {
                        // No active subscription → redirect to ApprovedPage
                        setRedirectPath("/business/approved");
                    }
                }
            } catch (err) {
                console.error("Error in ProtectedRoute:", err);
                handleApiError(err);
                // If it's a 404 handled above, we won’t reach here.
                // Other errors → redirect to profile under review
                setRedirectPath("/business/profile-under-review");
            } finally {
                setLoading(false);
            }
        };

        checkAccess();
    }, [authToken, checkType]);

    // 🌀 Loader while checking
    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen text-lg font-medium">
                Checking access...
            </div>
        );
    }

    // 🔄 Redirect if needed
    if (redirectPath) {
        return <Navigate to={redirectPath} replace />;
    }

    // ✅ All good — render the protected page
    return children;
};

export default ProtectedRoute;
