import React from "react";
import {

  FaTasks,

} from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import { MdOutlinePerson2 } from "react-icons/md";
import { IoMdBusiness } from "react-icons/io";
import { GiSaloon } from "react-icons/gi";

const UserSideBar = ({ open, setOpen }) => {
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
              to="/user/profile"
              onClick={() => setOpen(false)}
              className={`flex items-center p-2 rounded-lg transition-colors ${isActive("/user/profile")
                ? "bg-brown-A43 text-white"
                : "text-gray-900 hover:bg-gray-100"
                }`}
            >
              <MdOutlinePerson2
                className={`mr-3 ${isActive("/user/profile") ? "text-white" : "text-gray-500"
                  }`}
              />
              <span>Profile</span>
            </Link>
          </li>

          <li>
            <Link
              to="/user/bookings"
              onClick={() => setOpen(false)}
              className={`flex items-center p-2 rounded-lg transition-colors ${isActive("/user/bookings") || location.pathname.includes("/user/bookingDetails")
                ? "bg-brown-A43 text-white"
                : "text-gray-900 hover:bg-gray-100"
                }`}
            >
              <FaTasks
                className={`mr-3 ${isActive("/user/bookings") || location.pathname.includes("/user/bookingDetails")
                  ? "text-white"
                  : "text-gray-500"
                  }`}
              />
              <span>Bookings</span>
            </Link>
          </li>

          {/* <li>
            <Link
              to="/business/services"
              onClick={() => setOpen(false)}
              className={`flex items-center p-2 rounded-lg transition-colors ${isActive("/business/services") || isActive("/business/viewService/:id?")
                ? "bg-brown-A43 text-white"
                : "text-gray-900 hover:bg-gray-100"
                }`}
            >
              <FaBoxOpen
                className={`mr-3 ${isActive("/business/services")
                  ? "text-white"
                  : "text-gray-500"
                  }`}
              />
              <span>Services</span>
            </Link>
          </li> */}









          {/* <li>
            <Link
              to="/business/viewService/:id?"
              onClick={() => setOpen(false)}
              className={`flex items-center p-2 rounded-lg transition-colors ${isActive("/business/viewService/:id?")
                ? "bg-brown-A43 text-white"
                : "text-gray-900 hover:bg-gray-100"
                }`}
            >
              <FaUsers
                className={`mr-3 ${isActive("/business/viewService/:id?")
                  ? "text-white"
                  : "text-gray-500"
                  }`}
              />
              <span>Subscription</span>
            </Link>
          </li> */}
        </ul>
      </div>
    </aside>
  )
}

export default UserSideBar