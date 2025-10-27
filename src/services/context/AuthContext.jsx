import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
    const getInitial = (key) => {
        try {
            const value = localStorage.getItem(key);
            return value ? JSON.parse(value) : null;
        } catch {
            return null;
        }
    };


    const [user, setUser] = useState(null);
    const [authToken, setAuthToken] = useState(null);
    const [isAuthInitialized, setIsAuthInitialized] = useState(false);
    const [location, setLocation] = useState(() => getInitial('user_location') || {
        name: 'Toronto',
        address: 'Toronto, ON, Canada',
        lat: 43.78270459824506,
        lng: -79.67251148412838
    });
    // Track auth initialization

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        const storedToken = localStorage.getItem("auth_token");


        if (storedUser && storedToken) {
            setUser(JSON.parse(storedUser));
            setAuthToken(storedToken);
        }

        setIsAuthInitialized(true); // Indicate that auth check is complete
    }, []);

    const login = (userData, token) => {
        const bearerToken = `Bearer ${token}`;
        localStorage.setItem("user", JSON.stringify(userData));
        localStorage.setItem("auth_token", bearerToken);

        setUser(userData);
        setAuthToken(bearerToken);
    };

    const logout = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("auth_token");
        localStorage.removeItem("roleType");
        localStorage.removeItem("businessProfile");
        localStorage.removeItem("subscriptionInfo");


        setUser(null);
        setAuthToken(null);
    };

    const updateUser = (updatedUser) => {
        localStorage.setItem("user", JSON.stringify(updatedUser));
        setUser(updatedUser);
    };

    const handleRoleType = (roleType) => {
        localStorage.setItem("roleType", roleType);
    };
    const handleBusinessProfile = (businessInfo) => {
        localStorage.setItem("businessProfile", JSON.stringify(businessInfo));
    }

    const handleUserSubscription = (Info) => {
        localStorage.setItem("subscriptionInfo", JSON.stringify(Info));
    }

    const handleUserLocation = (Info) => {
        localStorage.setItem("user_location", JSON.stringify(Info));
    }


    return (
        <AuthContext.Provider value={{ user, login, logout, updateUser, handleRoleType, authToken, handleBusinessProfile, handleUserSubscription, handleUserLocation }}>
            {/* Show loading screen or children only after auth state is initialized */}
            {isAuthInitialized ? children : ""}
        </AuthContext.Provider>
    );
};
