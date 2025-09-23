import React, { useState } from 'react'
import { MdOutlineKeyboardArrowRight, MdOutlineKeyboardArrowDown } from "react-icons/md";
import { FaArrowRight } from "react-icons/fa";
import MyMap from '../../components/MyMap'
import { FiStar } from 'react-icons/fi'

const ClientBookingInfo = () => {
    const [activeTab, setActiveTab] = useState(null)

    const toggleTab = (tabIndex) => {
        setActiveTab(activeTab === tabIndex ? null : tabIndex)
    }



    return (
        <div className='bg-background'>
            <div className='container'>
                <div className='py-20 flex flex-col gap-10 '>

                    <div className='py-[45px] px-[40px] bg-background rounded-[10px]'>
                        <div className='flex flex-col gap-[20px]'>

                            <div className={`${activeTab === 0 ? 'gap-[20px]' : 'gap-[0px]'} flex flex-col shadow-2xl  px-[26px] py-[20px] rounded-[15px]  `} >
                                <div
                                    className='flex items-center justify-between cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors duration-200'
                                    onClick={() => toggleTab(0)}
                                >
                                    <p className='text-black-black  font-playfair font-bold  sm:text-[30px] text-[20px]'>Hairstlist Details</p>

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
                                    <div className='flex flex-col gap-[20px] mb-[51px] '>

                                        <div className='flex sm:flex-row flex-col justify-between items-center'>
                                            <div>
                                                <p className=' sm:text-[25px] text-[20px] sfont-playfair font-bold text-black-14'>Crown by Amara</p>
                                            </div>
                                            <div className="flex gap-[20px] items-center">
                                                <div className="flex items-center gap-[10px] text-brown-A43">
                                                    <div>  <FiStar size={24} /></div>

                                                    <p className='text-[25px] font-manrope font-normal '>4.5</p>
                                                </div>

                                                <div>                        <p className='text-lg font-playfair font-bold text-gray-55'>104 Reviews.</p></div>
                                            </div>
                                        </div>

                                        <p className='font-manrope text-base font-semibold text-gray-55  text-left  leading-10 '>
                                            At Crown by Amara, we believe your hair is your crown, and it deserves the best care. With years of professional experience, we specialize in modern cuts, vibrant coloring, bridal styling, and treatments that bring life back to your hair. Our mission is to create looks that reflect your personality while keeping your hair healthy and radiant.

                                            Whether it’s a quick trim, a bold transformation, or the perfect style for your big day, Crown by Amara ensures every client leaves with confidence and a smile. 🌸.</p>
                                    </div>


                                    <div className='flex flex-col gap-[20px] items-start justify-start text-left mb-[111px]'>
                                        <p className='sm:text-[35px] text-[20px] sm:font-playfair font-bold text-black-14'>Location</p>

                                        <div className='w-full'>
                                            <MyMap key="salon-map" coordinates={[43.65107, -79.347015]} />
                                        </div>
                                    </div>


                                    <div className='grid grid-cols-1    lg:grid-cols-3  gap-[104px]  md:gap-[80px] sm:gap-[60px] xs:gap-[30px] mb-[111px]'>
                                        <div className='flex flex-col gap-[20px] items-start justify-start text-left  border-b-[1px] lg:border-b-0   lg:border-r-[1px] border-white-d9'>
                                            <p className='sm:text-[35px] text-[20px] sm:font-playfair font-bold text-brown-A43'>Services Offered</p>

                                            <div className=' '>
                                                <ul className='flex flex-col gap-[10px] list-disc list-inside'>
                                                    <li className='text-2xl font-manrope font-normal text-gray-55'>Women's Haircut</li>
                                                    <li className='text-2xl font-manrope font-normal text-gray-55'>Bridal Hair Styling</li>
                                                    <li className='text-2xl font-manrope font-normal text-gray-55'>Hair Coloring and styling</li>
                                                    <li className='text-2xl font-manrope font-normal text-gray-55'>Keratin & Rebonding</li>
                                                    <li className='text-2xl font-manrope font-normal text-gray-55'>Blow Dry & Styling</li>


                                                </ul>
                                            </div>
                                        </div>


                                        <div className='flex border-white-d9  border-r-[1px] '>
                                            <div className='flex flex-col gap-[20px] items-start justify-start text-left'>
                                                <p className='sm:text-[35px] text-[20px] sm:font-playfair font-bold text-brown-A43'>Avaiilability</p>

                                                <div className=' '>
                                                    <ul className='flex flex-col gap-[10px] '>
                                                        <li className='text-2xl font-manrope font-normal text-gray-55'>Mon - Sat</li>
                                                        <li className='text-2xl font-manrope font-normal text-gray-55'>11:00 AM - 10:00 PM`</li>



                                                    </ul>
                                                </div>
                                            </div>
                                        </div>



                                        <div className="flex  ">
                                            <div className='flex flex-col gap-[20px] items-start justify-start text-left'>
                                                <p className='sm:text-[35px] text-[20px] sm:font-playfair font-bold text-brown-A43'>Price Range</p>

                                                <div className=''>
                                                    <ul className='flex flex-col gap-[10px] '>

                                                        <li className='text-2xl font-manrope font-normal text-gray-55'>Starting from PKR 3,000`</li>



                                                    </ul>
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
                                    <div className='grid grid-cols-1    lg:grid-cols-3  gap-[104px]  md:gap-[80px] sm:gap-[60px] xs:gap-[30px] mb-[111px]'>
                                        <div className='flex flex-col gap-[20px] items-start justify-start text-left  border-b-[1px] lg:border-b-0   lg:border-r-[1px] border-white-d9'>
                                            <p className='sm:text-[35px] text-[20px] sm:font-playfair font-bold text-brown-A43'>Book Services</p>

                                            <div className=' '>
                                                <ul className='flex flex-col gap-[10px] list-disc list-inside'>
                                                    <li className='text-2xl font-manrope font-normal text-gray-55'>Haircut</li>
                                                    <li className='text-2xl font-manrope font-normal text-gray-55'>Bridal Hair Styling</li>
                                                    <li className='text-2xl font-manrope font-normal text-black-14  gray-55'>Hair Coloring and highlights</li>



                                                </ul>
                                            </div>
                                        </div>


                                        <div className='flex border-white-d9  border-r-[1px] '>
                                            <div className='flex flex-col gap-[20px] items-start justify-start text-left'>
                                                <p className='sm:text-[35px] text-[20px] sm:font-playfair font-bold text-brown-A43'>Time</p>

                                                <div className=' '>
                                                    <ul className='flex flex-col gap-[10px] '>
                                                        <li className='text-2xl font-manrope font-normal text-gray-55'>Mon - Sat</li>
                                                        <li className='text-2xl font-manrope font-normal text-gray-55'>11:00 AM - 8:00 PM`</li>



                                                    </ul>
                                                </div>
                                            </div>
                                        </div>



                                        <div className="flex  ">
                                            <div className='flex flex-col gap-[20px] items-start justify-start text-left'>
                                                <p className='sm:text-[35px] text-[20px] sm:font-playfair font-bold text-brown-A43'>Booking Id</p>

                                                <div className=''>
                                                    <ul className='flex flex-col gap-[10px] '>

                                                        <li className='text-2xl font-playfair font-normal text-gray-55'>789531`</li>



                                                    </ul>
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
        </div>
    )
}

export default ClientBookingInfo