import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import useAPI from "../../services/baseUrl/useApiHook";
import { AuthContext } from "../../services/context/AuthContext";
import { ToastService } from "../../utils/ToastService";
import { FiMapPin, FiSearch } from "react-icons/fi";

import { Button } from "../../components/ui/button";
import heroBg from "../../assets/HeroBG.png";
import gallery1 from "../../assets/HG1.png";
import gallery2 from "../../assets/HG2.png";
import gallery3 from "../../assets/HG3.png";
import gallery4 from "../../assets/HG4.png";
import gallery5 from "../../assets/HG5.png";
import subscribeBg from "../../assets/Subscribe.png";
import HairstylistCard from "../../components/HairstylistCard";
import TestimonialSwiper from "../../components/TestimonialSwiper";
import { handleApiError } from "../../utils/helpers/HelperFunction";
import { Link } from "react-router-dom";
import SearchSelect from "../../components/ui/SearchSelect";

const Home = () => {
  const [selectedFilter, setSelectedFilter] = useState(null);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(4);
  const [totalPages, setTotalPages] = useState(1);
  const [searchParam, setSearchParam] = useState("");
  const [postalCode, setPostalCode] = useState("");
  // Swiper navigation refs
  const swiperRef = useRef(null);

  const navigate = useNavigate(); // react-router hook

  const API = useAPI();
  const auth = useContext(AuthContext);
  const { authToken, user } = auth;

  const [userLocation, setUserLocation] = useState(
    localStorage.getItem("userLocation")
      ? JSON.parse(localStorage.getItem("userLocation"))
      : null
  );

  const filterItems = [
    { key: 0, label: "Top Rated" },
    { key: 1, label: "Near Me" },
  ];

  const fetchServices = async () => {
    console.log("Fetching services...");
    setLoading(true);

    try {
      if (!userLocation?.lat || !userLocation?.lng) {
        console.warn("No location found in localStorage!");
        setLoading(false);
        return;
      }

      const response = await API.get("/api/user/services/list", {
        params: {
          latitude: userLocation.lat,
          longitude: userLocation.lng,
          limit,
          page: currentPage,
          sortBy: 0,
          searchParam: searchParam, // Default sort = Top Rated
        },
      });

      console.log("API Response:", response.data);
      const data = response.data.responseData;

      setServices(data?.services || []);
      setTotalPages(data?.pagination?.totalPages || 1);

      if (response.data?.responseMessage?.[0]) {
        // ToastService.success(response.data?.responseMessage?.[0]);
      }
    } catch (err) {
      handleApiError(err);
    } finally {
      setLoading(false);
    }
  };

  // 🔁 Re-fetch whenever pagination or sorting changes
  useEffect(() => {
    fetchServices();
  }, [currentPage, limit, selectedFilter, userLocation, searchParam]);

  useEffect(() => {
    const handleLocationChange = () => {
      const newLocation = localStorage.getItem("userLocation")
        ? JSON.parse(localStorage.getItem("userLocation"))
        : null;
      setUserLocation(newLocation);
    };

    // ✅ Listen to both localStorage events AND our custom event
    window.addEventListener("userLocationChanged", handleLocationChange);
    window.addEventListener("storage", handleLocationChange);

    return () => {
      window.removeEventListener("userLocationChanged", handleLocationChange);
      window.removeEventListener("storage", handleLocationChange);
    };
  }, []);

  console.log(services);

  // Sample hairstylist data

  // Testimonial data
  const testimonials = [
    {
      id: 1,
      name: "Leslie Alexander",
      location: "Moncton, Canada",
      title: "Neque porro quisquam est qui dolum",
      description:
        "It is a long established fact that a reader will be tracked distracted by the readable content of a page is when looking at its layout. The point of using Lorem of distribution it look like readable English",
      image: gallery3,
    },
    {
      id: 2,
      name: "Sarah Johnson",
      location: "Toronto, Canada",
      title: "Amazing service and beautiful results",
      description:
        "I've been coming here for years and they never disappoint. The stylists are professional, skilled, and truly understand how to work with my hair type. Highly recommended!",
      image: gallery1,
    },
    {
      id: 3,
      name: "Maria Rodriguez",
      location: "Vancouver, Canada",
      title: "Best hair salon in the city",
      description:
        "The team here is incredible! They listened to what I wanted and delivered beyond my expectations. My hair has never looked better and I get compliments everywhere I go.",
      image: gallery2,
    },
    {
      id: 4,
      name: "Jennifer Brown",
      location: "Montreal, Canada",
      title: "Professional and friendly staff",
      description:
        "From the moment I walked in, I felt welcomed and comfortable. The stylist took time to understand my hair needs and the result was absolutely stunning.",
      image: gallery4,
    },
  ];
  const testimonialTitle = "TESTIMONIALS";
  const testimonialDescription = "What Our Clients Say";

  const handleBookNow = (hairstylistId) => {
    console.log(`Booking hairstylist with ID: ${hairstylistId}`);
    // Add your booking logic here
  };

  const hairstyleOptions = [
    { value: "Braids", label: "Braids" },
    { value: "Bridal Special", label: "Bridal Special" },
    { value: "Cornrows", label: "Cornrows" },
    { value: "Crochet Braids", label: "Crochet Braids" },
    {
      value: "Hair Straightening",
      label: "Hair Straightening (Blowout, Silk Press)",
    },
    { value: "Kids Hairstyles", label: "Kids’ Hairstyles" },
    { value: "Locs", label: "Locs" },
    { value: "Natural Hair Care", label: "Natural Hair Care" },
    { value: "Passion Twists", label: "Passion Twists" },
    { value: "Twists", label: "Twists" },
    { value: "Weave", label: "Weave" },
    { value: "Wigs", label: "Wigs" },
    { value: "Make Up", label: "Make Up" },
  ];

  useEffect(() => {
    const handleLocationChange = () => {
      const newLocation = JSON.parse(localStorage.getItem("userLocation"));
      setUserLocation(newLocation);
    };
    window.addEventListener("userLocationChanged", handleLocationChange);
    window.addEventListener("storage", handleLocationChange);
    return () => {
      window.removeEventListener("userLocationChanged", handleLocationChange);
      window.removeEventListener("storage", handleLocationChange);
    };
  }, []);

  // 🔥 Handle postal code → Convert to lat/lng → Save in localStorage
  const handleSearch = async () => {
    try {
      if (!searchParam) {
        alert("Please select a hairstyle before searching!");
        return;
      }

      if (!postalCode.trim()) {
        alert("Please enter a postal code!");
        return;
      }

      // Google Geocode call
      const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${postalCode}&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`;
      const geocodeRes = await fetch(url);
      const geocodeData = await geocodeRes.json();

      if (!geocodeData?.results?.length) {
        ToastService.error("Invalid postal code!");
        return;
      }

      const place = geocodeData.results[0];
      const newLocation = {
        name: place.formatted_address,
        address: place.formatted_address,
        lat: place.geometry.location.lat,
        lng: place.geometry.location.lng,
        placeId: place.place_id,
      };

      // Save to localStorage
      localStorage.setItem("userLocation", JSON.stringify(newLocation));

      // Dispatch event so useEffect re-fetch triggers
      window.dispatchEvent(new Event("userLocationChanged"));

      // ToastService.success("Location updated successfully!");
      navigate(`/userServices?searchParam=${encodeURIComponent(searchParam)}`);
    } catch (error) {
      console.error(error);
      ToastService.error("Unable to fetch location!");
    }
  };

  return (
    <div>
      {/* Hero Section */}

      <div
        className=" bg-cover bg-center"
        style={{ backgroundImage: `url(${heroBg})` }}
      >
        <div className="container">
          <div className="grid grid-cols-12 pt-[207px] pb-[160px] lg:pl-[98px]">
            <div className="col-span-12 lg:col-span-9 text-center xl:text-left flex flex-col gap-6">
              <div className="flex flex-col gap-6 justify-center items-center xl:items-start">
                <h1 className="font-bold xl:text-7xl text-5xl font-playfair  md:max-w-[530px] text-light-brown-c1  tracking-[-1px]">
                  Find the Perfect Hairstylist for Your Crown
                </h1>
                <p className="font-manrope font-normal text-background max-w-[460px] text-light-brown-c1">
                  Discover and book trusted Afro/Black hairstylists across
                  Canada—anytime, anywhere.
                </p>
              </div>

              <div className="bg-background rounded-[60px] p-[25px] xl:pl-[40px] xl:py-[14px] xl:pr-[14px]">
                <div className="flex flex-col xl:flex-row gap-6 items-stretch">
                  {/* Hairstyle Dropdown */}
                  {/* <div className='w-full xl:flex-1 flex flex-col justify-between'>
                                        <p className='font-manrope font-bold xl:text-lg text-base text-brown-A43'>
                                            What hairstyle are you looking for?
                                        </p>
                                        <div className='flex items-center gap-2 border-b border-black-14 pb-2'>
                                            <select
                                                className="focus:border-none focus:outline-none border-none w-full bg-transparent"
                                                value={searchParam}
                                                onChange={(e) => setSearchParam(e.target.value)}
                                            >
                                                <option value="" disabled>
                                                    Box Braids, Cornrows....
                                                </option>
                                                <option value="Braids">Braids</option>
                                                <option value="Bridal Special">Bridal Special</option>
                                                <option value="Cornrows">Cornrows</option>
                                                <option value="Crochet Braids">Crochet Braids</option>
                                                <option value="Hair Straightening (Blowout, Silk Press)">Hair Straightening (Blowout, Silk Press)</option>
                                                <option value="Kids’ Hairstyles">Kids’ Hairstyles</option>
                                                <option value="Locs">Locs</option>
                                                <option value="Natural Hair Care">Natural Hair Care</option>
                                                <option value="Passion Twists">Passion Twists</option>
                                                <option value="Twists">Twists</option>
                                                <option value="Weave">Weave</option>
                                                <option value="Wigs">Wigs</option>
                                                <option value="Make Up">Make Up</option>
                                            </select>
                                        </div>
                                    </div> */}

                  <SearchSelect
                    label="What hairstyle are you looking for?"
                    options={hairstyleOptions}
                    value={searchParam}
                    onChange={setSearchParam}
                    placeholder="Box Braids, Cornrows...."
                  />

                  <div className="w-full xl:flex-1 flex flex-col justify-between">
                    <p className="font-manrope font-bold xl:text-lg text-base text-brown-A43">
                      Where are you located?
                    </p>
                    <div className="flex items-center gap-2 border-b border-black-14 pb-2">
                      <input
                        type="text"
                        value={postalCode}
                        onChange={(e) => setPostalCode(e.target.value)}
                        className="focus:outline-none border-none w-full bg-transparent"
                        placeholder="Enter postal code"
                      />
                      <FiMapPin className="w-4 h-4 text-gray-500" />
                    </div>
                  </div>

                  {/* Search Button */}
                  <div className="w-full xl:w-auto flex items-center">
                    <Button
                      className=" w-full h-full px-8 py-[16px] bg-brown-A43 text-background hover:bg-brown-A43/90 transition-colors"
                      onClick={handleSearch}
                    >
                      <span className="flex items-center gap-2">
                        Search
                        <FiSearch className="w-4 h-4" />
                      </span>
                    </Button>
                  </div>
                </div>
              </div>

              {/* <div className='bg-background rounded-[60px]  p-[25px] xl:pl-[40px] xl:py-[14px] xl:pr-[14px]'>
                                <div className='flex flex-col xl:flex-row gap-6 items-stretch'>
                                    Hairstyle Input Section
                                    <div className='w-full xl:flex-1 flex flex-col justify-between'>
                                        <p className='font-manrope font-bold xl:text-lg text-base text-brown-A43'>What hairstyle are you looking for?</p>
                                        <div className='flex items-center gap-2 border-b border-black-14 pb-2'>
                                            <input
                                                className="focus:border-none focus:outline-none border-none w-full bg-transparent"
                                                type="text"
                                                placeholder='Box Braids, Cornrows....'
                                            />
                                            <FiSearch className='w-4 h-4 text-gray-500' />
                                        </div>
                                    </div>



                                    Location Input Section
                                    <div className='w-full xl:flex-1 flex flex-col justify-between'>
                                        <p className='font-manrope font-bold xl:text-lg text-base text-brown-A43'>Where are you located?</p>
                                        <div className='flex items-center gap-2 border-b border-black-14 pb-2'>
                                            <input
                                                className="focus:border-none focus:outline-none border-none w-full bg-transparent"
                                                type="text"
                                                placeholder='Enter postal code'
                                            />
                                            <FiMapPin className='w-4 h-4 text-gray-500' />
                                        </div>
                                    </div>

                                    Search Button Section
                                    <div className='w-full xl:w-auto flex items-center'>
                                        <Button className=' w-full h-full px-8 py-[16px] bg-brown-A43 text-background hover:bg-brown-A43/90 transition-colors'>
                                            <span className='flex items-center gap-2'>
                                                Search
                                                <FiSearch className='w-4 h-4' />
                                            </span>
                                        </Button>
                                    </div>
                                </div>
                            </div> */}
            </div>
            <div className="col-span-12 md:col-span-3"></div>
          </div>
        </div>
      </div>

      {/* Gallery Section */}
      <div className="bg-gray-245">
        <div className="container">
          <div className="py-20 mt-20 flex flex-col gap-10 ">
            <div className="flex  flex-col justify-center items-center gap-2">
              <h2 className=" sm:text-[40px] text-[22px] lg:text-[45px] font-playfair text-black font-bold">
                Your Hairstylist, Just a Click Away 👩🏾‍🦱
              </h2>
              <p className="sm:text-xl text-[16px] font-normal font-manrope text-gray-55 ">
                Browse trusted Afro and curly hairstylists near you and book
                with confidence.
              </p>
            </div>

            <div className="grid grid-cols-12 gap-4">
              <div className="col-span-12 lg:col-span-4 flex aspect-auto">
                <div className="rounded-t-3xl lg:rounded-l-2xl w-full h-full">
                  <img
                    src={gallery1}
                    alt="gallery"
                    className="w-full h-full object-cover  rounded-t-3xl  lg:rounded-l-3xl"
                  />
                </div>
              </div>
              <div className="col-span-12 lg:col-span-8  grid grid-cols-2 gap-4">
                <div className="aspect-[6/4]">
                  <img
                    src={gallery2}
                    alt="gallery"
                    className="w-full h-full object-cover "
                  />
                </div>
                <div className="aspect-[6/4]">
                  <img
                    src={gallery3}
                    alt="gallery"
                    className="w-full h-full object-cover lg:rounded-tr-3xl"
                  />
                </div>
                <div className="aspect-[6/4]">
                  <img
                    src={gallery4}
                    alt="gallery"
                    className="w-full h-full object-cover rounded-bl-3xl lg:rounded-bl-none"
                  />
                </div>
                <div className="aspect-[6/4] rounded-br-3xl">
                  <img
                    src={gallery5}
                    alt="gallery"
                    className="w-full h-full object-cover rounded-br-3xl"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recommended Hairstylists Section */}
      <div>
        <div className="container">
          <div className="py-20 flex flex-col gap-10 ">
            <div className="flex justify-between gap-2 flex-wrap items-centter">
              <div>
                {" "}
                <p className="font-manrope  text-base font-semibold text-brown-A43 mb-[2px]">
                  NEARBY Hairstylist
                </p>
                <h2 className=" sm:text-[40px] text-[22px] lg:text-[45px] font-playfair text-brown-31 font-bold leading-none mb-4">
                  Recommended Hairstylist
                </h2>
                <p className="font-manrope font-normal text-xl text-gray-55">
                  From braids to locs, find professionals who understand your
                  hair and your style.
                </p>
              </div>

              <div>
                <Link to="/userServices">
                  <div className="text-[25px] text-brown-A43 font-manrope underline font-bold cursor-pointer">
                    View All
                  </div>
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 items-stretch">
              {services.length === 0 ? (
                <p className="text-center font-bold text-lg col-span-full py-6">
                  No nearby services found
                </p>
              ) : (
                services.map((hairstylist) => (
                  <HairstylistCard
                    key={hairstylist._id}
                    image={hairstylist?.servicePhoto?.url}
                    name={hairstylist?.name}
                    busines={hairstylist?.business?.name}
                    location={
                      hairstylist?.business?.businessLocation?.streetAddress
                    }
                    rating={hairstylist?.business?.averageRating}
                    reviewCount={hairstylist?.business?.totalReviews}
                    id={hairstylist._id}
                    price={hairstylist?.price}
                  />
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials Section */}

      <TestimonialSwiper
        testimonials={testimonials}
        title={testimonialTitle}
        description={testimonialDescription}
      />

      {/* Subcribe Section */}

      <div className="">
        <div className="container">
          <div className="py-20">
            <div className="grid   grid-cols-1 lg:grid-cols-2 gap-8 md:gap-14  px-[20px]  md:px-[60px]  2xl:px-[120px]">
              <div className="aspect-[4/3] rounded-3xl">
                <img
                  src={subscribeBg}
                  alt="subscribe"
                  className="w-full h-full object-cover rounded-3xl"
                />
              </div>

              <div className="flex flex-col  justify-center  gap-8  ">
                <div className="flex flex-col gap-3 items-start  text-left ">
                  <h2 className=" sm:text-[40px] text-[22px] lg:text-[45px] font-playfair text-black-14 font-bold leading-none  ">
                    Subscribe to newsletter
                  </h2>
                  <p className="text-base sm:text-lg font-normal font-manrope text-gray-55  lg:text-left leading-relaxed text-left">
                    "Sign up for our newsletter to stay up-to-date on the latest
                    promotions, discounts, and new features releases."
                  </p>
                </div>

                <div className="py-2  px-2  sm:px-4 border border-brown-31 rounded-[45px] flex items-center gap-2">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full h-full bg-transparent border-none outline-none "
                  />
                  <Button className=" px-4 md:px-8 w-auto bg-black text-background hover:bg-brown-31/90 transition-all duration-300 active:scale-95">
                    Subscribe
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
