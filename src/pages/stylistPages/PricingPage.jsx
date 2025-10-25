import React, { useState, useContext } from "react";
import { FaCheck } from 'react-icons/fa'
import { ButtonSquare } from '../../components/ui/buttonSquare'
import { Link } from 'react-router-dom'
import { useNavigate } from "react-router-dom";
import { ToastService, ToastContainerWrapper } from "../../utils/ToastService";
import { handleApiError } from "../../utils/helpers/HelperFunction";
import { AuthContext } from "../../services/context/AuthContext";


const PricingPage = () => {
    const navigate = useNavigate();
    const auth = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(false);
    const { authToken, user } = auth;
    const stripeCustomerId = user?.stripeCustomerId;
    return (
        <div className='bg-background'>

            <div className='  flex flex-col gap-4 '>
                <div className='flex flex-col justify-center items-center gap-6'>
                    <h1 className='md:text-[60px] text-[20px]   font-bold text-black-14 font-playfair'>Transparent Pricing</h1>
                    <p className='text-[20px] font-normal font-playfair text-black-14'>Pricing built for people just like you.</p>
                </div>


                <div className='grid  grid-cols-12  gap-y-10   lg:gap-x-10 items-stretch w-full'>

                    <div className='lg:col-span-12 col-span-12  flex-1'>


                        <div className='flex flex-col gap-6 h-full'>
                            <div className='flex flex-col gap-6'>
                                <h1 className='md:text-[40px] text-[20px]   font-bold text-black-14 font-playfair'>Unlimited</h1>
                                <p className='text-[20px] font-normal font-playfair text-black-14'>Limtless possibilites</p>
                            </div>

                            <div className='p-[20px]    sm:p-[57px]  bg-white-F3   hover:bg-brown-A43 rounded-[30px] h-full flex flex-col group transition-colors duration-300 ease-in-out'>


                                <div className='flex flex-col gap-20 flex-1'>
                                    <div className='flex flex-col gap-10 '>
                                        <div className='flex flex-col gap-3'>
                                            <p className='md:text-[40px] text-[20px]   font-bold text-black-14 font-playfair  group-hover:text-background transition-colors duration-300 ease-in-out'>$49/mo</p>
                                            <p className='text-[20px] font-normal font-playfair text-black-14 group-hover:text-background transition-colors duration-300 ease-in-out'>Try it as long as you like</p>
                                        </div>

                                        <div className='flex lg:flex-row flex-col   lg:gap-[80px] gap-[50px]'>
                                            <ul className='flex flex-col gap-3'>
                                                <li className='flex gap-3 items-center'>
                                                    <div className='text-brown-A43 group-hover:text-background transition-colors duration-300 ease-in-out'><FaCheck size={15} /></div>
                                                    <p className='text-[20px] font-normal font-playfair text-black-14 group-hover:text-background transition-colors duration-300 ease-in-out'>Full profile customizatione</p>
                                                </li>
                                                <li className='flex gap-3 items-center'>
                                                    <div className='text-brown-A43 group-hover:text-background transition-colors duration-300 ease-in-out'><FaCheck size={15} /></div>
                                                    <p className='text-[20px] font-normal font-playfair text-black-14 group-hover:text-background transition-colors duration-300 ease-in-out'>Unlimited services</p>
                                                </li>
                                                <li className='flex gap-3 items-center'>
                                                    <div className='text-brown-A43 group-hover:text-background transition-colors duration-300 ease-in-out'><FaCheck size={15} /></div>
                                                    <p className='text-[20px] font-normal font-playfair text-black-14 group-hover:text-background transition-colors duration-300 ease-in-out'>Unlimited bookings</p>
                                                </li>
                                            </ul>

                                            <ul className='flex flex-col gap-3 '>
                                                <li className='flex gap-3 items-center'>
                                                    <div className='text-brown-A43 group-hover:text-background transition-colors duration-300 ease-in-out'><FaCheck size={15} /></div>
                                                    <p className='text-[20px] font-normal font-playfair text-black-14 group-hover:text-background transition-colors duration-300 ease-in-out'>Calendar sync </p>
                                                </li>
                                                <li className='flex gap-3 items-center'>
                                                    <div className='text-brown-A43 group-hover:text-background transition-colors duration-300 ease-in-out'><FaCheck size={15} /></div>
                                                    <p className='text-[20px] font-normal font-playfair text-black-14 group-hover:text-background transition-colors duration-300 ease-in-out'>Appointment reminders </p>
                                                </li>
                                                <li className='flex gap-3 items-center'>
                                                    <div className='text-brown-A43 group-hover:text-background transition-colors duration-300 ease-in-out'><FaCheck size={15} /></div>
                                                    <p className='text-[20px] font-normal font-playfair text-black-14 group-hover:text-background transition-colors duration-300 ease-in-out'>Unlimited client reviews</p>
                                                </li>
                                            </ul>
                                        </div>



                                    </div>


                                    <div className=' mt-auto'>
                                        <Link to="/business/payment-page">
                                            <ButtonSquare className=' rounded-[32px] bg-brown-A43 text-background  py-[32px] 2xl:px-[100px] px-[50px]  font-extrabold text-[14px] font-manrope group-hover:bg-background group-hover:text-brown-A43 transition-colors duration-300 ease-in-out w-full lg:w-auto' variant='secondary' >Start Your Free Trial</ButtonSquare>
                                        </Link>

                                    </div>

                                </div>
                            </div>
                        </div>


                    </div>

                </div>
            </div>

        </div >
    )
}

export default PricingPage