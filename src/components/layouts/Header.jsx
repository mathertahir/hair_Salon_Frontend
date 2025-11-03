// components/Header.jsx
import React, { useContext, useEffect, useState } from "react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../components/ui/avatar.jsx";
// import { AuthContext } from '@/services/context/AuthContext';
import {
  FiX,
  FiMenu,
  FiUser,
  FiChevronDown,
  FiGlobe,
  FiLogOut,
} from "react-icons/fi";
import { CiLocationOn } from "react-icons/ci";
import { MdLocationOn } from "react-icons/md";
import profile from "../../assets/profile.png";
import logo from "../../assets/logo.png";
import dummyImage from "../../assets/avatar.webp";
import { Link, useLocation } from "react-router-dom";

import GoogleTranslate from "../../components/GoogleTranslate.jsx";

import { ButtonSquare } from "../ui/buttonSquare.jsx";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../services/context/AuthContext";
import { Navigate } from "react-router-dom";
import { handleApiError } from "../../utils/helpers/HelperFunction";
import useAPI from "../../services/baseUrl/useApiHook";
import { toast } from "react-toastify";
import LocationModal from "../LocationModal.jsx";
const Header = ({ onBurgerClick, isSidebarOpen = false }) => {
  // const { user } = useContext(AuthContext);
  const auth = useContext(AuthContext);
  const API = useAPI();
  const navigate = useNavigate();
  const location = useLocation();
  const [language, setLanguage] = useState("en");
  console.log(location.pathname, "Current Location");
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const roleType = auth?.user?.roleType;
  const [isLocationOpen, setIsLocationOpen] = useState(false);
  const [userLocation, setUserLocation] = useState(
    localStorage.getItem("userLocation")
      ? JSON.parse(localStorage.getItem("userLocation"))
      : null
  );

  const apiUrl = roleType === "1" ? "/api/auth/business/logout" : "/api/auth/logout";

  // const getInitials = (firstName, lastName) => {
  //     if (!firstName && !lastName) return 'U';
  //     return `${firstName?.[0] || ''}${lastName?.[0] || ''}`.toUpperCase();
  // };

  const isActive = (path) => location.pathname === path;

  const closeSidebar = () => {
    onBurgerClick();
  };

  const handleSignOut = () => {
    API.delete(apiUrl)
      .then(function () {
        auth?.logout();
        navigate("/");
        toast.success("Signed out successfully");
      })
      .catch(function (error) {
        handleApiError(error);
      });




  };

  const closeProfileMenu = () => {
    setShowProfileMenu(false);
  };



  const token = localStorage.getItem("auth_token");
  const profilePhoto = auth?.user?.profilePhoto?.url || dummyImage;
  // useEffect for profile menu or other logic can go here, but do not set selectedLang here
  const id = 1;


  useEffect(() => {
    if (!userLocation) {
      checkLocationPermission();
    }
  }, []);

  // ✅ Check browser permission for geolocation
  const checkLocationPermission = async () => {
    if (!navigator.permissions) {
      // Fallback: directly try to request
      requestGeolocation();
      return;
    }

    try {
      const result = await navigator.permissions.query({ name: "geolocation" });
      if (result.state === "granted") {
        requestGeolocation();
      } else if (result.state === "prompt") {
        requestGeolocation(); // show browser popup
      } else if (result.state === "denied") {
        setIsLocationOpen(true); // open custom modal if denied
      }

      result.onchange = () => {
        if (result.state === "denied") setIsLocationOpen(true);
      };
    } catch (error) {
      console.error("Permission check failed:", error);
      setIsLocationOpen(true);
    }
  };

  // ✅ Ask for location using browser
  const requestGeolocation = () => {
    if (!navigator.geolocation) {
      setIsLocationOpen(true);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;

        // Reverse geocode using OpenStreetMap
        const res = await fetch(
          `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
        );
        const data = await res.json();

        const detected = {
          name: data?.address?.city || "Unknown",
          address: data?.display_name || "Unknown Location",
          lat: latitude,
          lng: longitude,
        };

        localStorage.setItem("userLocation", JSON.stringify(detected));
        setUserLocation(detected);
      },
      () => {
        // user denied or failed to detect → open modal
        setIsLocationOpen(true);
      }
    );
  };

  // 🟢 Callback when location is updated from modal
  const handleLocationChange = (locationData) => {
    setUserLocation(locationData);
    localStorage.setItem("userLocation", JSON.stringify(locationData));
  };
  return (
    <>
      <div className="bg-white-FD">
        <div className="container">
          <header className="py-[25px]   flex items-center justify-between gap-5   z-50">
            {/* Mobile Menu Button */}

            <div className="flex md:hidden">
              <button
                className="text-2xl text-gray-600 hover:text-gray-900 transition-colors"
                onClick={onBurgerClick}
                aria-label="Toggle Sidebar"
              >
                {isSidebarOpen ? <FiX /> : <FiMenu />}
              </button>
            </div>

            {/* Logo */}

            <div className="flex-1 flex  items-center hidden md:block">


              <Link to="/" className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-brown-31 rounded-lg flex items-center justify-center">
                  <div className="w-6 h-6 bg-black rounded-sm ">
                    <img src={logo} alt="logo" />
                  </div>
                </div>
              </Link>

            </div>

            <button
              onClick={() => setIsLocationOpen(true)}
              className="flex items-center gap-2 text-gray-700 hover:text-brown-A43"
            >


              {userLocation
                ? userLocation.name
                : "Detect your location"}

              <div className="text-brown-A43 ">    <MdLocationOn size={24} /></div>
            </button>

            {/* Right Side - Language Selector and User Menu */}
            <div className="flex items-center space-x-9 w-full justify-end">
              <div className="hidden md:flex items-center  space-x-9">
                <nav className="hidden md:flex items-center space-x-[46px]">
                  <Link
                    to="/"
                    className={`relative text-base font-medium transition-colors pb-2 ${isActive("/") ? "text-foreground" : "text-black"
                      }`}
                  >
                    Home
                    {isActive("/") && (
                      <div className="absolute bottom-0 left-0 w-full h-0.5 bg-foreground active-tab-border"></div>
                    )}
                  </Link>
                  <Link
                    to="/about"
                    className={`relative text-sm font-medium transition-colors pb-2 ${isActive("/about")
                      ? "text-foreground"
                      : "text-black hover:text-foreground"
                      }`}
                  >
                    About Us
                    {isActive("/about") && (
                      <div className="absolute bottom-0 left-0 w-full h-0.5 bg-foreground active-tab-border"></div>
                    )}
                  </Link>

                  <Link
                    to="/userServices"
                    className={`relative text-sm font-medium transition-colors pb-2 ${isActive("/about")
                      ? "text-foreground"
                      : "text-black hover:text-foreground"
                      }`}
                  >
                    Services
                    {isActive("/userServices") && (
                      <div className="absolute bottom-0 left-0 w-full h-0.5 bg-foreground active-tab-border"></div>
                    )}
                  </Link>


                  <Link
                    to="/contact"
                    className={`relative text-sm font-medium transition-colors pb-2 ${isActive("/contact")
                      ? "text-foreground"
                      : "text-black hover:text-foreground"
                      }`}
                  >
                    Contact Us
                    {isActive("/contact") && (
                      <div className="absolute bottom-0 left-0 w-full h-0.5 bg-foreground active-tab-border"></div>
                    )}
                  </Link>
                </nav>

                {/* <Select value={language} onValueChange={setLanguage}>
                                    <SelectTrigger className="w-16 h-8 border-0 bg-transparent hover:bg-gray-50 focus:ring-0">
                                        <div className="flex items-center space-x-1">
                                            <FiGlobe className="w-3 h-3" />
                                            <SelectValue />
                                            <FiChevronDown className="w-3 h-3" />
                                        </div>
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="EN">EN</SelectItem>
                                        <SelectItem value="ES">ES</SelectItem>
                                        <SelectItem value="FR">FR</SelectItem>
                                    </SelectContent>
                                </Select> */}

                <GoogleTranslate />

                <div
                  className={`flex items-center space-x-4 ${token?.length > 0 ? "hidden" : "block"
                    }`}
                >
                  <Link to={"/role/0"}>
                    <ButtonSquare
                      variant="outline"
                      className=" text-base  font-bold font-manrope"
                    >
                      Login
                    </ButtonSquare>
                  </Link>

                  <Link to={"/role"}>
                    <ButtonSquare
                      variant="secondary"
                      className=" text-base  font-bold font-manrope"
                    >
                      Sign Up
                    </ButtonSquare>
                  </Link>
                </div>

                <div
                  className={`flex items-center space-x-4 ${token?.length > 0 ? "block" : "hidden"
                    }  relative`}
                >
                  <div
                    onMouseEnter={() => setShowProfileMenu(!showProfileMenu)}
                  >
                    <img
                      class="w-10 h-10 rounded-full"
                      src={profilePhoto}
                      alt="Rounded avatar"
                    />
                  </div>

                  <div
                    className={`bg-background py-[30px] px-[24px] rounded-[30px] shadow-2xl w-[260px] h-auto absolute top-[50px] right-0 ${showProfileMenu ? "block" : "hidden"
                      }`}
                    onMouseLeave={() => setShowProfileMenu(!showProfileMenu)}
                  >
                    <div className=" flex flex-col gap-[30px]">
                      {/* <Link
                        to={`${Number(roleType) === 1
                          ? "client-bookings"
                          : "stylist-bookings"
                          }`}
                        onClick={closeProfileMenu}
                      >
                        <p className="text-black font-bold font-manrope text-[18px] hover:translate-y-[1px] transition-all duration-300">
                          My Bookings
                        </p>
                      </Link> */}

                      {/* <div
                        className={`${roleType == "0" ? "hidden" : "block"}`}
                      >
                        <Link
                          to={`/salon-detailed-info/${id}`}
                          onClick={closeProfileMenu}
                        >
                          <p className="text-black font-bold font-manrope text-[18px] hover:translate-y-[1px] transition-all duration-300">
                            My Account
                          </p>
                        </Link>
                      </div> */}

                      <div
                        className={`${roleType == "0" ? "hidden" : "block"}`}
                      >
                        <Link
                          to={`/business/profile`}
                          onClick={closeProfileMenu}
                        >
                          <p className="text-black font-bold font-manrope text-[18px] hover:translate-y-[1px] transition-all duration-300">
                            Dashboard
                          </p>
                        </Link>
                      </div>

                      <div
                        className={`${roleType == "0" ? "block" : "hidden"}`}
                      >
                        <Link
                          to={`/user/profile`}
                          onClick={closeProfileMenu}
                        >
                          <p className="text-black font-bold font-manrope text-[18px] hover:translate-y-[1px] transition-all duration-300">
                            Dashboard
                          </p>
                        </Link>
                      </div>

                      <div onClick={closeProfileMenu}>
                        {" "}
                        <p
                          onClick={handleSignOut}
                          className="text-black font-bold font-manrope text-red0 text-[18px] hover:translate-y-[1px] transition-all duration-300  cursor-pointer"
                        >
                          Sign Out
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div
                className={`flex items-center space-x-4 md:hidden ${token?.length > 0 ? "hidden" : "block"
                  }`}
              >
                <Link to={"/role/0"}>
                  <ButtonSquare
                    variant="outline"
                    className=" text-base  font-bold font-manrope"
                  >
                    Login
                  </ButtonSquare>
                </Link>

                <Link to={"/role"}>
                  <ButtonSquare
                    variant="secondary"
                    className=" text-base  font-bold font-manrope"
                  >
                    Sign Up
                  </ButtonSquare>
                </Link>
              </div>

              <div
                className={`flex items-center space-x-4  md:hidden ${token?.length > 0 ? "block" : "hidden"
                  }  relative`}
              >
                <div onMouseEnter={() => setShowProfileMenu(!showProfileMenu)}>
                  <img
                    class="w-10 h-10 rounded-full"
                    src={profilePhoto}
                    alt="Rounded avatar"
                  />
                </div>

                <div
                  className={`bg-background py-[30px] px-[24px] rounded-[30px] shadow-2xl w-[260px] h-auto absolute top-[50px] right-0 ${showProfileMenu ? "block" : "hidden"
                    }`}
                  onMouseLeave={() => setShowProfileMenu(!showProfileMenu)}
                >
                  <div className=" flex flex-col gap-[30px]">
                    {/* <Link to="/stylist-bookings" onClick={closeProfileMenu}>
                      {" "}
                      <p className="text-black font-bold font-manrope text-[18px] hover:translate-y-[1px] transition-all duration-300">
                        My Bookings
                      </p>
                    </Link> */}
                    {/* <div className={`${roleType == "0" ? "hidden" : "block"}`}>
                      <Link
                        to={`/salon-detailed-info/${id}`}
                        onClick={closeProfileMenu}
                      >
                        <p className="text-black font-bold font-manrope text-[18px] hover:translate-y-[1px] transition-all duration-300">
                          My Account
                        </p>
                      </Link>
                    </div> */}

                    <div className={`${roleType == "0" ? "hidden" : "block"}`}>
                      <Link
                        to={`/business/profile`}
                        onClick={closeProfileMenu}
                      >
                        <p className="text-black font-bold font-manrope text-[18px] hover:translate-y-[1px] transition-all duration-300">
                          Dashboard
                        </p>
                      </Link>
                    </div>
                    <div onClick={closeProfileMenu}>
                      {" "}
                      <p
                        onClick={handleSignOut}
                        className="text-black font-bold font-manrope text-red0 text-[18px] hover:translate-y-[1px] transition-all duration-300  cursor-pointer"
                      >
                        Sign Out
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Language Selector */}

              {/* User Profile Menu */}
              {/* <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="relative h-10 w-10 rounded-full p-0 hover:bg-gray-50">
                                <Avatar className="h-10 w-10">
                                    <AvatarImage
                                        src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
                                        alt="User profile"
                                        className="object-cover"
                                    />
                                    <AvatarFallback>
                                        <FiUser className="h-5 w-5" />
                                    </AvatarFallback>
                                </Avatar>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-48" align="end" forceMount>
                            <div className="px-3 py-2">
                                <p className="text-sm font-medium text-gray-900">My Bookings</p>
                            </div>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem asChild>
                                <Link to="/profile" className="flex items-center px-3 py-2 text-sm text-foreground hover:bg-gray-50">
                                    <FiUser className="mr-2 h-4 w-4" />
                                    My Account
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="px-3 py-2 text-sm text-red-600 hover:bg-red-50">
                                Sign Out
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu> */}
            </div>
          </header>
        </div>
      </div>

      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black-050 z-40 md:hidden"
          onClick={closeSidebar}
        />
      )}

      {/* Mobile Sidebar */}
      <aside
        className={`
                fixed top-0 left-0 h-full w-[70%] bg-white-FD shadow-xl transform transition-transform duration-300 ease-in-out z-50 md:hidden
                ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
            `}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-brown-31 rounded-lg flex items-center justify-center">
              <div className="w-6 h-6 bg-black rounded-sm">
                <img src={logo} alt="logo" />
              </div>
            </div>
          </div>
          <button
            onClick={closeSidebar}
            className="p-2 rounded-md hover:bg-gray-100 transition-colors"
          >
            <FiX className="w-5 h-5" />
          </button>
        </div>

        {/* Sidebar Navigation */}
        <nav className="p-6 space-y-4">
          <Link
            to="/"
            onClick={closeSidebar}
            className={`block px-4 py-3 rounded-lg text-sm font-manrope font-medium transition-colors ${isActive("/")
              ? "bg-brown-31 text-background"
              : "text-foreground hover:bg-gray-100"
              }`}
          >
            Home
          </Link>
          <Link
            to="/about"
            onClick={closeSidebar}
            className={`block px-4 py-3 rounded-lg text-sm font-manrope font-medium transition-colors ${isActive("/about")
              ? "bg-brown-31 text-background"
              : "text-foreground hover:bg-gray-100"
              }`}
          >
            About Us
          </Link>

          <Link
            to="/userServices"
            onClick={closeSidebar}
            className={`block px-4 py-3 rounded-lg text-sm font-manrope font-medium transition-colors ${isActive("/userServices")
              ? "bg-brown-31 text-background"
              : "text-foreground hover:bg-gray-100"
              }`}
          >
            Services
          </Link>
          <Link
            to="/contact"
            onClick={closeSidebar}
            className={`block px-4 py-3 rounded-lg text-sm font-manrope font-medium transition-colors ${isActive("/contact")
              ? "bg-brown-31 text-background"
              : "text-foreground hover:bg-gray-100"
              }`}
          >
            Contact Us
          </Link>
        </nav>

        {/* Sidebar Language Selector */}
        <div className="px-6 py-4 border-t border-light-brown-11p">
          <GoogleTranslate closeSidebar={closeSidebar} />
        </div>

        {/* Sidebar User Section */}
        <div className="px-6 py-4 border-t border-light-brown-11p mt-auto"></div>
      </aside>

      <LocationModal
        visible={isLocationOpen}
        onClose={() => setIsLocationOpen(false)}
        onLocationChange={handleLocationChange}
      />
    </>
  );
};

export default Header;
