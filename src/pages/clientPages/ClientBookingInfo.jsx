import React, { useState } from 'react'
import { MdOutlineKeyboardArrowRight, MdOutlineKeyboardArrowDown } from "react-icons/md";
import detail1 from '../../assets/detail1.png'
import detail2 from '../../assets/detail2.png'
import detail3 from '../../assets/detail3.png'
import { FaArrowRight, FaRegUser } from "react-icons/fa";
import MyMap from '../../components/MyMap'
import { FiStar } from 'react-icons/fi'
import GoBack from '../../components/GoBack';
import review from '../../assets/review.webp'
import { ButtonSquare } from '../../components/ui/buttonSquare';
import { Link } from 'react-router-dom';
import { RxCross1 } from "react-icons/rx";
import RatingStar from '../../components/ui/RatingStar';

const ClientBookingInfo = () => {
    const [activeTab, setActiveTab] = useState(null)
    const [isOpen, setIsOpen] = useState(false);
    const [activebtn, setActivebtn] = useState(2);

    const toggleTab = (tabIndex) => {
        setActiveTab(activeTab === tabIndex ? null : tabIndex)
    }



    return (
        <div className='bg-background'>
            <div className='container'>
                <div className='py-10 flex flex-col gap-4 '>

                    <div><GoBack /></div>

                    <div className='py-[45px] md:px-[40px] bg-background rounded-[10px]'>
                        <div className='flex flex-col gap-[20px]'>


                            <div className='grid grid-cols-12 gap-[20px] '>
                                <div className='col-span-12 md:col-span-8 rounded-3xl'>
                                    <img src={detail1} alt="detail1" className='w-full h-full object-cover rounded-3xl' />
                                </div>

                                <div className='col-span-12 md:col-span-4 grid grid-cols-1 gap-[20px]'>
                                    <div className='rounded-3xl'>
                                        <img src={detail2} alt="detail2" className='w-full h-full object-cover rounded-3xl' />
                                    </div>
                                    <div className='rounded-3xl'>
                                        <img src={detail3} alt="detail3" className='w-full h-full object-cover rounded-3xl' />
                                    </div>
                                </div>
                            </div>

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
                                    <div className='flex flex-col md:gap-[20px] gap-[10px] md:mb-[51px] mb-[20px] '>

                                        <div className='flex sm:flex-row flex-col justify-between items-center'>
                                            <div>
                                                <p className=' sm:text-[25px] text-[20px] sfont-playfair font-bold text-black-14'>Crown by Amara</p>
                                            </div>
                                            <div className="flex gap-[20px] items-center">
                                                <div className="flex items-center gap-[10px] text-brown-A43">
                                                    <div>  <FiStar size={24} /></div>

                                                    <p className='md:text-[25px]  text-[13px] font-manrope font-normal '>4.5</p>
                                                </div>

                                                <div>                        <p className='md:text-lg text-[13px] font-playfair font-bold text-gray-55'>104 Reviews.</p></div>
                                            </div>
                                        </div>

                                        <p className='font-manrope md:text-base text-[13px] font-semibold text-gray-55  text-left  md:leading-10 leading-5 '>
                                            At Crown by Amara, we believe your hair is your crown, and it deserves the best care. With years of professional experience, we specialize in modern cuts, vibrant coloring, bridal styling, and treatments that bring life back to your hair. Our mission is to create looks that reflect your personality while keeping your hair healthy and radiant.

                                            Whether it’s a quick trim, a bold transformation, or the perfect style for your big day, Crown by Amara ensures every client leaves with confidence and a smile. 🌸.</p>
                                    </div>


                                    <div className='flex flex-col md:gap-[20px] gap-[10px] items-start justify-start text-left md:mb-[111px] mb-[20px]'>
                                        <p className='sm:text-[35px] text-[20px] sm:font-playfair font-bold text-black-14'>Location</p>

                                        <div className='w-full'>
                                            <MyMap key="salon-map" coordinates={[43.65107, -79.347015]} />
                                        </div>
                                    </div>


                                    <div className='grid grid-cols-1    lg:grid-cols-3  md:gap-[104px]  gap-[10px] md:gap-[80px] sm:gap-[60px] xs:gap-[30px] md:mb-[111px] mb-[20px]'>
                                        <div className='flex flex-col gap-[20px] items-start justify-start text-left  border-b-[1px] lg:border-b-0   lg:border-r-[1px] border-white-d9'>
                                            <p className='sm:text-[35px] text-[12x] sm:font-playfair font-bold text-brown-A43'>Services Offered</p>

                                            <div className=' '>
                                                <ul className='flex flex-col gap-[10px] list-disc list-inside'>
                                                    <li className='md:text-2xl text-[13px] font-manrope font-normal text-gray-55'>Women's Haircut</li>
                                                    <li className='md:text-2xl text-[13px] font-manrope font-normal text-gray-55'>Bridal Hair Styling</li>
                                                    <li className='md:text-2xl text-[13px] font-manrope font-normal text-gray-55'>Hair Coloring and styling</li>
                                                    <li className='md:text-2xl text-[13px] font-manrope font-normal text-gray-55'>Keratin & Rebonding</li>
                                                    <li className='md:text-2xl text-[13px] font-manrope font-normal text-gray-55'>Blow Dry & Styling</li>


                                                </ul>
                                            </div>
                                        </div>


                                        <div className='flex border-white-d9  border-r-[1px] '>
                                            <div className='flex flex-col gap-[20px] items-start justify-start text-left'>
                                                <p className='sm:text-[35px] text-[12x] sm:font-playfair font-bold text-brown-A43'>Avaiilability</p>

                                                <div className=' '>
                                                    <ul className='flex flex-col gap-[10px] '>
                                                        <li className='md:text-2xl text-[13px] font-manrope font-normal text-gray-55'>Mon - Sat</li>
                                                        <li className='md:text-2xl text-[13px] font-manrope font-normal text-gray-55'>11:00 AM - 10:00 PM`</li>



                                                    </ul>
                                                </div>
                                            </div>
                                        </div>



                                        <div className="flex  ">
                                            <div className='flex flex-col gap-[20px] items-start justify-start text-left'>
                                                <p className='sm:text-[35px] text-[12x] sm:font-playfair font-bold text-brown-A43'>Price Range</p>

                                                <div className=''>
                                                    <ul className='flex flex-col gap-[10px] '>

                                                        <li className='md:text-2xl text-[13px] font-manrope font-normal text-gray-55'>Starting from PKR 3,000`</li>



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


                                    <div className='flex flex-col gap-[20px]'>


                                        <div className='flex justify-between items-center'>
                                            <div><span class="bg-green-100 text-green-800 text-lg font-medium me-2 px-8 py-1 rounded-full  ">Active</span></div>
                                        </div>
                                        <div className='grid grid-cols-1    lg:grid-cols-3  md:gap-[104px]  gap-[10px] md:gap-[80px] sm:gap-[60px] xs:gap-[30px] md:mb-[111px] mb-[20px]'>
                                            <div className='flex flex-col gap-[20px] items-start justify-start text-left   lg:border-b-0   lg:border-r-[1px] border-white-d9'>
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

                                        <div className='w-full' >

                                            <ButtonSquare className={`w-full bg-transparent border border-brown-A43 text-brown-A43  py-[32px]  px-[110px] font-extrabold text-[14px]  bg-brown-A43 text-background  `} variant='secondary' onClick={(e) => {
                                                e.stopPropagation();
                                                setIsOpen(true);
                                            }} >Completed</ButtonSquare>

                                        </div>
                                    </div>

                                </div>


                            </div>




                        </div>
                    </div>
                </div>


                {isOpen && (
                    <div
                        className="fixed inset-0 z-50 flex justify-center items-center bg-black-050 "
                        onClick={() => setIsOpen(false)} // close on outside click
                    >
                        <div
                            className="relative p-4 w-full max-w-[98%] sm:w-[80%]  lg:w-[80%]  xl:max-w-[80%]  h-[80%]  sm:h-[90%] m-8 bg-background 
                       rounded-[30px] shadow-sm overflow-y-auto flex flex-col justify-center  webkit-scrollbar-none 
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

                            <div className='py-4 flex flex-col gap-4 justify-center  px-0  px-[30px] 2xl:px-[100px]  '>

                                <div className='flex justify-center'>
                                    <div className='w-[150px] h-[100px]  rounded-lg'>
                                        <img src={review} alt="review" className='object-fit rounded-lg' />
                                    </div>
                                </div>

                                <div className="   md:text-[20px] text-[15px]  md:text-[20px]  xl:text-[20px] font-poppins font-extrabold text-black  text-center"> Your Service Completed</div>
                                <p className='   md:text-[18px] text-[15px] font-poppins font-normal text-gray-55 text-center'>Thanks For choosing us.</p>
                                <div className='flex flex-col gap-6'>

                                    <div className='md:text-[20px] text-[15px]  md:text-[20px]  xl:text-[20px] font-poppins font-extrabold text-black text-center'> Add a Review </div>

                                    <div className='flex justify-center '>
                                        <RatingStar value={3} readOnly={true} size={28} color="#fbbf24" />
                                    </div>

                                    <div className='p-[10px] border-[1px] border-white-E9 rounded-[5px] '>
                                        <div className='flex gap-3  '>

                                            <textarea
                                                className="focus:border-none focus:outline-none border-none w-full bg-transparent"
                                                type="text"
                                                placeholder='Add a Review For Better Services'
                                                rows={3}
                                            />

                                        </div>

                                    </div>


                                </div>
                                <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 w-full'>
                                    <div className='w-full' onMouseEnter={() => setActivebtn(1)} onClick={(e) => {
                                        e.stopPropagation();
                                        setIsOpen(false);
                                    }}>

                                        <ButtonSquare className={`w-full bg-transparent border border-brown-A43 text-brown-A43  py-[32px] px-[110px]  font-extrabold text-[14px] font-manrope ${activebtn === 1 ? 'bg-brown-A43 text-background' : ''} hover:bg-brown-A43 hover:text-background`} variant='secondary' >Cancel</ButtonSquare>

                                    </div>

                                    <div className='w-full' onMouseEnter={() => setActivebtn(2)} onClick={(e) => {
                                        e.stopPropagation();
                                        setIsOpen(false);
                                    }}>

                                        <ButtonSquare className={`w-full bg-transparent border border-brown-A43 text-brown-A43  py-[32px]  px-[110px] font-extrabold text-[14px] font- ${activebtn === 2 ? 'bg-brown-A43 text-background' : ''} hover:bg-brown-A43 hover:text-background`} variant='secondary' >Completed</ButtonSquare>

                                    </div>
                                </div>

                            </div>

                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default ClientBookingInfo