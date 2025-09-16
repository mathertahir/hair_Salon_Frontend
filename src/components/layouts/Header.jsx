// components/Header.jsx
import React, { useContext, useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '../../components/ui/avatar.jsx';
// import { AuthContext } from '@/services/context/AuthContext';
import { FiX, FiMenu, FiUser, FiChevronDown, FiGlobe, FiLogOut } from 'react-icons/fi';
import logo from '../../assets/logo.png';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '../../components/ui/button.jsx';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '../../components/ui/dropdown-menu.jsx';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '../../components/ui/select.jsx';
import { ButtonSquare } from '../ui/buttonSquare.jsx';

const Header = ({ onBurgerClick, isSidebarOpen = false }) => {
    // const { user } = useContext(AuthContext);
    const location = useLocation();
    const [language, setLanguage] = useState('EN');

    // const getInitials = (firstName, lastName) => {
    //     if (!firstName && !lastName) return 'U';
    //     return `${firstName?.[0] || ''}${lastName?.[0] || ''}`.toUpperCase();
    // };

    const isActive = (path) => location.pathname === path;

    const closeSidebar = () => {
        onBurgerClick();
    };

    return (
        < >

            <div className='bg-white-FD'>
                <div className='container'>
                    <header className="py-[25px]   flex items-center justify-between   z-50">
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


                        {/* Right Side - Language Selector and User Menu */}
                        <div className="flex items-center space-x-9 w-full justify-end">

                            <div className='hidden md:flex items-center  space-x-9'>

                                <nav className="hidden md:flex items-center space-x-[46px]">
                                    <Link
                                        to="/"
                                        className={`relative text-base font-medium transition-colors pb-2 ${isActive('/')
                                            ? 'text-foreground'
                                            : 'text-black'
                                            }`}
                                    >
                                        Home
                                        {isActive('/') && (
                                            <div className="absolute bottom-0 left-0 w-full h-0.5 bg-foreground active-tab-border"></div>
                                        )}
                                    </Link>
                                    <Link
                                        to="/about"
                                        className={`relative text-sm font-medium transition-colors pb-2 ${isActive('/about')
                                            ? 'text-foreground'
                                            : 'text-black hover:text-foreground'
                                            }`}
                                    >
                                        About Us
                                        {isActive('/about') && (
                                            <div className="absolute bottom-0 left-0 w-full h-0.5 bg-foreground active-tab-border"></div>
                                        )}
                                    </Link>
                                    <Link
                                        to="/contact"
                                        className={`relative text-sm font-medium transition-colors pb-2 ${isActive('/contact')
                                            ? 'text-foreground'
                                            : 'text-black hover:text-foreground'
                                            }`}
                                    >
                                        Contact Us
                                        {isActive('/contact') && (
                                            <div className="absolute bottom-0 left-0 w-full h-0.5 bg-foreground active-tab-border"></div>
                                        )}
                                    </Link>
                                </nav>


                                <Select value={language} onValueChange={setLanguage}>
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
                                </Select>
                                <div className='flex items-center space-x-4'>
                                    <ButtonSquare variant="outline" className=" text-base  font-bold font-manrope">
                                        Login
                                    </ButtonSquare>

                                    <ButtonSquare variant="secondary" className=" text-base  font-bold font-manrope">
                                        Sign Up
                                    </ButtonSquare>
                                </div>


                            </div>


                            <div className='flex items-center space-x-4 md:hidden'>
                                <ButtonSquare variant="outline" className=" text-base  font-bold font-manrope">
                                    Login
                                </ButtonSquare>

                                <ButtonSquare variant="secondary" className=" text-base  font-bold font-manrope">
                                    Sign Up
                                </ButtonSquare>
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
                    className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
                    onClick={closeSidebar}
                />
            )}

            {/* Mobile Sidebar */}
            <aside className={`
                fixed top-0 left-0 h-full w-[70%] bg-white-FD shadow-xl transform transition-transform duration-300 ease-in-out z-50 md:hidden
                ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
            `}>
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
                        className={`block px-4 py-3 rounded-lg text-sm font-manrope font-medium transition-colors ${isActive('/')
                            ? 'bg-brown-31 text-background'
                            : 'text-foreground hover:bg-gray-100'
                            }`}
                    >
                        Home
                    </Link>
                    <Link
                        to="/about"
                        onClick={closeSidebar}
                        className={`block px-4 py-3 rounded-lg text-sm font-manrope font-medium transition-colors ${isActive('/about')
                            ? 'bg-brown-31 text-background'
                            : 'text-foreground hover:bg-gray-100'
                            }`}
                    >
                        About Us
                    </Link>
                    <Link
                        to="/contact"
                        onClick={closeSidebar}
                        className={`block px-4 py-3 rounded-lg text-sm font-manrope font-medium transition-colors ${isActive('/contact')
                            ? 'bg-brown-31 text-background'
                            : 'text-foreground hover:bg-gray-100'
                            }`}
                    >
                        Contact Us
                    </Link>
                </nav>

                {/* Sidebar Language Selector */}
                <div className="px-6 py-4 border-t border-light-brown-11p">
                    <Select value={language} onValueChange={setLanguage}>
                        <SelectTrigger className="w-full border-[1px] border-brown-31  text-brown-31">
                            <div className="flex items-center space-x-2">
                                <FiGlobe className="w-4 h-4" />
                                <SelectValue />
                                {/* <FiChevronDown className="w-4 h-4" /> */}
                            </div>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="EN">English</SelectItem>
                            <SelectItem value="ES">Español</SelectItem>
                            <SelectItem value="FR">Français</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                {/* Sidebar User Section */}
                <div className="px-6 py-4 border-t border-light-brown-11p mt-auto">


                    <div className="space-y-2">
                        <button className="flex items-center justify-center w-full px-4 py-3 text-sm font-medium font-manrope text-background  bg-brown-31  rounded-lg transition-colors">
                            <FiLogOut className="mr-3 h-4 w-4" />
                            Sign Out
                        </button>
                    </div>
                </div>
            </aside>
        </>
    );
};

export default Header;