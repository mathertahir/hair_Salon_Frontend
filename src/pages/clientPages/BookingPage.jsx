import React, { useState } from 'react'
import CustomCheckbox from '../../components/ui/CustomCheckbox'
import { ButtonSquare } from '../../components/ui/buttonSquare'
import { Link } from 'react-router-dom'

const BookingPage = () => {
    const [isChecked, setIsChecked] = useState(false);
    const [id, setId] = useState(Math.random().toString(36).substring(2, 15));


    return (
        <div className='bg-background'>
            <div className='container'>
                <div className='py-20 flex flex-col gap-10 '>

                    <form className=' flex flex-col gap-10'>
                        <div className='flex flex-col gap-10'>
                            <div className='text-black-14 font-semibold text-poppins sm:text-[30px] text-[20px]'>Booking Information</div>
                            <div className='grid sm:grid-cols-2 grid-cols-1 gap-10'>
                                <div className='p-[24px] border-[1px] border-gray-white-E9 rounded-[5px]  '>
                                    <div className='flex gap-3 items-center '>
                                        <input
                                            className="focus:border-none focus:outline-none border-none w-full bg-transparent"
                                            type="text"
                                            placeholder='Select Service'
                                        />

                                    </div>



                                </div>
                                <div className='p-[24px] border-[1px] border-gray-white-E9 rounded-[5px]  '>
                                    <div className='flex gap-3 items-center '>
                                        <input
                                            className="focus:border-none focus:outline-none border-none w-full bg-transparent"
                                            type="date"
                                            placeholder='pick date & Time'
                                            value={id}
                                        />

                                    </div>

                                </div>
                            </div>


                        </div>

                        <div className='flex flex-col gap-10'>
                            <div className='text-black-14 font-semibold text-poppins sm:text-[30px] text-[20px]'>Personal Information</div>
                            <div className='grid grid-cols-12  gap-10'>
                                <div className='p-[24px] border-[1px] border-gray-white-E9 rounded-[5px]  col-span-12 sm:col-span-6 lg:col-span-4 '>
                                    <div className='flex gap-3 items-center '>
                                        <input
                                            className="focus:border-none focus:outline-none border-none w-full bg-transparent"
                                            type="text"
                                            placeholder='Your Name'
                                        />

                                    </div>



                                </div>

                                <div className='p-[24px] border-[1px] border-gray-white-E9 rounded-[5px]  col-span-12 sm:col-span-6 lg:col-span-4 '>
                                    <div className='flex gap-3 items-center '>
                                        <input
                                            className="focus:border-none focus:outline-none border-none w-full bg-transparent"
                                            type="email"
                                            placeholder='Your Email Address'
                                        />

                                    </div>

                                </div>
                                <div className='p-[24px] border-[1px] border-gray-white-E9 rounded-[5px]  col-span-12 sm:col-span-6 lg:col-span-4 '>
                                    <div className='flex gap-3 items-center '>
                                        <input
                                            className="focus:border-none focus:outline-none border-none w-full bg-transparent"
                                            type="tel"
                                            placeholder='Your Phone Number'
                                        />

                                    </div>

                                </div>

                                <div className='p-[24px] border-[1px] border-white-E9 rounded-[5px]  col-span-12  '>
                                    <div className='flex gap-3 items-center '>
                                        <textarea
                                            className="focus:border-none focus:outline-none border-none w-full bg-transparent"
                                            type="text"
                                            placeholder='Your Message'
                                            rows={4}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className='flex gap-10 items-center '>
                                <CustomCheckbox
                                    id="terms-checkbox"
                                    checked={isChecked}
                                    onChange={(e) => setIsChecked(e.target.checked)}
                                    label="I agree to the terms and conditions"
                                />
                            </div>

                        </div>

                        <Link to={`/booking-confirm/${id}`}>
                            <ButtonSquare className='w-full bg-brown-A43 text-background  p-[32px]  font-extrabold text-[14px] font-manrope' variant='secondary' >Book Now</ButtonSquare>
                        </Link>

                    </form>

                </div>
            </div>
        </div>
    )
}

export default BookingPage