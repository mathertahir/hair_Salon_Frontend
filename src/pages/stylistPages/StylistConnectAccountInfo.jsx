import React, { useState, useContext, useEffect } from "react";
import { ButtonSquare } from "../../components/ui/buttonSquare";
import useAPI from "../../services/baseUrl/useApiHook";
import { ToastService } from "../../utils/ToastService";
import { handleApiError } from "../../utils/helpers/HelperFunction";
import { AuthContext } from "../../services/context/AuthContext";
import SubscriptionSkeleton from "../../components/ui/SubscriptionSkeleton";

const StylistConnectAccountInfo = () => {
  const API = useAPI();
  const auth = useContext(AuthContext);
  const { authToken, user, handleStripeStatus } = auth;

  const [loading, setLoading] = useState(true);
  const [connectStatus, setConnectStatus] = useState(null);
  const [onboardingUrl, setOnboardingUrl] = useState(null);

  const fetchUserStatus = async () => {
    setLoading(true);
    try {
      // 1️⃣ Check Stripe account status
      const response = await API.get("api/auth/business/checkAccountStatus", {
        headers: { Authorization: authToken },
      });

      const data = response.data.responseData.data.verificationStatus;

      // Update local component state
      setConnectStatus(data);

      // Update localStorage user object
      handleStripeStatus(data);

      ToastService.success(response.data?.responseMessage?.[0]);

      // 2️⃣ If any Stripe verification is incomplete, regenerate onboarding link
      if (
        !data.stripeAccountVerified ||
        !data.stripeDetailEnabled ||
        !data.stripePayoutEnabled ||
        !data.stripeChargesEnabled
      ) {
        const linkResponse = await API.get("api/auth/business/regenerateLink", {
          headers: { Authorization: authToken },
        });

        setOnboardingUrl(linkResponse.data.responseData.onboardingUrl);
        ToastService.success(linkResponse.data.responseMessage[0]);
      }
    } catch (err) {
      handleApiError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserStatus();
  }, []);

  return (
    <div className="p-4">
      {loading ? (
        <SubscriptionSkeleton />
      ) : (
        <div className="flex flex-col gap-6 h-full">
          <div className="flex flex-col xs:flex-row justify-between xs:items-center gap-2 flex-wrap">
            <h1 className="md:text-[25px] text-[14px] font-bold text-black-14 font-manrope">
              Your Account Id
            </h1>
            <p className="text-[14px] md:text-[20px] font-medium font-manrope text-brown-A43">
              {user?.stripeAccountId || "N/A"}
            </p>
          </div>

          <div className="flex flex-col xs:flex-row justify-between xs:items-center gap-2 flex-wrap">
            <h1 className="md:text-[25px] text-[14px] font-bold text-black-14 font-manrope">
              Stripe Account Verified
            </h1>
            <p className="text-[14px] md:text-[20px] font-medium font-manrope text-brown-A43">
              {connectStatus?.stripeAccountVerified ? "Yes" : "No"}
            </p>
          </div>

          <div className="flex flex-col xs:flex-row justify-between xs:items-center gap-2 flex-wrap">
            <h1 className="md:text-[25px] text-[14px] font-bold text-black-14 font-manrope">
              Stripe Charges Enabled
            </h1>
            <p className="text-[14px] md:text-[20px] font-medium font-manrope text-brown-A43">
              {connectStatus?.stripeChargesEnabled ? "Yes" : "No"}
            </p>
          </div>

          <div className="flex flex-col xs:flex-row justify-between xs:items-center gap-2 flex-wrap">
            <h1 className="md:text-[25px] text-[14px] font-bold text-black-14 font-manrope">
              Subscription Detail Submitted
            </h1>
            <p className="text-[14px] md:text-[20px] font-medium font-manrope text-brown-A43">
              {connectStatus?.stripeDetailEnabled ? "Yes" : "No"}
            </p>
          </div>

          <div className="flex flex-col xs:flex-row justify-between xs:items-center gap-2 flex-wrap">
            <h1 className="md:text-[25px] text-[14px] font-bold text-black-14 font-manrope">
              Stripe Payout Enabled
            </h1>
            <p className="text-[14px] md:text-[20px] font-medium font-manrope text-brown-A43">
              {connectStatus?.stripePayoutEnabled ? "Yes" : "No"}
            </p>
          </div>

          {/* Show onboarding link if needed */}
          {onboardingUrl && (
            <div className="flex flex-col gap-5 mt-4">
              <div
                className="flex items-center p-4 mb-4 text-white bg-brown-A43"
                role="alert"
              >
                <div className="ms-3 text-sm font-medium">
                  Your Stripe account is not fully verified.{" "}
                  <a
                    href={onboardingUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold underline hover:no-underline"
                  >
                    Complete the information here
                  </a>{" "}
                  to continue your payments.
                </div>
              </div>

              <div className="w-full">
                <a
                  href={onboardingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ButtonSquare
                    className="w-full bg-transparent text-brown-A43 py-[32px] px-[110px] font-extrabold text-[14px] font-manrope hover:bg-brown-A43 text-black-14 bg-brown-A43-o20 hover:text-background"
                    variant="secondary"
                  >
                    Update Stripe Info
                  </ButtonSquare>
                </a>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default StylistConnectAccountInfo;
