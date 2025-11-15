import React from 'react'
import footerLogo from '../../assets/footerlogo.png'
import { FiFacebook, FiTwitter, FiLinkedin, FiInstagram } from 'react-icons/fi'
import { Link } from 'react-router-dom'

const Footer = () => {
    return (
        <div className='flex flex-col '>
            <div className='bg-foreground'>
                <div className='container'>
                    <div className='pt-[52px] pb-[131px] flex flex-col gap-[52px] '>

                        <div className='flex flex-col gap-4 xs:gap-0  xs:flex-row justify-between items-center mx-0 pb-[37px] border-b border-brown-97'>
                            <div className='h-[83px] w-[83px] bg-background rounded-full flex items-center justify-center '>
                                <img src={footerLogo} alt="logo" />
                            </div>

                            <div className='flex    space-x-2  items-center'>
                                <div className='w-10 h-10 border-[1px] border-brown-97  rounded-[2px] flex justify-center items-center items-background text-background font-bold'>
                                    <FiFacebook />
                                </div>

                                <div className='w-10 h-10 border-[1px] border-brown-97 rounded-[2px]  flex justify-center items-center items-background text-background font-bold'>
                                    <FiTwitter />
                                </div>
                                <div className='w-10 h-10 border-[1px] border-brown-97  rounded-[2px] flex justify-center items-center items-background text-background font-bold'>
                                    <FiLinkedin />
                                </div>
                                <div className='w-10 h-10 border-[1px] border-brown-97  rounded-[2px] flex justify-center items-center items-background text-background font-bold'>
                                    <FiInstagram />
                                </div>


                            </div>
                        </div>

                        <div className='grid grid-cols-12  gap-y-6 md:gap-y-0 '>
                            <div className=' col-span-12 xs:col-span-6   md:col-span-4 flex flex-col gap-[21px] justify-center items-center xs:items-start xs:justify-start '>
                                <h3 className='text-background font-bold xs:text-2xl text-xl font-bold font-playfair'>About Us</h3>

                                <div className='flex flex-col gap-[10px]  items-center justify-center    xs:items-start xs:justify-start '>
                                    <Link to="/" className='text-background  xs:text-base text-sm font-medium font-manrope'>Home</Link>
                                    <Link to="/about" className='text-background xs:text-base text-sm font-medium font-manrope'>About Us</Link>
                                    <Link to="/contact" className='text-background xs:text-base text-sm font-medium font-manrope'>Contact Us</Link>
                                    <Link to="/blogs" className='text-background xs:text-base text-sm font-medium font-manrope'>Blog</Link>
                                    <Link to="/privacy" className='text-background xs:text-base text-sm font-medium font-manrope'>Privacy Policy</Link>
                                </div>
                            </div>
                            <div className='col-span-12 xs:col-span-6        md:col-span-3 flex flex-col gap-[21px] justify-center items-center xs:items-start xs:justify-start'>

                                <h3 className='text-background font-bold xs:text-2xl text-xl font-bold font-playfair'>Utility Pages</h3>

                                <div className='flex flex-col gap-[10px] justify-center items-center xs:items-start xs:justify-start '>
                                    <Link to="/privacy" className='text-background xs:text-base text-sm font-medium font-manrope'>Privacy Policy</Link>
                                    <Link to="/privacy" className='text-background xs:text-base text-sm font-medium font-manrope'>Terms of Use</Link>

                                </div>
                            </div>
                            <div className="col-span-12 xs:col-span-12       md:col-span-5 flex flex-col gap-6 justify-center items-center xs:items-start xs:justify-start">
                                <h3 className="text-background font-bold xs:text-2xl text-xl font-playfair">Keep in Touch</h3>

                                <div className="grid grid-cols-12 gap-y-3">
                                    {/* Address */}
                                    <div className="col-span-3 text-sm xs:text-base   font-bold text-background font-manrope flex  items-start">Address :</div>
                                    <div className="col-span-9 text-xs xs:text-base  font-medium text-background font-manrope flex  items-center">
                                        Mariendalsvej 50D 2 2000 Frederiksberg
                                    </div>

                                    {/* Mail */}
                                    <div className="col-span-3 text-sm xs:text-base  font-bold text-background font-manrope flex  items-start">Mail :</div>
                                    <div className="col-span-9 text-sm xs:text-base  font-medium text-background font-manrope flex  items-start">
                                        support@servicemarket.com
                                    </div>

                                    {/* Phone */}
                                    <div className="col-span-3 text-sm xs:text-base  font-bold text-background font-manrope flex  items-start">Phone :</div>
                                    <div className="col-span-9 text-sm xs:text-base  font-medium text-background font-manrope flex  items-start">
                                        (+45) 33 12 34 56
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>

                </div>
            </div>
            <div className='bg-black'>
                <div className='container'>
                    <div className='flex items-center justify-center py-[20px]'>
                        <p className='text-white text-sm font-medium font-manrope'>© 2023, ServiceMarket.dk | All rights reserved.</p>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Footer