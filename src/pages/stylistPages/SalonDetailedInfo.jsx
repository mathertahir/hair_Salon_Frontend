import React, { useState } from 'react'
import { MdOutlineKeyboardArrowRight, MdOutlineKeyboardArrowDown } from "react-icons/md";
import { ButtonSquare } from '../../components/ui/buttonSquare'

import { Link } from 'react-router-dom'
import verified from "../../assets/verificationDocument.webp"
import gallery1 from '../../assets/HG1.webp'
import gallery2 from '../../assets/HG2.webp'
import gallery3 from '../../assets/HG3.webp'
import gallery4 from '../../assets/HG4.webp'

import GoBack from '../../components/GoBack'




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
                <div className=' py-[60px] sm:pt-[100px] sm:pb-[200px] flex flex-col gap-10 '>



                    {/* Tab Navigation */}
                    <div><GoBack /></div>

                    <div>
                        <div className='flex justify-between bg-brown-A43-o2 rounded-[50px] mb-8'>
                            <button
                                onClick={() => handleTabClick(1)}
                                className={`${activeTab === 1 ? 'text-background' : 'text-black'} font-bold md:text-[18px] text-[12px] font-manrope ${activeTab === 1 ? 'bg-brown-A43' : 'bg-transparent'} rounded-[50px] flex justify-center items-center w-1/2 py-[18px] px-[20px] transition-all duration-300 cursor-pointer`}
                            >
                                My Account
                            </button>
                            <button
                                onClick={() => handleTabClick(2)}
                                className={`${activeTab === 2 ? 'text-background' : 'text-brown-black'} font-bold md:text-[18px] text-[12px] font-manrope ${activeTab === 2 ? 'bg-brown-A43' : 'bg-transparent'} rounded-[50px] flex justify-center items-center w-1/2 py-[18px] px-[20px] transition-all duration-300 cursor-pointer`}
                            >
                                Subscriptions
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


                                    <div className={`${activeAccordion === 1 ? 'gap-[20px]' : 'gap-[0px]'} flex flex-col shadow-2xl  px-[26px] py-[20px] rounded-[15px]  `} >
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
                                                        <p className='sm:text-[35px] text-[12px] sm:font-playfair font-bold text-brown-A43'>Verification Document</p>

                                                        <div className='flex gap-3 items-center flex-wrap'>

                                                            <div className='w-[100px] h-[100px] relative rounded-lg'>
                                                                <img src={verified} alt='' className='w-full h-full rounded-lg' ></img>
                                                                <div className='absolute top-[3px] right-[5px]'>
                                                                    <span class=" text-background text-xs font-medium me-2 px-2.5 py-0.5 rounded-full bg-green-900 ">Verified</span>
                                                                </div>

                                                            </div>

                                                        </div>
                                                    </div>


                                                    <div className='flex border-white-d9 lg:border-r-[1px] '>
                                                        <div className='flex flex-col gap-[20px] items-start justify-start text-left'>
                                                            <p className='sm:text-[35px] text-[12px] sm:font-playfair font-bold text-brown-A43'>ID</p>

                                                            <div className='flex gap-3 items-center flex-wrap'>

                                                                <div className='w-[100px] h-[100px] relative rounded-lg'>
                                                                    <img src={verified} alt='' className='w-full h-full rounded-lg' ></img>
                                                                    <div className='absolute top-[3px] right-[5px]'>
                                                                        <span class=" text-background text-xs font-medium me-2 px-2.5 py-0.5 rounded-full bg-green-900 ">Verified</span>
                                                                    </div>

                                                                </div>
                                                                <div className='w-[100px] h-[100px] relative rounded-lg'>
                                                                    <img src={verified} alt='' className='w-full h-full rounded-lg' ></img>
                                                                    <div className='absolute top-[3px] right-[5px]'>
                                                                        <span class=" text-background text-xs font-medium me-2 px-2.5 py-0.5 rounded-full bg-green-900 ">Verified</span>
                                                                    </div>

                                                                </div>

                                                            </div>
                                                        </div>
                                                    </div>



                                                    <div className="flex  ">
                                                        <div className='flex flex-col gap-[20px] items-start justify-start text-left'>
                                                            <p className='sm:text-[35px] text-[12px] sm:font-playfair font-bold text-brown-A43'>Saloon Images</p>

                                                            <div className='flex gap-3 items-center flex-wrap'>

                                                                <div className='w-[100px] h-[100px] relative rounded-lg'>
                                                                    <img src={gallery1} alt='' className='w-full h-full rounded-lg' ></img>


                                                                </div>
                                                                <div className='w-[100px] h-[100px] relative rounded-lg'>
                                                                    <img src={gallery2} alt='' className='w-full h-full rounded-lg' ></img>


                                                                </div>

                                                                <div className='w-[100px] h-[100px] relative rounded-lg'>
                                                                    <img src={gallery3} alt='' className='w-full h-full rounded-lg' ></img>


                                                                </div>

                                                                <div className='w-[100px] h-[100px] relative rounded-lg'>
                                                                    <img src={gallery4} alt='' className='w-full h-full rounded-lg' ></img>


                                                                </div>

                                                            </div>
                                                        </div>
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
                                <>
                                    <div className=' '>
                                        <div className='w-full  '>
                                            <div className='flex flex-col gap-6 h-full'>

                                                <div className='flex    flex-col  xs:flex-row   justify-between xs:items-center gap-2 flex-wrap'>
                                                    <div className='flex flex-col gap-6'>
                                                        <h1 className='md:text-[25px] text-[14px]   font-bold text-black-14 font-manrope'>Subscription Status</h1>

                                                    </div>
                                                    <p className='text-[14px] md:text-[20px] font-medium font-manrope text-brown-A43'>Active</p>
                                                </div>

                                                <div className='flex flex-col  xs:flex-row  justify-between xs:items-center gap-2 flex-wrap'>
                                                    <div className='flex flex-col gap-6'>
                                                        <h1 className='md:text-[25px] text-[14px]   font-bold text-black-14 font-manrope'>Subscription Start Date </h1>

                                                    </div>
                                                    <p className='text-[14px] md:text-[20px] font-medium font-manrope text-brown-A43'>08 September 2024</p>
                                                </div>

                                                <div className='flex  flex-col  xs:flex-row justify-between xs:items-center gap-2 flex-wrap'>
                                                    <div className='flex flex-col gap-6'>
                                                        <h1 className='md:text-[25px] text-[14px]   font-bold text-black-14 font-manrope'>Subscription Expiry Date </h1>

                                                    </div>
                                                    <p className='text-[14px] md:text-[20px] font-medium font-manrope text-brown-A43'>08 October 2024</p>
                                                </div>
                                                <div className='flex flex-col  xs:flex-row  justify-between xs:items-center gap-2 flex-wrap'>
                                                    <div className='flex flex-col gap-6'>
                                                        <h1 className='md:text-[25px] text-[14px]   font-bold text-black-14 font-manrope'>Subscription Type</h1>

                                                    </div>
                                                    <p className='text-[14px] md:text-[20px] font-medium font-manrope text-brown-A43'>Premium($49/month)</p>
                                                </div>

                                                <div className='flex justify-between items-center'>
                                                    <div className='flex flex-col gap-6'>
                                                        <h1 className='md:text-[35px] text-[20px]   font-bold text-brown-A43 font-manrope'>Payment Card Info:</h1>

                                                    </div>
                                                    {/* <p className='text-[20px] font-bold font-manrope text-green-800'>Premium</p> */}
                                                </div>

                                                <div className='flex flex-col  xs:flex-row  justify-between xs:items-center gap-2 flex-wrap'>
                                                    <div className='flex flex-col gap-6'>
                                                        <h1 className='md:text-[25px] text-[14px]   font-bold text-black-14 font-manrope'>CardBrand</h1>

                                                    </div>

                                                    <p className='text-[14px] md:text-[20px] font-medium font-manrope text-brown-A43 flex items-center'>
                                                        {/* <div className='w-[120px] h-[50px]'>
                                                            <img src={mastercard} className='object-fit w-full h-full'></img>
                                                        </div> */}
                                                        <span className='ml-2'>MasterCard</span>
                                                    </p>
                                                </div>
                                                <div className='flex flex-col  xs:flex-row  justify-between xs:items-center gap-2 flex-wrap'>
                                                    <div className='flex flex-col gap-6'>
                                                        <h1 className='md:text-[25px] text-[14px]   font-bold text-black-14 font-manrope'>Card Number</h1>

                                                    </div>
                                                    <div className='flex items-center gap-2'>
                                                        <p className='text-[14px] md:text-[20px] font-medium font-manrope text-brown-A43 flex items-center'>**** **** **** </p>
                                                        <p className='text-[14px] md:text-[20px] font-medium font-manrope text-brown-A43 flex items-center'>4242 </p>
                                                    </div>

                                                </div>


                                                <div className='grid  grid-cols-1 gap-4 w-full'>

                                                    <div className='w-full' >

                                                        <ButtonSquare className={`w-full bg-transparent  text-brown-A43  py-[32px] px-[110px]  font-extrabold text-[14px] font-manrope hover:bg-brown-A43 text-background'  bg-brown-A43-o20 text-brown-A43' hover:bg-brown-A43 hover:text-background`} variant='secondary' >Cancel Subscription</ButtonSquare>

                                                    </div>




                                                </div>

                                                <div className='flex '></div>
                                                {/* <div className='p-[57px]     bg-brown-A43 rounded-[30px] h-full flex flex-col group transition-colors duration-300 ease-in-out'>


                                                <div className='flex flex-col gap-20 flex-1'>
                                                    <div className='flex flex-col gap-10 '>
                                                        <div className='flex flex-col gap-3'>
                                                            <p className='md:text-[40px] text-[20px]   font-bold  font-playfair  text-background transition-colors duration-300 ease-in-out'>$0/mo</p>
                                                            <p className='text-[20px] font-normal font-playfair  text-background transition-colors duration-300 ease-in-out'>Try it as long as you like</p>
                                                        </div>

                                                        <div className='flex lg:flex-row flex-col   lg:gap-[80px] gap-[50px]'>
                                                            <ul className='flex flex-col gap-3'>
                                                                <li className='flex gap-3 items-center'>
                                                                    <div className=' text-background transition-colors duration-300 ease-in-out'><FaCheck size={15} /></div>
                                                                    <p className='text-[20px] font-normal font-playfair text-background transition-colors duration-300 ease-in-out'>Full profile customizatione</p>
                                                                </li>
                                                                <li className='flex gap-3 items-center'>
                                                                    <div className=' text-background transition-colors duration-300 ease-in-out'> <FaCheck size={15} /></div>
                                                                    <p className='text-[20px] font-normal font-playfair text-background transition-colors duration-300 ease-in-out'>Unlimited services</p>
                                                                </li>
                                                                <li className='flex gap-3 items-center'>
                                                                    <div className=' text-background transition-colors duration-300 ease-in-out'><FaCheck size={15} /></div>
                                                                    <p className='text-[20px] font-normal font-playfair text-background transition-colors duration-300 ease-in-out'>Unlimited bookings</p>
                                                                </li>
                                                            </ul>

                                                            <ul className='flex flex-col gap-3 '>
                                                                <li className='flex gap-3 items-center'>
                                                                    <div className='text-background transition-colors duration-300 ease-in-out'><FaCheck size={15} /></div>
                                                                    <p className='text-[20px] font-normal font-playfair text-background transition-colors duration-300 ease-in-out'>Calendar sync </p>
                                                                </li>
                                                                <li className='flex gap-3 items-center'>
                                                                    <div className='text-background transition-colors duration-300 ease-in-out'><FaCheck size={15} /></div>
                                                                    <p className='text-[20px] font-normal font-playfair text-background transition-colors duration-300 ease-in-out'>Appointment reminders </p>
                                                                </li>
                                                                <li className='flex gap-3 items-center'>
                                                                    <div className='text-background transition-colors duration-300 ease-in-out'><FaCheck size={15} /></div>
                                                                    <p className='text-[20px] font-normal font-playfair text-background transition-colors duration-300 ease-in-out'>Unlimited client reviews</p>
                                                                </li>
                                                            </ul>
                                                        </div>



                                                    </div>


                                                    <div className=' mt-auto'>

                                                        <ButtonSquare className=' rounded-[32px]    py-[32px] 2xl:px-[100px] px-[50px]  font-extrabold text-[14px] font-manrope  bg-background  text-brown-A43 transition-colors duration-300 ease-in-out w-full lg:w-auto' variant='secondary' disabled >Contine Payment</ButtonSquare>


                                                    </div>

                                                </div>
                                            </div> */}
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>

                </div>
            </div>
        </div >
    )
}

export default SalonDetailedInfo