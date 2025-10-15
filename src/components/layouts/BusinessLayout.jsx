import React, { useState, useRef, useEffect } from "react";
import BusinessSideBar from "./BusinessSideBar";
import { Link, Outlet } from "react-router-dom";
import { FiMenu } from "react-icons/fi";
import logo from "../../assets/logo.png";
import { FaHome } from "react-icons/fa";
import { TiArrowBackOutline } from "react-icons/ti";

const BusinessLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // ✅ Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 ">
      {/* 🔹 Top Navbar */}
      <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200  flex justify-between items-center px-4 py-3">
        {/* Left side */}
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-gray-600 dark:text-gray-300 hover:text-gray-900 sm:hidden"
          >
            <FiMenu className="w-6 h-6" />
          </button>
          <Link to="/" className="flex items-center">
            <img src={logo} className="h-10 mr-2 rounded-full" />
            <span className="text-lg font-semibold ">Crowninty</span>
            <div className="text-brown-A43">
              <TiArrowBackOutline
                size={24}
              />
            </div>

          </Link>
        </div>

        {/* Right side (avatar dropdown) */}

        {/* <div className="flex items-center space-x-3" ref={dropdownRef}>
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            type="button"
            className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 "
          >
            <span className="sr-only">Open user menu</span>
            <img
              className="w-8 h-8 rounded-full"
              src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
              alt="User avatar"
            />
          </button>

       
          {dropdownOpen && (
            <div className="absolute right-4 top-14 z-50 my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-sm shadow-lg  w-48">
              <div className="px-4 py-3">
                <p className="text-sm text-gray-900 ">Neil Sims</p>
                <p className="text-sm font-medium text-gray-500 truncate ">
                  neil.sims@flowbite.com
                </p>
              </div>
              <ul className="py-1">
                <li>
                  <a
                    href="/"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100  "
                  >
                    Home
                  </a>
                </li>

                <li>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100  "
                  >
                    Sign out
                  </a>
                </li>
              </ul>
            </div>
          )}
        </div> */}

      </nav>

      {/* 🔹 Sidebar */}
      <BusinessSideBar open={sidebarOpen} setOpen={setSidebarOpen} />

      {/* 🔹 Main Content */}
      <main className="pt-16 sm:ml-64 transition-all">
        <div className="p-4 border-2 border-dashed border-gray-200  rounded-lg m-4">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default BusinessLayout;
