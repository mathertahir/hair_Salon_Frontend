import React from "react";
import detail1 from "../../assets/detail1.png";
import detail2 from "../../assets/detail2.png";
import detail3 from "../../assets/detail3.png";
import { FiStar } from "react-icons/fi";
import MyMap from "../../components/MyMap";

import { ButtonSquare } from "../../components/ui/buttonSquare";
import { Link, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

const SalonDetailPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleBooking = () => {
    navigate("/booking");
    console.log(location.pathname, "Current Location"); // 👈 works same as router.push("/booking")
  };
  return (
    <div>
      {/* Hero Section */}
      <div className="">
        <div className="container">
          <div className="py-[40px] ">
            <div className="grid grid-cols-12 gap-[20px] mb-[31px]">
              <div className="col-span-12 md:col-span-8 rounded-3xl aspect-auto">
                <img
                  src={detail1}
                  alt="detail1"
                  className="w-full h-full object-cover rounded-3xl"
                />
              </div>

              <div className="col-span-12 md:col-span-4 grid grid-cols-1 gap-[20px]">
                <div className="rounded-3xl aspect-[7/4]">
                  <img
                    src={detail2}
                    alt="detail2"
                    className="w-full h-full object-cover rounded-3xl"
                  />
                </div>
                <div className="rounded-3xl aspect-[7/4]">
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
                    Crown by Amara
                  </p>
                </div>
                <div className="flex gap-[20px] items-center">
                  <div className="flex items-center gap-[10px] text-brown-A43">
                    <div>
                      {" "}
                      <FiStar size={24} />
                    </div>

                    <p className="text-[25px] font-manrope font-normal ">4.5</p>
                  </div>

                  <div>
                    {" "}
                    <p className="text-lg font-playfair font-bold text-gray-55">
                      104 Reviews.
                    </p>
                  </div>
                </div>
              </div>

              <p className="font-manrope text-base font-semibold text-gray-55  text-left  leading-10 ">
                At Crown by Amara, we believe your hair is your crown, and it
                deserves the best care. With years of professional experience,
                we specialize in modern cuts, vibrant coloring, bridal styling,
                and treatments that bring life back to your hair. Our mission is
                to create looks that reflect your personality while keeping your
                hair healthy and radiant. Whether it’s a quick trim, a bold
                transformation, or the perfect style for your big day, Crown by
                Amara ensures every client leaves with confidence and a smile.
                🌸.
              </p>
            </div>

            <div className="flex flex-col gap-[20px] items-start justify-start text-left mb-[111px]">
              <p className="sm:text-[35px] text-[20px] sm:font-playfair font-bold text-black-14">
                Location
              </p>

              <div className="w-full">
                <MyMap key="salon-map" coordinates={[-79.347015, 43.65107]} />
              </div>
            </div>

            <div className="grid grid-cols-1    lg:grid-cols-3  gap-[104px]  md:gap-[80px] sm:gap-[60px] xs:gap-[30px] mb-[111px]">
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
                      <li className="text-2xl font-manrope font-normal text-gray-55">
                        Mon - Sat
                      </li>
                      <li className="text-2xl font-manrope font-normal text-gray-55">
                        11:00 AM - 10:00 PM`
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

            <Link to={`/booking`}>
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
  );
};

export default SalonDetailPage;
