import React, { useContext, useEffect, useState } from "react";
import useAPI from "../../services/baseUrl/useApiHook";
import { AuthContext } from "../../services/context/AuthContext";
import MyMap from "../../components/MyMap";
import { ToastService } from "../../utils/ToastService";
import { handleApiError } from "../../utils/helpers/HelperFunction";
import { PhotoProvider, PhotoView } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";
import { FiEdit } from "react-icons/fi";
import { ButtonSquare } from "../../components/ui/buttonSquare";
import { Link } from "react-router-dom";
const BusinessProfile = () => {
  const API = useAPI();
  const auth = useContext(AuthContext);
  const { authToken } = auth;

  const [businessProfile, setBusinessProfile] = useState(null);
  const [loading, setLoading] = useState(true); // ✅ Loader state

  const fetchBusinessProfile = () => {
    setLoading(true);
    API.get("/api/business/profile", {
      headers: { Authorization: authToken },
    })
      .then((response) => {
        const responseMessage = response.data?.responseMessage?.[0];
        setBusinessProfile(response.data.responseData.business);
        ToastService.success(responseMessage);
      })
      .catch((error) => {
        console.error("Error fetching business profile:", error);
        handleApiError(error);
      })
      .finally(() => {
        setLoading(false); // ✅ Stop loader after success/failure
      });
  };

  useEffect(() => {
    fetchBusinessProfile();
  }, []);

  console.log(businessProfile, "Business Profile");
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-lg text-gray-600 font-manrope">
          Loading business profile...
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <div className=" flex justify-between">
        <p className="text-brown-A43 font-playfair font-bold sm:text-[30px] text-[20px]">
          Business Info
        </p>

        <Link to={"/business/businessProfileEdit"}>
          <ButtonSquare className="text-brown-A43">
            <FiEdit />
          </ButtonSquare>
        </Link>
      </div>

      <div className="flex flex-col gap-6">
        <div className="flex flex-col xs:flex-row justify-between xs:items-center gap-2 flex-wrap">
          <h1 className="md:text-[25px] text-[14px] font-bold text-black-14 font-manrope">
            Business Name
          </h1>
          <p className="text-[14px] md:text-[20px] font-medium font-manrope text-brown-A43">
            {businessProfile?.businessName}
          </p>
        </div>

        <div className="flex flex-col xs:flex-row justify-between xs:items-center gap-2 flex-wrap">
          <h1 className="md:text-[25px] text-[14px] font-bold text-black-14 font-manrope">
            Business Operating Hours
          </h1>
          <p className="text-[14px] md:text-[20px] font-medium font-manrope text-brown-A43">
            {businessProfile?.operatingHours}
          </p>
        </div>
        <div className="flex flex-col xs:flex-row justify-between xs:items-center gap-2 flex-wrap">
          <h1 className="md:text-[25px] text-[14px] font-bold text-black-14 font-manrope">
            Business Operating Days
          </h1>
          <p className="text-[14px] md:text-[20px] font-medium font-manrope text-brown-A43">
            {businessProfile?.operatingDays}
          </p>
        </div>

        <div className="flex flex-col xs:flex-row justify-between xs:items-center gap-2 flex-wrap">
          <h1 className="md:text-[25px] text-[14px] font-bold text-black-14 font-manrope">
            Business Description:
          </h1>
          <p className="text-[14px] md:text-[20px] font-medium font-manrope text-brown-A43">
            {businessProfile?.businessDescription}
          </p>
        </div>

        <div className="flex flex-col gap-2 flex-wrap">
          <h1 className="md:text-[25px] text-[14px] font-bold text-black-14 font-manrope">
            Business Location:
          </h1>
          <div
            className=" relative text-[14px] md:text-[20px] font-medium font-manrope text-brown-A43"
            aria-disabled={true}
          >
            <MyMap
              key="salon-map"
              coordinates={businessProfile?.businessLocation?.coordinates}
            />
            <div className="absolute inset-0 bg-transparent cursor-not-allowed z-10"></div>
          </div>
        </div>

        <div className="flex flex-col xs:flex-row justify-between xs:items-center gap-2 flex-wrap">
          <h1 className="md:text-[25px] text-[14px] font-bold text-black-14 font-manrope">
            Business Photos:
          </h1>

          <PhotoProvider>
            <div className="flex gap-2 flex-wrap">
              {Array.isArray(businessProfile?.businessPhotos) &&
              businessProfile.businessPhotos.length > 0 ? (
                businessProfile.businessPhotos.map((item, index) => (
                  <PhotoView key={index} src={item.url}>
                    <img
                      src={item.url}
                      alt={`Business Photo ${index + 1}`}
                      className="w-[80px] h-[80px] object-cover rounded-md cursor-pointer"
                    />
                  </PhotoView>
                ))
              ) : (
                <span className="text-gray-500">Not set</span>
              )}
            </div>
          </PhotoProvider>
        </div>

        {/* <div className="flex flex-col xs:flex-row justify-between xs:items-center gap-2 flex-wrap">
                    <h1 className="md:text-[25px] text-[14px] font-bold text-black-14 font-manrope">
                        NIC Document:
                    </h1>

                    <PhotoProvider>
                        <div className="flex gap-2 flex-wrap">
                            {Array.isArray(businessProfile?.businessNICPhoto) && businessProfile.businessNICPhoto.length > 0 ? (
                                businessProfile.businessNICPhoto.map((item, index) => (
                                    <PhotoView key={index} src={item.url}>
                                        <img
                                            src={item.url}
                                            alt={`Business Photo ${index + 1}`}
                                            className="w-[80px] h-[80px] object-cover rounded-md cursor-pointer"
                                        />
                                    </PhotoView>
                                ))
                            ) : (
                                <span className="text-gray-500">Not set</span>
                            )}
                        </div>
                    </PhotoProvider>

                </div> */}

        <div className="flex flex-col xs:flex-row justify-between xs:items-center gap-2 flex-wrap">
          <h1 className="md:text-[25px] text-[14px] font-bold text-black-14 font-manrope">
            Featured Image:
          </h1>

          <PhotoProvider>
            <div className="flex gap-2 flex-wrap">
              {businessProfile?.featuredImage?.url ? (
                <PhotoView src={businessProfile?.featuredImage?.url}>
                  <img
                    src={businessProfile?.featuredImage?.url}
                    className="w-[80px] h-[80px] object-cover rounded-md cursor-pointer"
                  />
                </PhotoView>
              ) : (
                <span className="text-gray-500">Not set</span>
              )}
            </div>
          </PhotoProvider>
        </div>
        {/* 
        <div className="flex flex-col xs:flex-row justify-between xs:items-center gap-2 flex-wrap">
          <h1 className="md:text-[25px] text-[14px] font-bold text-black-14 font-manrope">
            Registration Document:
          </h1>

          <PhotoProvider>
            <div className="flex gap-2 flex-wrap">
              {businessProfile?.businessRegistrationDoc?.url ? (
                <PhotoView
                  src={businessProfile.businessRegistrationDoc.url}
                  className="border-none"
                >
                  <img
                    src={businessProfile.businessRegistrationDoc.url}
                    alt="Business Registration Document"
                    className="w-[80px] h-[80px] object-cover rounded-md cursor-pointer"
                  />
                </PhotoView>
              ) : (
                <span className="text-gray-500">Not set</span>
              )}
            </div>
          </PhotoProvider>
        </div> */}
      </div>
    </div>
  );
};

export default BusinessProfile;
