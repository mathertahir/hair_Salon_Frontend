import React, { useContext } from 'react';
import logo from '@/assets/logo.svg'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '@/services/context/AuthContext';
import { handleApiError } from '@/utils/helpers/HelperFunction';
import dashboard from '@/assets/recipe-icon.svg'
import mealPlanner from '@/assets/meal-planner.svg'
import favorites from '@/assets/favorites-icon.svg'
import settings from '@/assets/settings-icon.svg'
import logout from '@/assets/logout.svg'
import useAPI from '@/services/baseUrl/UseApiHook';
import { IoMdClose } from 'react-icons/io';


const Sidebar = ({ isOpen, onClose }) => {
    const location = useLocation();
    const isActive = (path) => location.pathname === path;
    const auth = useContext(AuthContext);
    const navigate = useNavigate();
    const API = useAPI()
    const handleLogout = () => {
        API.delete("/auth/logout")
            .then(function () {
                auth?.logout();
                navigate("/login");

            })
            .catch(function (error) {
                handleApiError(error)
            });
    };

    return (
        <aside
            className={`w-[60%] md:w-[19%] h-full fixed flex flex-col bg-[#FAF8F6] text-primary-foreground border-r border-[#EAEAEA] z-50 transition-transform duration-300 
            ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}
        >  <div className="p-4 text-center text-primary-foreground mb-5 hidden md:block">
                <img src={logo} alt="logo" />
            </div>
            <div onClick={onClose} className="p-4 text-primary-foreground mb-5 block md:hidden">
                <IoMdClose className='text-2xl text-foreground' />
            </div>
            <ul className="flex-grow">
                <li onClick={onClose} className={`px-6 py-4 font-medium transition-colors cursor-pointer text-foreground mx-2 mb-4 rounded-xl ${isActive("/dashboard") ? "bg-secondary" : "hover:bg-secondary"
                    }`}>
                    <Link className="flex items-center gap-5" to="/dashboard">
                        <img src={dashboard} alt="dashboard" /> My Recipes
                    </Link>
                </li>
                <li onClick={onClose} className={`px-6 py-4 font-medium transition-colors cursor-pointer text-foreground mx-2 mb-4 rounded-xl ${isActive("/meal-plan") ? "bg-secondary" : "hover:bg-secondary"
                    }`}>
                    <Link className="flex items-center gap-5" to="/meal-plan">
                        <img src={mealPlanner} alt="meal-planner" /> Meal Planner
                    </Link>
                </li>
                <li onClick={onClose} className={`px-6 py-4 font-medium transition-colors cursor-pointer text-foreground mx-2 mb-4 rounded-xl ${isActive("/favorites") ? "bg-secondary" : "hover:bg-secondary"
                    }`}>
                    <Link className="flex items-center gap-5" to="/favorites">
                        <img src={favorites} alt="favorites" /> Favorites
                    </Link>
                </li>
                <li onClick={onClose} className={`px-6 py-4 font-medium transition-colors cursor-pointer text-foreground mx-2 mb-4 rounded-xl ${isActive("/settings") ? "bg-secondary" : "hover:bg-secondary"
                    }`}>
                    <Link className="flex items-center gap-5" to="/settings">
                        <img src={settings} alt="settings" /> Settings
                    </Link>
                </li>

            </ul>
            <div onClick={handleLogout} className="px-6 py-4 flex items-center gap-5 cursor-pointer font-medium text-foreground">
                <img src={logout} alt="logout" /> Logout

            </div>
        </aside>
    );
};

export default Sidebar;
