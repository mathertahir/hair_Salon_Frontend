import React from "react";

const SubscriptionSkeleton = () => {
    return (
        <div className="space-y-6 animate-pulse">
            {/* Subscription Status */}
            <div className="flex justify-between items-center">
                <div className="h-6 w-48 bg-gray-200 rounded"></div>
                <div className="h-5 w-24 bg-gray-200 rounded"></div>
            </div>

            {/* Start Date */}
            <div className="flex justify-between items-center">
                <div className="h-6 w-56 bg-gray-200 rounded"></div>
                <div className="h-5 w-32 bg-gray-200 rounded"></div>
            </div>

            {/* Expiry Date */}
            <div className="flex justify-between items-center">
                <div className="h-6 w-52 bg-gray-200 rounded"></div>
                <div className="h-5 w-36 bg-gray-200 rounded"></div>
            </div>

            {/* Subscription Type */}
            <div className="flex justify-between items-center">
                <div className="h-6 w-44 bg-gray-200 rounded"></div>
                <div className="h-5 w-28 bg-gray-200 rounded"></div>
            </div>

            {/* Payment Card Section */}
            <div className="h-40 bg-gray-100 rounded-lg mt-4"></div>
        </div>
    );
};

export default SubscriptionSkeleton;
