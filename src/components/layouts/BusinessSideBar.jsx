import React from "react";
import {
  FaTachometerAlt,
  FaTasks,
  FaInbox,
  FaUsers,
  FaBoxOpen,
  FaSignInAlt,
  FaUserPlus,
} from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";

const BusinessSideBar = ({ open, setOpen }) => {
  const location = useLocation(); // ✅ Get current route path

  const isActive = (path) => location.pathname === path;

  return (
    <aside
      className={`fixed top-0 left-0 z-40 w-64 h-screen pt-16 transition-transform ${open ? "translate-x-0" : "-translate-x-full"
        } sm:translate-x-0 bg-gray-50 border-r border-gray-200`}
      aria-label="Sidebar"
    >
      <div className="h-full px-3 py-4 overflow-y-auto">
        <ul className="space-y-2 font-medium">
          <li>
            <Link
              to="/business/profile"
              onClick={() => setOpen(false)}
              className={`flex items-center p-2 rounded-lg transition-colors ${isActive("/business/profile")
                ? "bg-brown-A43 text-white"
                : "text-gray-900 hover:bg-gray-100"
                }`}
            >
              <FaTachometerAlt
                className={`mr-3 ${isActive("/business/profile") ? "text-white" : "text-gray-500"
                  }`}
              />
              <span>Profile</span>
            </Link>
          </li>

          <li>
            <Link
              to="/business/businessProfile"
              onClick={() => setOpen(false)}
              className={`flex items-center p-2 rounded-lg transition-colors ${isActive("/business/businessProfile") || isActive("/business/businessProfileEdit")
                ? "bg-brown-A43 text-white"
                : "text-gray-900 hover:bg-gray-100"
                }`}
            >
              <FaUsers
                className={`mr-3 ${isActive("/business/businessProfile") || isActive("/business/businessProfileEdit")
                  ? "text-white"
                  : "text-gray-500"
                  }`}
              />
              <span>Business Profile</span>
            </Link>
          </li>


          <li>
            <Link
              to="/business/products"
              onClick={() => setOpen(false)}
              className={`flex items-center p-2 rounded-lg transition-colors ${isActive("/business/products")
                ? "bg-brown-A43 text-white"
                : "text-gray-900 hover:bg-gray-100"
                }`}
            >
              <FaBoxOpen
                className={`mr-3 ${isActive("/business/products")
                  ? "text-white"
                  : "text-gray-500"
                  }`}
              />
              <span>Services</span>
            </Link>
          </li>

          <li>
            <Link
              to="/business/bookings"
              onClick={() => setOpen(false)}
              className={`flex items-center p-2 rounded-lg transition-colors ${isActive("/business/bookings")
                ? "bg-brown-A43 text-white"
                : "text-gray-900 hover:bg-gray-100"
                }`}
            >
              <FaTasks
                className={`mr-3 ${isActive("/business/bookings")
                  ? "text-white"
                  : "text-gray-500"
                  }`}
              />
              <span>Bookings</span>
            </Link>
          </li>

          <li>
            <Link
              to="/business/subscription"
              onClick={() => setOpen(false)}
              className={`flex items-center p-2 rounded-lg transition-colors ${isActive("/business/subscription")
                ? "bg-brown-A43 text-white"
                : "text-gray-900 hover:bg-gray-100"
                }`}
            >
              <FaUsers
                className={`mr-3 ${isActive("/business/subscription")
                  ? "text-white"
                  : "text-gray-500"
                  }`}
              />
              <span>Subscription</span>
            </Link>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default BusinessSideBar;
