import React, { useContext, useState, useEffect } from "react";
import detail1 from "../../assets/detail1.png";
import detail2 from "../../assets/detail2.png";
import detail3 from "../../assets/detail3.png";

import MyMap from "../../components/MyMap";
import useAPI from "../../services/baseUrl/useApiHook";
import { AuthContext } from "../../services/context/AuthContext";
import { ToastService } from "../../utils/ToastService";
import { handleApiError } from "../../utils/helpers/HelperFunction";

import { ButtonSquare } from "../../components/ui/buttonSquare";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import ReviewSwiper from "../../components/ReviewSwiper";

const PublicServiceDetail = () => {
  const API = useAPI();
  const { id } = useParams();
  const auth = useContext(AuthContext);
  const { authToken } = auth;

  const navigate = useNavigate();
  const location = useLocation();

  const [service, setServiceInfo] = useState(null);
  const [loading, setLoading] = useState(true); // ✅ Loader state

  const fetchServiceDetail = () => {
    setLoading(true);
    API.get(`/api/user/services/${id}`, {
      headers: { Authorization: authToken },
    })
      .then((response) => {
        const responseMessage = response.data?.responseMessage?.[0];
        setServiceInfo(response.data.responseData.service);
        // ToastService.success(responseMessage);
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
    fetchServiceDetail();
  }, []);

  const handleBooking = () => {
    navigate("/booking");
    console.log(location.pathname, "Current Location"); // 👈 works same as router.push("/booking")
  };

  console.log(service?.business?.businessReviews);
  return (
    <div>
      {/* Hero Section */}
      <div className="">
        <div className="container">
          <div className="py-[40px] ">
            <div className="grid grid-cols-12 gap-[20px] mb-[31px]">
              <div className="col-span-12 md:col-span-8 rounded-3xl">
                <img
                  src={detail1}
                  alt="detail1"
                  className="w-full h-full object-cover rounded-3xl"
                />
              </div>

              <div className="col-span-12 md:col-span-4 grid grid-cols-1 gap-[20px]">
                <div className="rounded-3xl">
                  <img
                    src={detail2}
                    alt="detail2"
                    className="w-full h-full object-cover rounded-3xl"
                  />
                </div>
                <div className="rounded-3xl">
                  <img
                    src={detail3}
                    alt="detail3"
                    className="w-full h-full object-cover rounded-3xl"
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-[20px] mb-[51px] ">
              <div className="flex sm:flex-row flex-col justify-between items-center">
                <div>
                  <p className=" sm:text-[35px] text-[20px] sfont-playfair font-bold text-black-14">
                    {service?.business?.businessName}
                  </p>
                </div>
                <div className="flex gap-[20px] items-center">
                  <div className="flex items-center gap-[10px] text-brown-A43">
                    <div>
                      <FaStar size={20} fill="#FFBF00" />
                    </div>

                    <p className="text-[25px] font-manrope font-normal ">
                      {service?.business?.averageRating}
                    </p>
                  </div>

                  <div>
                    {" "}
                    <p className="text-lg font-playfair font-bold text-gray-55">
                      {service?.business?.totalReviews} Reviews.
                    </p>
                  </div>
                </div>
              </div>

              <p className="font-manrope text-base font-semibold text-gray-55  text-left  leading-10 ">
                {service?.business?.businessDescription}
              </p>
            </div>

            <div className="flex flex-col gap-[20px] items-start justify-start text-left mb-[111px]">
              <p className="sm:text-[35px] text-[20px] sm:font-playfair font-bold text-black-14">
                Location
              </p>

              <div className="w-full">
                <MyMap
                  key="salon-map"
                  coordinates={service?.business?.businessLocation.coordinates}
                />
              </div>
            </div>

            <div className="flex flex-col gap-[80px]">
              <div className="grid grid-cols-1    lg:grid-cols-3  gap-[104px]  md:gap-[80px] sm:gap-[60px] xs:gap-[30px] ">
                <div className="flex flex-col gap-[20px] items-start justify-start text-left  border-b-[1px] lg:border-b-0   lg:border-r-[1px] border-white-d9">
                  <p className="sm:text-[35px] text-[20px] sm:font-playfair font-bold text-brown-A43">
                    Services Offered
                  </p>

                  <div className=" ">
                    <ul className="flex flex-col gap-[10px] list-disc list-inside">
                      <li className="text-2xl font-manrope font-normal text-gray-55">
                        Women's Haircut
                      </li>
                      <li className="text-2xl font-manrope font-normal text-gray-55">
                        Bridal Hair Styling
                      </li>
                      <li className="text-2xl font-manrope font-normal text-gray-55">
                        Hair Coloring and styling
                      </li>
                      <li className="text-2xl font-manrope font-normal text-gray-55">
                        Keratin & Rebonding
                      </li>
                      <li className="text-2xl font-manrope font-normal text-gray-55">
                        Blow Dry & Styling
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="flex border-white-d9  border-r-[1px] ">
                  <div className="flex flex-col gap-[20px] items-start justify-start text-left">
                    <p className="sm:text-[35px] text-[20px] sm:font-playfair font-bold text-brown-A43">
                      Avaiilability
                    </p>

                    <div className=" ">
                      <ul className="flex flex-col gap-[10px] ">
                        {/* <li className='text-2xl font-manrope font-normal text-gray-55'>Mon - Sat</li> */}
                        <li className="text-2xl font-manrope font-normal text-gray-55">
                          {service?.business?.operatingDays}
                        </li>
                        <li className="text-2xl font-manrope font-normal text-gray-55">
                          {service?.business?.operatingHours}
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="flex  ">
                  <div className="flex flex-col gap-[20px] items-start justify-start text-left">
                    <p className="sm:text-[35px] text-[20px] sm:font-playfair font-bold text-brown-A43">
                      Price Range
                    </p>

                    <div className="">
                      <ul className="flex flex-col gap-[10px] ">
                        <li className="text-2xl font-manrope font-normal text-gray-55">
                          Starting from PKR 3,000`
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-[10px]">
                <p className=" sm:text-[25px] text-[20px] font-playfair font-bold text-brown-A43">
                  Service Detail
                </p>

                <div className="flex flex justify-between gap-[5px]">
                  <p className=" sm:text-[25px] text-[20px] font-playfair font-bold text-black-14">
                    Name{" "}
                  </p>
                  <p className=" sm:text-[25px] text-[20px] font-manrope font-bold text-brown-A43">
                    {service?.name}{" "}
                  </p>
                </div>

                <div className="flex flex justify-between gap-[5px]">
                  <p className=" sm:text-[25px] text-[20px] font-playfair font-bold text-black-14">
                    Price{" "}
                  </p>
                  <p className=" sm:text-[25px] text-[20px] font-manrope font-bold text-brown-A43">
                    ${service?.price}{" "}
                  </p>
                </div>
                <div className="flex flex flex-col gap-[10px]">
                  <p className=" sm:text-[25px] text-[20px] font-playfair font-bold text-black-14">
                    Description{" "}
                  </p>
                  <p className=" sm:text-[15px] text-[15px] font-manrope  text-black-14">
                    ${service?.description}{" "}
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-10">
                <p className=" sm:text-[35px] text-[20px] font-playfair font-bold text-brown-A43 text-center">
                  Business Reviews
                </p>
                <div>
                  <ReviewSwiper
                    businessReviews={service?.business?.businessReviews}
                  />
                </div>
              </div>

              <Link to={`/booking/${service?._id}`}>
                <ButtonSquare
                  className="w-full bg-brown-A43 text-background  p-[32px]  font-extrabold text-[14px] font-manrope"
                  variant="secondary"
                >
                  Start Booking
                </ButtonSquare>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PublicServiceDetail;
