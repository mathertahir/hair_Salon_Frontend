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
import subscribeBg from '../../assets/Subscribe.png'
import HairstylistCard from '../../components/HairstylistCard'
import TestimonialSwiper from '../../components/TestimonialSwiper'

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
    const testimonialTitle = "TESTIMONIALS"
    const testimonialDescription = "What Our Clients Say"

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
                                <div className='flex flex-col xl:flex-row gap-6 items-stretch'>
                                    {/* Hairstyle Input Section */}
                                    <div className='w-full xl:flex-1 flex flex-col justify-between'>
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
                                    <div className='w-full xl:flex-1 flex flex-col justify-between'>
                                        <p className='font-manrope font-bold xl:text-lg text-base text-brown-A43'>Where are you located?</p>
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
                                    <div className='w-full xl:w-auto flex items-center'>
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
                                    <img src={gallery4} alt="gallery" className='w-full h-full object-cover rounded-bl-3xl lg:rounded-bl-none' />
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
                                    id={hairstylist.id}
                                    onBookNow={() => handleBookNow(hairstylist.id)}
                                />
                            ))}
                        </div>
                    </div>
                </div>

            </div>


            {/* Testimonials Section */}

            <TestimonialSwiper testimonials={testimonials} title={testimonialTitle} description={testimonialDescription} />


            {/* Subcribe Section */}


            <div className=''>
                <div className='container'>

                    <div className='py-20'>
                        <div className='grid   grid-cols-1 lg:grid-cols-2 gap-8 md:gap-14  px-[20px]  md:px-[60px]  2xl:px-[120px]'>

                            <div className=' h-full w-full rounded-3xl'>
                                <img src={subscribeBg} alt="subscribe" className='h-full w-full object-cover rounded-3xl' />
                            </div>


                            <div className='flex flex-col  justify-center  gap-8  '>

                                <div className='flex flex-col gap-3 items-start  text-left '>
                                    <h2 className=' sm:text-[40px] text-[22px] lg:text-[45px] font-playfair text-black-14 font-bold leading-none  '>Subscribe to newsletter</h2>
                                    <p className='text-base sm:text-lg font-normal font-manrope text-gray-55  lg:text-left leading-relaxed text-left'>"Sign up for our newsletter to stay up-to-date on the latest promotions, discounts, and new features releases."</p>
                                </div>

                                <div className='py-2  px-2  sm:px-4 border border-brown-31 rounded-[45px] flex items-center gap-2'>
                                    <input type="email" placeholder='Enter your email' className='w-full h-full bg-transparent border-none outline-none ' />
                                    <Button className=' px-4 md:px-8 w-auto bg-black text-background hover:bg-brown-31/90 transition-all duration-300 active:scale-95'>Subscribe</Button>
                                </div>
                            </div>





                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home