import React, { useRef } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination } from 'swiper/modules'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

import { FiMapPin, FiSearch, FiStar } from 'react-icons/fi'
import { BiSolidQuoteLeft, BiSolidQuoteRight } from "react-icons/bi";
import { Button } from '../../components/ui/button'
import heroBg from '../../assets/HeroBG.png'
import gallery1 from '../../assets/HG1.png'
import gallery2 from '../../assets/HG2.png'
import gallery3 from '../../assets/HG3.png'
import gallery4 from '../../assets/HG4.png'
import gallery5 from '../../assets/HG5.png'
import ellipse from '../../assets/RounedEllipse.png'
import { ButtonSquare } from '../../components/ui/buttonSquare'
import HairstylistCard from '../../components/HairstylistCard'
import { FaArrowLeft } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";

const Home = () => {
    // Swiper navigation refs
    const swiperRef = useRef(null)

    // Sample hairstylist data
    const hairstylists = [
        {
            id: 1,
            image: gallery1,
            name: "Crown by Amara",
            location: "Brookpark Ext, 27085, North Olmsted, 44070",
            rating: "4.5",
            reviewCount: "104"
        },
        {
            id: 2,
            image: gallery2,
            name: "The Loc Lounge",
            location: "2267 Main st, Fort Myers, 33901",
            rating: "4.5",
            reviewCount: "104"
        },

        {
            id: 3,
            image: gallery3,
            name: "Royal Strands Studio",
            location: "2267 Main st, Fort Myers, 33901,",
            rating: "4.5",
            reviewCount: "104"
        },

        {
            id: 4,
            image: gallery4,
            name: "Royal Strands Studio",
            location: "2267 Main st, Fort Myers, 33901,",
            rating: "4.5",
            reviewCount: "104"
        }
    ]

    // Testimonial data
    const testimonials = [
        {
            id: 1,
            name: "Leslie Alexander",
            location: "Moncton, Canada",
            title: "Neque porro quisquam est qui dolum",
            description: "It is a long established fact that a reader will be tracked distracted by the readable content of a page is when looking at its layout. The point of using Lorem of distribution it look like readable English",
            image: gallery3
        },
        {
            id: 2,
            name: "Sarah Johnson",
            location: "Toronto, Canada",
            title: "Amazing service and beautiful results",
            description: "I've been coming here for years and they never disappoint. The stylists are professional, skilled, and truly understand how to work with my hair type. Highly recommended!",
            image: gallery1
        },
        {
            id: 3,
            name: "Maria Rodriguez",
            location: "Vancouver, Canada",
            title: "Best hair salon in the city",
            description: "The team here is incredible! They listened to what I wanted and delivered beyond my expectations. My hair has never looked better and I get compliments everywhere I go.",
            image: gallery2
        },
        {
            id: 4,
            name: "Jennifer Brown",
            location: "Montreal, Canada",
            title: "Professional and friendly staff",
            description: "From the moment I walked in, I felt welcomed and comfortable. The stylist took time to understand my hair needs and the result was absolutely stunning.",
            image: gallery4
        }
    ]

    const handleBookNow = (hairstylistId) => {
        console.log(`Booking hairstylist with ID: ${hairstylistId}`)
        // Add your booking logic here
    }

    return (
        <div>

            {/* Hero Section */}

            <div className=' bg-cover bg-center' style={{ backgroundImage: `url(${heroBg})` }}>
                <div className='container'>
                    <div className='grid grid-cols-12 pt-[207px] pb-[160px] lg:pl-[98px]'>
                        <div className='col-span-12 lg:col-span-9 text-center xl:text-left flex flex-col gap-6'>
                            <div className='flex flex-col gap-6 justify-center items-center xl:items-start'>
                                <h1 className='font-bold xl:text-7xl text-5xl font-playfair  md:max-w-[530px] text-light-brown-c1  tracking-[-1px]'>Find the Perfect  Hairstylist for Your Crown</h1>
                                <p className='font-manrope font-normal text-background max-w-[460px] text-light-brown-c1'>Discover and book trusted Afro/Black hairstylists across Canada—anytime, anywhere.</p>
                            </div>


                            <div className='bg-background rounded-[60px]  p-[25px] xl:pl-[40px] xl:py-[14px] xl:pr-[14px]'>
                                <div className='flex flex-col xl:flex-row gap-6 items-center'>
                                    {/* Hairstyle Input Section */}
                                    <div className='w-full xl:w-1/2 flex flex-col gap-2'>
                                        <p className='font-manrope font-bold xl:text-lg text-base text-brown-A43'>What hairstyle are you looking for?</p>
                                        <div className='flex items-center gap-2 border-b border-black-14 pb-2'>
                                            <input
                                                className="focus:border-none focus:outline-none border-none w-full bg-transparent"
                                                type="text"
                                                placeholder='Box Braids, Cornrows....'
                                            />
                                            <FiSearch className='w-4 h-4 text-gray-500' />
                                        </div>
                                    </div>

                                    {/* Location Input Section */}
                                    <div className='w-full xl:w-1/2 flex flex-col gap-2'>
                                        <p className='font-manrope font-bold xltext-lg text-base text-brown-A43'>Where are you located?</p>
                                        <div className='flex items-center gap-2 border-b border-black-14 pb-2'>
                                            <input
                                                className="focus:border-none focus:outline-none border-none w-full bg-transparent"
                                                type="text"
                                                placeholder='Enter postal code'
                                            />
                                            <FiMapPin className='w-4 h-4 text-gray-500' />
                                        </div>
                                    </div>

                                    {/* Search Button Section */}
                                    <div className='w-full xl:w-1/2 h-full xl:w-auto '>
                                        <Button className=' w-full h-full px-8 py-[16px] bg-brown-A43 text-background hover:bg-brown-A43/90 transition-colors'>
                                            <span className='flex items-center gap-2'>
                                                Search
                                                <FiSearch className='w-4 h-4' />
                                            </span>
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='col-span-12 md:col-span-3'>

                        </div>
                    </div>
                </div>
            </div>

            {/* Gallery Section */}
            <div className='bg-gray-245'>
                <div className='container'>
                    <div className='py-20 mt-20 flex flex-col gap-10 '>

                        <div className='flex  flex-col justify-center items-center gap-2'>
                            <h2 className=' sm:text-[40px] text-[22px] lg:text-[45px] font-playfair text-black font-bold'>Your Hairstylist, Just a Click Away 👩🏾‍🦱</h2>
                            <p className='sm:text-xl text-[16px] font-normal font-manrope text-gray-55 '>Browse trusted Afro/Black hairstylists near you and book with confidence.</p>
                        </div>

                        <div className='grid grid-cols-12 gap-4'>
                            <div className='col-span-12 lg:col-span-4 flex '>
                                <div className='rounded-t-3xl lg:rounded-l-2xl w-full' >
                                    <img src={gallery1} alt="gallery" className='w-full h-full object-cover  rounded-t-3xl lg:rounded-l-3xl' />
                                </div>
                            </div>
                            <div className='col-span-12 lg:col-span-8  grid grid-cols-2 gap-4'>
                                <div>
                                    <img src={gallery2} alt="gallery" className='w-full h-full object-cover ' />
                                </div>
                                <div>
                                    <img src={gallery3} alt="gallery" className='w-full h-full object-cover lg:rounded-tr-3xl' />
                                </div>
                                <div className=''>
                                    <img src={gallery4} alt="gallery" className='w-full h-full object-cover rounded-bl-3xl lg:rounded-0 ' />
                                </div>
                                <div className='rounded-br-3xl'>
                                    <img src={gallery5} alt="gallery" className='w-full h-full object-cover rounded-br-3xl' />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Recommended Hairstylists Section */}
            <div>
                <div className='container'>
                    <div className='py-20 flex flex-col gap-10 '>

                        <div>                        <p className='font-manrope  text-base font-semibold text-brown-A43 mb-[2px]'>NEARBY Hairstylist</p>
                            <h2 className=' sm:text-[40px] text-[22px] lg:text-[45px] font-playfair text-brown-31 font-bold leading-none mb-4'>Recommended Hairstylist</h2>
                            <p className='font-manrope font-normal text-xl text-gray-55'>From braids to locs, find professionals who understand your hair and your style.</p></div>


                        <div className='grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3   xl:grid-cols-4 gap-4 items-stretch'>
                            {hairstylists.map((hairstylist) => (
                                <HairstylistCard
                                    key={hairstylist.id}
                                    image={hairstylist.image}
                                    name={hairstylist.name}
                                    location={hairstylist.location}
                                    rating={hairstylist.rating}
                                    reviewCount={hairstylist.reviewCount}
                                    onBookNow={() => handleBookNow(hairstylist.id)}
                                />
                            ))}
                        </div>
                    </div>
                </div>

            </div>


            {/* Testimonials Section */}
            <div className='bg-white-F0'>
                <div className='container'>
                    <div className='flex flex-col gap-10 '>
                        <div className='py-20 flex flex-col gap-10 '>
                            <div>
                                <p className='font-manrope text-base font-semibold text-brown-A43 mb-[2px]'>TESTIMONIALS</p>
                                <h2 className='sm:text-[40px] text-[22px] lg:text-[45px] font-playfair text-black-14 font-bold leading-none mb-4'>What Our Clients Say</h2>
                            </div>

                            <div className='bg-brown-31 rounded-3xl'>
                                <div className='py-24'>
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
        </div>
    )
}

export default Home