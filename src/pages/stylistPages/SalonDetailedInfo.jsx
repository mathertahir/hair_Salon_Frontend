import React, { useState } from 'react'
import { MdOutlineKeyboardArrowRight, MdOutlineKeyboardArrowDown } from "react-icons/md";
import { ButtonSquare } from '../../components/ui/buttonSquare'
import { Link } from 'react-router-dom'



const SalonDetailedInfo = () => {

    const [activeTab, setActiveTab] = useState(1);
    const [activeAccordion, setActiveAccordion] = useState(null)
    const [activebtn, setActivebtn] = useState(2);

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };
    const toggleTab = (tabIndex) => {
        setActiveTab(activeAccordion === tabIndex ? null : tabIndex)
    }
    const toggleAccordion = (accordionIndex) => {
        setActiveAccordion(activeAccordion === accordionIndex ? null : accordionIndex)
    }

    return (
        <div className='bg-background'>
            <div className='container'>
                <div className='pt-[100px] pb-[200px]'>
                    {/* Tab Navigation */}
                    <div className='flex justify-between bg-brown-A43-o2 rounded-[50px] mb-8'>
                        <button
                            onClick={() => handleTabClick(1)}
                            className={`${activeTab === 1 ? 'text-background' : 'text-black'} font-bold md:text-[18px] text-[12px] font-manrope ${activeTab === 1 ? 'bg-brown-A43' : 'bg-transparent'} rounded-[50px] flex justify-center items-center w-1/2 py-[18px] px-[20px] transition-all duration-300 cursor-pointer`}
                        >
                            Active Booking
                        </button>
                        <button
                            onClick={() => handleTabClick(2)}
                            className={`${activeTab === 2 ? 'text-background' : 'text-brown-black'} font-bold md:text-[18px] text-[12px] font-manrope ${activeTab === 2 ? 'bg-brown-A43' : 'bg-transparent'} rounded-[50px] flex justify-center items-center w-1/2 py-[18px] px-[20px] transition-all duration-300 cursor-pointer`}
                        >
                            Completed Booking
                        </button>
                    </div>

                    {/* Tab Content */}
                    <div className="tab-content">
                        {activeTab === 1 && (
                            // <StylistBookingCards
                            //     bookings={bookings.filter(booking => booking.status === 'Pending')}
                            // />
                            <div className='flex flex-col gap-[20px]'>

                                <div className={`${activeAccordion === 0 ? 'gap-[20px]' : 'gap-[0px]'} flex flex-col shadow-2xl  px-[26px] py-[20px] rounded-[15px]  `} >
                                    <div
                                        className='flex items-center justify-between cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors duration-200'
                                        onClick={() => toggleAccordion(0)}
                                    >
                                        <p className='text-black-black  font-playfair font-bold  sm:text-[30px] text-[20px]'>Personal Info</p>

                                        <div className='text-black-black transition-transform duration-300'>
                                            {activeAccordion === 0 ?
                                                <MdOutlineKeyboardArrowDown size={30} /> :
                                                <MdOutlineKeyboardArrowRight size={30} />
                                            }
                                        </div>
                                    </div>


                                    {/* details Section */}

                                    <div className={`overflow-hidden   transition-all duration-700 ease-in-out ${activeAccordion === 0 ? 'max-h-[2000px] opacity-100 ' : 'max-h-0 opacity-0 '
                                        }`}>


                                        <div className='flex flex-col gap-[50px]'>
                                            <div className='grid grid-cols-1  lg:grid-cols-2   xl:grid-cols-3  md:gap-[104px]  gap-[10px] md:gap-[80px] sm:gap-[60px] xs:gap-[30px] w-full'>
                                                <div className='flex flex items-center gap-[10px]  justify-start text-left      '>
                                                    <p className='sm:text-[25px] text-[12px] sm:font-playfair font-bold text-brown-A43'>Name :</p>

                                                    <div className=' '>
                                                        <p className='md:text-2xl text-[13px] font-manrope font-normal text-gray-55'>Adam Scout</p>
                                                    </div>
                                                </div>

                                                <div className='flex flex items-center gap-[10px]  justify-start text-left      '>
                                                    <p className='sm:text-[25px] text-[12px] sm:font-playfair font-bold text-brown-A43'>Email :</p>

                                                    <div className=' '>
                                                        <p className='md:text-2xl text-[13px] font-manrope font-normal text-gray-55'>adamscout@gmail.com</p>
                                                    </div>
                                                </div>

                                                <div className='flex flex items-center gap-[10px]   lg:justify-end justify-start text-left       '>
                                                    <p className='sm:text-[25px] text-[12px] sm:font-playfair font-bold text-brown-A43'>Phone :</p>

                                                    <div className=' '>
                                                        <p className='md:text-2xl text-[13px] font-manrope font-normal text-gray-55'> +371123456789</p>
                                                    </div>
                                                </div>





                                            </div>

                                            <hr className='border-white-d9 w-full' />


                                            <div className='flex flex-col  gap-[30px] mb-[24px]'>
                                                <p className='sm:text-[30px] text-[12px] sm:font-playfair font-bold text-black-14'>Description</p>

                                                <p className='font-manrope md:text-2xl text-[13px] font-playfair text-gray-55  text-left  md:leading-10 leading-5 '>
                                                    Crownity connects hairstylists (especially braiders) with clients across Canada. Clients can easily find and book stylists, while stylists showcase their work and grow their business. The platform must be modern, mobile-friendly, SEO-optimized, and fully bilingual (French/English).</p>
                                            </div>

                                            <div className='grid sm:grid-cols-2 grid-cols-1 gap-4 w-full'>

                                                <div className='w-full' onMouseEnter={() => setActivebtn(1)}>
                                                    <Link to="/">
                                                        <ButtonSquare className={`w-full bg-transparent  text-brown-A43  py-[32px] px-[110px]  font-extrabold text-[14px] font-manrope ${activebtn === 1 ? 'bg-brown-A43 text-background' : 'bg-brown-A43-o20 text-brown-A43'} hover:bg-brown-A43 hover:text-background`} variant='secondary' >DISCARD</ButtonSquare>
                                                    </Link>
                                                </div>

                                                <div className='w-full' onMouseEnter={() => setActivebtn(2)}>
                                                    <Link to="/">
                                                        <ButtonSquare className={`w-full bg-transparent  text-brown-A43  py-[32px]  px-[110px] font-extrabold text-[14px] font-manrope ${activebtn === 2 ? 'bg-brown-A43 text-background' : 'bg-brown-A43-o20 text-brown-A43'} hover:bg-brown-A43 hover:text-background`} variant='secondary' >Continue</ButtonSquare>
                                                    </Link>
                                                </div>


                                            </div>
                                        </div>

                                    </div>


                                </div>


                                <div className={`${activeTab === 1 ? 'gap-[20px]' : 'gap-[0px]'} flex flex-col shadow-2xl  px-[26px] py-[20px] rounded-[15px]  `} >
                                    <div
                                        className='flex items-center justify-between cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors duration-200'
                                        onClick={() => toggleAccordion(1)}
                                    >
                                        <p className='text-black-black  font-playfair font-bold  sm:text-[30px] text-[20px]'> Salon Details</p>

                                        <div className='text-black-black transition-transform duration-300'>
                                            {activeAccordion === 1 ?
                                                <MdOutlineKeyboardArrowDown size={30} /> :
                                                <MdOutlineKeyboardArrowRight size={30} />
                                            }
                                        </div>
                                    </div>


                                    {/* details Section */}

                                    <div className={`overflow-hidden transition-all duration-700 ease-in-out  ${activeAccordion === 1 ? 'max-h-[2000px] opacity-100   pt-[45px]' : 'max-h-0 opacity-0 pt-0'
                                        }`}>


                                        <div className='flex flex-col gap-[20px]'>
                                            <div className='grid grid-cols-1    lg:grid-cols-3  md:gap-[104px]  gap-[10px] md:gap-[80px] sm:gap-[60px] xs:gap-[30px] md:mb-[111px] mb-[20px]'>
                                                <div className='flex flex-col gap-[20px] items-start justify-start text-left  border-b-[1px] lg:border-b-0   lg:border-r-[1px] border-white-d9'>
                                                    <p className='sm:text-[35px] text-[12px] sm:font-playfair font-bold text-brown-A43'>My Account</p>

                                                    <div className=' '>
                                                        <ul className='flex flex-col gap-[10px] list-disc list-inside'>
                                                            <li className='md:text-2xl text-[13px] font-manrope font-normal text-gray-55'>Haircut</li>
                                                            <li className='md:text-2xl text-[13px] font-manrope font-normal text-gray-55'>Bridal Hair Styling</li>
                                                            <li className='md:text-2xl text-[13px] font-manrope font-normal text-gray-55'>Hair Coloring and highlights</li>



                                                        </ul>
                                                    </div>
                                                </div>


                                                <div className='flex border-white-d9 lg:border-r-[1px] '>
                                                    <div className='flex flex-col gap-[20px] items-start justify-start text-left'>
                                                        <p className='sm:text-[35px] text-[12px] sm:font-playfair font-bold text-brown-A43'>Time</p>

                                                        <div className=' '>
                                                            <ul className='flex flex-col gap-[10px] '>
                                                                <li className='md:text-2xl text-[13px] font-manrope font-normal text-gray-55'>Mon - Sat</li>
                                                                <li className='md:text-2xl text-[13px] font-manrope font-normal text-gray-55'>11:00 AM - 8:00 PM</li>



                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>



                                                <div className="flex  ">
                                                    <div className='flex flex-col gap-[20px] items-start justify-start text-left'>
                                                        <p className='sm:text-[35px] text-[12px] sm:font-playfair font-bold text-brown-A43'>Booking Id</p>

                                                        <div className=''>
                                                            <ul className='flex flex-col gap-[10px] '>

                                                                <li className='md:text-2xl text-[13px] font-playfair font-normal text-gray-55'>789531</li>



                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>

                                            <div className='flex flex-col  gap-[30px] mb-[24px]'>
                                                <p className='sm:text-[35px] text-[12px] sm:font-playfair font-bold text-brown-A43'>Special Request</p>

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
                                                        <ButtonSquare className={`w-full bg-transparent  text-brown-A43  py-[32px]  px-[110px] font-extrabold text-[14px] font-manrope ${activebtn === 2 ? 'bg-brown-A43 text-background' : 'bg-brown-A43-o20 text-brown-A43'} hover:bg-brown-A43 hover:text-background`} variant='secondary' >Continue</ButtonSquare>
                                                    </Link>
                                                </div>


                                            </div>
                                        </div>

                                    </div>


                                </div>




                            </div>

                        )}

                        {activeTab === 2 && (
                            // <StylistBookingCards
                            //     bookings={bookings.filter(booking => booking.status === 'Completed')}

                            // />
                            <></>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SalonDetailedInfo