import React, { useRef } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination } from 'swiper/modules'
import { BiSolidQuoteLeft, BiSolidQuoteRight } from "react-icons/bi";
import ellipse from '../assets/RounedEllipse.png'
import { FaArrowLeft } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";

const TestimonialSwiper = ({ testimonials, title, description }) => {
    const swiperRef = useRef(null)
    return (
        <div className='bg-custom-gradient'>
            <div className='container'>
                <div className='flex flex-col gap-10 '>
                    <div className='py-10 sm:py-20 flex flex-col gap-10 '>
                        <div>
                            <p className='font-manrope text-base font-semibold text-brown-A43 mb-[2px]'>{title}</p>
                            <h2 className='sm:text-[40px] text-[22px] lg:text-[45px] font-playfair text-black-14 font-bold leading-none mb-4'>{description}</h2>
                        </div>




                        <div className='bg-brown-31 rounded-3xl'>
                            <div className='py-8 sm:py-24'>
                                <Swiper
                                    ref={swiperRef}
                                    modules={[Navigation, Pagination]}
                                    spaceBetween={0}
                                    slidesPerView={1}
                                    navigation={{
                                        nextEl: '.swiper-button-next-custom',
                                        prevEl: '.swiper-button-prev-custom',
                                    }}
                                    pagination={{
                                        clickable: true,
                                        el: '.swiper-pagination-custom',
                                    }}
                                    touchRatio={1}
                                    touchAngle={45}
                                    threshold={5}
                                    touchStartPreventDefault={false}
                                    touchMoveStopPropagation={false}
                                    allowTouchMove={true}
                                    className="testimonial-swiper"
                                >
                                    {testimonials.map((testimonial) => (
                                        <SwiperSlide key={testimonial.id}>
                                            <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-4 px-4 sm:px-8 md:px-12 2xl:px-[200px]'>
                                                {/* Image Section - Desktop/Tablet with ellipse */}
                                                <div className="hidden sm:flex justify-center lg:justify-start order-2 lg:order-1">
                                                    <div className='hidden sm:block    h-[350px] w-[120px] lg:h-[443px] lg:w-[140px] relative'>
                                                        <img src={ellipse} alt="ellipse" className='w-full h-full object-fit' />
                                                        <div className='w-[240px] h-[240px] lg:w-[280px] lg:h-[280px] rounded-full bg-background p-1 absolute top-[-10%] right-[-60%] translate-x-[50%] translate-y-[50%]'>
                                                            <img src={testimonial.image} alt="testimonial" className='w-full h-full object-cover rounded-full' />
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Image Section - Mobile only circular image */}
                                                <div className='flex justify-center sm:hidden order-2 lg:order-1'>
                                                    <div className='w-[200px] h-[200px] rounded-full bg-background p-1'>
                                                        <img src={testimonial.image} alt="testimonial" className='w-full h-full object-cover rounded-full' />
                                                    </div>
                                                </div>

                                                {/* Content Section */}
                                                <div className='flex flex-col justify-center gap-4 sm:gap-6 relative order-1 lg:order-2'>
                                                    <div className='absolute top-[5px] sm:top-[10px] lg:top-[10px] left-[5px] sm:left-[10px] lg:left-[-20px] text-background'>
                                                        <BiSolidQuoteLeft className='w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10' />
                                                    </div>

                                                    <div className='text-center lg:text-left'>
                                                        <p className='text-background text-lg sm:text-xl font-manrope font-semibold'>{testimonial.name}</p>
                                                        <p className='text-background text-lg sm:text-xl font-manrope font-semibold mt-[2px]'>{testimonial.location}</p>
                                                    </div>

                                                    <div className='flex flex-col gap-3 sm:gap-4 relative'>
                                                        <p className='text-white-FD text-2xl sm:text-3xl lg:text-4xl font-playfair font-semibold text-center lg:text-left'>{testimonial.title}</p>
                                                        <p className='text-base sm:text-lg font-normal font-manrope text-white-FD text-center lg:text-left leading-relaxed'>"{testimonial.description}"</p>

                                                        <div className='absolute bottom-[-40px] sm:bottom-[-30px] lg:bottom-[-40px] right-[10px] sm:right-[10px] lg:right-[10px] text-background'>
                                                            <BiSolidQuoteRight className='w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10' />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                            </div>
                        </div>

                        <div className='flex justify-center items-center gap-3 sm:gap-4'>
                            <button
                                className='swiper-button-prev-custom w-[44px] h-[44px] sm:w-[48px] sm:h-[48px] lg:w-[52px] lg:h-[52px] bg-background rounded-full flex justify-center items-center text-brown-A43 hover:bg-brown-A43 hover:text-background transition-all duration-300 active:scale-95'
                                onClick={() => swiperRef.current?.swiper.slidePrev()}
                            >
                                <FaArrowLeft className='w-4 h-4 sm:w-5 sm:h-5' />
                            </button>
                            <button
                                className='swiper-button-next-custom w-[44px] h-[44px] sm:w-[48px] sm:h-[48px] lg:w-[52px] lg:h-[52px] bg-background rounded-full flex justify-center items-center text-brown-A43 hover:bg-brown-A43 hover:text-background transition-all duration-300 active:scale-95'
                                onClick={() => swiperRef.current?.swiper.slideNext()}
                            >
                                <FaArrowRight className='w-4 h-4 sm:w-5 sm:h-5' />
                            </button>
                        </div>

                        {/* Custom pagination */}
                        {/* <div className='swiper-pagination-custom flex justify-center gap-2'></div> */}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TestimonialSwiper