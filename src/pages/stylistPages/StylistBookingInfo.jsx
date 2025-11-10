import React, { useState } from 'react'
import { MdOutlineKeyboardArrowRight, MdOutlineKeyboardArrowDown } from "react-icons/md";

import { ButtonSquare } from '../../components/ui/buttonSquare'
import { Link } from 'react-router-dom'
import userCover from '../../assets/userCover.png'


const StylistBookingInfo = () => {
    const [activeTab, setActiveTab] = useState(null)
    const [activebtn, setActivebtn] = useState(2);

    const toggleTab = (tabIndex) => {
        setActiveTab(activeTab === tabIndex ? null : tabIndex)
    }

    return (
        <div className='bg-background'>
            <div className='container'>
                <div className='py-20 flex flex-col gap-10 '>

                    <div className='py-[45px] md:px-[40px] bg-background rounded-[10px]'>
                        <div className='flex flex-col gap-[20px]'>


                            <div className='w-full '>
                                <img src={userCover} alt="userCover" className='w-full h-full object-cover  rounded-[20px]' />
                            </div>

                            <div className={`${activeTab === 0 ? 'gap-[20px]' : 'gap-[0px]'} flex flex-col shadow-2xl  px-[26px] py-[20px] rounded-[15px]  `} >
                                <div
                                    className='flex items-center justify-between cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors duration-200'
                                    onClick={() => toggleTab(0)}
                                >
                                    <p className='text-black-black  font-playfair font-bold  sm:text-[30px] text-[20px]'>User Details</p>

                                    <div className='text-black-black transition-transform duration-300'>
                                        {activeTab === 0 ?
                                            <MdOutlineKeyboardArrowDown size={30} /> :
                                            <MdOutlineKeyboardArrowRight size={30} />
                                        }
                                    </div>
                                </div>


                                {/* details Section */}

                                <div className={`overflow-hidden   transition-all duration-700 ease-in-out ${activeTab === 0 ? 'max-h-[2000px] opacity-100 ' : 'max-h-0 opacity-0 '
                                    }`}>
                                    <div className='flex flex-col md:gap-[20px] gap-[10px] md:mb-[51px] mb-[20px] '>

                                        <div className='flex sm:flex-row flex-col justify-between items-center'>
                                            <div>
                                                <p className=' sm:text-[35px] text-[20px] font-playfair font-bold text-black-14'>Adam Scout</p>
                                            </div>

                                        </div>



                                    </div>





                                    <div className='grid grid-cols-1    lg:grid-cols-2  md:gap-[104px]  gap-[10px] md:gap-[80px] sm:gap-[60px] xs:gap-[30px] md:mb-[111px] mb-[20px]'>
                                        <div className='flex flex-col gap-[20px] items-start justify-start text-left  border-b-[1px] lg:border-b-0   lg:border-r-[1px] border-white-d9'>
                                            <p className='sm:text-[35px] text-[12x] sm:font-playfair font-bold text-brown-A43'>Email</p>

                                            <div className=' '>
                                                <p className='md:text-2xl text-[13px] font-manrope font-normal text-gray-55'>adamscout@gmail.com</p>
                                            </div>
                                        </div>


                                        <div className='flex border-white-d9  border-r-[1px] '>
                                            <div className='flex flex-col gap-[20px] items-start justify-start text-left'>
                                                <p className='sm:text-[35px] text-[12x] sm:font-playfair font-bold text-brown-A43'>Address</p>

                                                <div className=' '>
                                                    <p className='md:text-2xl text-[13px] font-manrope font-normal text-gray-55'>123 Main St, Anytown, USA</p>
                                                </div>
                                            </div>
                                        </div>




                                    </div>
                                </div>


                            </div>


                            <div className={`${activeTab === 1 ? 'gap-[20px]' : 'gap-[0px]'} flex flex-col shadow-2xl  px-[26px] py-[20px] rounded-[15px]  `} >
                                <div
                                    className='flex items-center justify-between cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors duration-200'
                                    onClick={() => toggleTab(1)}
                                >
                                    <p className='text-black-black  font-playfair font-bold  sm:text-[30px] text-[20px]'> Booking Details</p>

                                    <div className='text-black-black transition-transform duration-300'>
                                        {activeTab === 1 ?
                                            <MdOutlineKeyboardArrowDown size={30} /> :
                                            <MdOutlineKeyboardArrowRight size={30} />
                                        }
                                    </div>
                                </div>


                                {/* details Section */}

                                <div className={`overflow-hidden transition-all duration-700 ease-in-out  ${activeTab === 1 ? 'max-h-[2000px] opacity-100   pt-[45px]' : 'max-h-0 opacity-0 pt-0'
                                    }`}>


                                    <div className='flex flex-col gap-[20px]'>
                                        <div className='grid grid-cols-1    lg:grid-cols-3  md:gap-[104px]  gap-[10px] md:gap-[80px] sm:gap-[60px] xs:gap-[30px] md:mb-[111px] mb-[20px]'>
                                            <div className='flex flex-col gap-[20px] items-start justify-start text-left  border-b-[1px] lg:border-b-0   lg:border-r-[1px] border-white-d9'>
                                                <p className='sm:text-[35px] text-[12x] sm:font-playfair font-bold text-brown-A43'>Book Services</p>

                                                <div className=' '>
                                                    <ul className='flex flex-col gap-[10px] list-disc list-inside'>
                                                        <li className='md:text-2xl text-[13px] font-manrope font-normal text-gray-55'>Haircut</li>
                                                        <li className='md:text-2xl text-[13px] font-manrope font-normal text-gray-55'>Bridal Hair Styling</li>
                                                        <li className='md:text-2xl text-[13px] font-manrope font-normal text-black-14  gray-55'>Hair Coloring and highlights</li>



                                                    </ul>
                                                </div>
                                            </div>


                                            <div className='flex border-white-d9 lg:border-r-[1px] '>
                                                <div className='flex flex-col gap-[20px] items-start justify-start text-left'>
                                                    <p className='sm:text-[35px] text-[12x] sm:font-playfair font-bold text-brown-A43'>Time</p>

                                                    <div className=' '>
                                                        <ul className='flex flex-col gap-[10px] '>
                                                            <li className='md:text-2xl text-[13px] font-manrope font-normal text-gray-55'>Mon - Sat</li>
                                                            <li className='md:text-2xl text-[13px] font-manrope font-normal text-gray-55'>11:00 AM - 8:00 PM`</li>



                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>



                                            <div className="flex  ">
                                                <div className='flex flex-col gap-[20px] items-start justify-start text-left'>
                                                    <p className='sm:text-[35px] text-[12x] sm:font-playfair font-bold text-brown-A43'>Booking Id</p>

                                                    <div className=''>
                                                        <ul className='flex flex-col gap-[10px] '>

                                                            <li className='md:text-2xl text-[13px] font-playfair font-normal text-gray-55'>789531`</li>



                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>

                                        <div className='flex flex-col  gap-[30px] mb-[24px]'>
                                            <p className='sm:text-[35px] text-[12x] sm:font-playfair font-bold text-brown-A43'>Special Request</p>

                                            <p className='font-manrope md:text-2xl text-[13px] font-playfair text-gray-55  text-left  md:leading-10 leading-5 '>
                                                Please be on time and bring all the accessories that make my hairstyle perfect, with or
                                                without them. Also, make sure to bring the original color for my hair..</p>
                                        </div>

                                        <div className='grid sm:grid-cols-2 grid-cols-1 gap-4 w-full'>

                                            <div className='w-full' onMouseEnter={() => setActivebtn(1)}>
                                                <Link to="/">
                                                    <ButtonSquare className={`w-full bg-transparent  text-brown-A43  py-[32px] px-[110px]  font-extrabold text-[14px] font-manrope ${activebtn === 1 ? 'bg-brown-A43 text-background' : 'bg-brown-A43-o20 text-brown-A43'} hover:bg-brown-A43 hover:text-background`} variant='secondary' >DISCARD</ButtonSquare>
                                                </Link>
                                            </div>

                                            <div className='w-full' onMouseEnter={() => setActivebtn(2)}>
                                                <Link to="/">
                                                    <ButtonSquare className={`w-full bg-transparent  text-brown-A43  py-[32px]  px-[110px] font-extrabold text-[14px] font- ${activebtn === 2 ? 'bg-brown-A43 text-background' : 'bg-brown-A43-o20 text-brown-A43'} hover:bg-brown-A43 hover:text-background`} variant='secondary' >Continue</ButtonSquare>
                                                </Link>
                                            </div>


                                        </div>
                                    </div>

                                </div>


                            </div>




                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default StylistBookingInfo