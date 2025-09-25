import React, { useState } from 'react'

import mastercard from '../../assets/mastercard.png'
import { ButtonSquare } from '../../components/ui/buttonSquare'
import { Link } from 'react-router-dom'
import { FaCross } from 'react-icons/fa'
import { RxCross1 } from "react-icons/rx";
import review from '../../assets/profileunderreview.png'
import congratulation from '../../assets/congrats.png'
const PaymentForm = () => {

    const [isOpen, setIsOpen] = useState(false);
    const [activebtn, setActivebtn] = useState(2);
    return (

        <>

            <div className='bg-background'>
                <div className='container'>
                    <div className='py-20  flex flex-col gap-20'>
                        <div className='flex flex-col justify-center items-center gap-6'>
                            <h1 className='md:text-[60px] text-[20px]   font-bold text-black-14 font-playfair'>Pay Now</h1>
                            <p className='text-[20px] font-normal font-playfair text-black-14'>Please add your correct payment detail and buy subscription</p>
                        </div>


                        <div className='w-full'>
                            <form className='grid grid-cols-12 gap-4 sm:gap-6 md:gap-8'>
                                <div className='p-[10px] border-[1px] border-white-E9 rounded-[5px] col-span-12'>
                                    <div className='flex gap-3 items-center'>
                                        <input
                                            className="focus:border-none focus:outline-none border-none w-full bg-transparent"
                                            type="text"
                                            placeholder='Name'
                                        />
                                    </div>
                                </div>

                                <div className='p-[10px] border-[1px] border-white-E9 rounded-[5px] col-span-12'>
                                    <div className='flex gap-3 items-center'>
                                        <div className='text-blueCD'>
                                            <img src={mastercard} alt="mastercard" className='w-[50px] h-[50px]' />
                                        </div>
                                        <input
                                            className="focus:border-none focus:outline-none border-none w-full bg-transparent"
                                            type="text"
                                            placeholder='Card Number'
                                        />
                                    </div>
                                </div>

                                <div className='p-[10px] border-[1px] border-white-E9 rounded-[5px] col-span-12 lg:col-span-6'>
                                    <div className='flex gap-3 items-center'>
                                        <input
                                            className="focus:border-none focus:outline-none border-none w-full bg-transparent"
                                            type="date"
                                            placeholder='Expiry Date'
                                        />
                                    </div>
                                </div>

                                <div className='p-[10px] border-[1px] border-white-E9 rounded-[5px] col-span-12 lg:col-span-6'>
                                    <div className='flex gap-3 items-center'>
                                        <input
                                            className="focus:border-none focus:outline-none border-none w-full bg-transparent"
                                            type="text"
                                            placeholder='CVV'
                                        />
                                    </div>
                                </div>

                                <div className='col-span-12'>

                                    <ButtonSquare
                                        type="button"
                                        className='bg-brown-A43 text-background p-[20px] font-extrabold text-[14px] font-manrope rounded-[8px] w-full'
                                        variant='secondary'
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setIsOpen(true);
                                        }}
                                    >
                                        Pay Now
                                    </ButtonSquare>

                                </div>
                            </form>
                        </div>

                    </div>

                    {isOpen && (
                        <div
                            className="fixed inset-0 z-50 flex justify-center items-center bg-black-050 "
                            onClick={() => setIsOpen(false)} // close on outside click
                        >
                            <div
                                className="relative p-4 w-full max-w-[98%] sm:w-[80%]  lg:w-[80%]  xl:max-w-[80%]  h-[90%] m-8 bg-background 
                       rounded-[30px] shadow-sm overflow-y-auto flex flex-col justify-center items-center webkit-scrollbar-none 
                        "
                                onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside
                            >
                                {/* Close button */}
                                <button
                                    type="button"
                                    className="absolute top-3 right-2.5 text-gray-400 bg-transparent 
                         hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 
                         inline-flex justify-center items-center 
                         "
                                    onClick={() => setIsOpen(false)}
                                >

                                    <div className='text-red0'>
                                        <RxCross1
                                            size={22}
                                        />
                                    </div>

                                    <span className="sr-only">Close modal</span>
                                </button>

                                {/* Modal Content */}
                                =
                                <div className='py-20 flex flex-col gap-4 justify-center items-center  px-0  px-[30px] 2xl:px-[100px]  '>
                                    <div className=' '>
                                        <img src={congratulation} alt="review" className='object-fit' />
                                    </div>
                                    <div className="   md:text-[30px] text-[15px]  md:text-[35px]  xl:text-[50px] font-poppins font-extrabold text-black"> Your Subscription Made</div>
                                    <p className='   md:text-[25px] text-[15px] font-poppins font-normal text-gray-55 text-center'>Please subscription is made successfully and your are ready to move forward.</p>

                                    <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 w-full'>
                                        <div className='w-full' onMouseEnter={() => setActivebtn(1)}>
                                            <Link to="/">
                                                <ButtonSquare className={`w-full bg-transparent border border-brown-A43 text-brown-A43  py-[32px] px-[110px]  font-extrabold text-[14px] font-manrope ${activebtn === 1 ? 'bg-brown-A43 text-background' : ''} hover:bg-brown-A43 hover:text-background`} variant='secondary' >DISCARD</ButtonSquare>
                                            </Link>
                                        </div>

                                        <div className='w-full' onMouseEnter={() => setActivebtn(2)}>
                                            <Link to="/">
                                                <ButtonSquare className={`w-full bg-transparent border border-brown-A43 text-brown-A43  py-[32px]  px-[110px] font-extrabold text-[14px] font- ${activebtn === 2 ? 'bg-brown-A43 text-background' : ''} hover:bg-brown-A43 hover:text-background`} variant='secondary' >Continue</ButtonSquare>
                                            </Link>
                                        </div>
                                    </div>

                                </div>

                            </div>
                        </div>
                    )}

                </div>
            </div >

        </>

    )
}

export default PaymentForm