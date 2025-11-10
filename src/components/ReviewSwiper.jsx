import React, { useRef } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination } from 'swiper/modules'
import { BiSolidQuoteLeft, BiSolidQuoteRight } from "react-icons/bi";
import ellipse from '../assets/RounedEllipse.png'
import { FaArrowLeft } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";
import RatingStar from './ui/RatingStar';
import avatar from "../assets/avatar.webp"
const ReviewSwiper = ({ businessReviews }) => {

    console.log(businessReviews)
    const swiperRef = useRef(null)
    return (
        <div className=''>

            <div className='flex flex-col gap-10 '>
                <div className='py-10 sm:py-20 flex flex-col gap-10 '>





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
                                {businessReviews?.map((businessReviews) => (
                                    <SwiperSlide key={businessReviews.id}>

                                        <div className='flex justify-center items-center text-center flex-col gap-8'>
                                            <div className='w-[200px] h-[200px] lg:w-[200px] lg:h-[200px] rounded-full bg-background p-1 '>
                                                <img src={businessReviews.user.profilePhoto.url} alt="testimonial" className='w-full h-full object-cover rounded-full' />
                                            </div>

                                            <div className='flex flex-col gap-10 items-center text-center'>

                                                <p className='text-background text-lg sm:text-xl font-manrope font-semibold'>{businessReviews.user?.name}</p>
                                                <RatingStar value={businessReviews.rating} size={28} color="#fbbf24" readOnly />
                                                <p className='text-base sm:text-lg font-normal font-manrope text-white-FD text-center lg:text-left leading-relaxed'>"{businessReviews.comment}"</p>

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
    )
}

export default ReviewSwiper