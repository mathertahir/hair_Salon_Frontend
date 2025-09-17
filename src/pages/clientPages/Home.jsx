import React from 'react'

import { FiMapPin, FiSearch, FiStar } from 'react-icons/fi'
import { Button } from '../../components/ui/button'
import heroBg from '../../assets/HeroBG.png'
import gallery1 from '../../assets/HG1.png'
import gallery2 from '../../assets/HG2.png'
import gallery3 from '../../assets/HG3.png'
import gallery4 from '../../assets/HG4.png'
import gallery5 from '../../assets/HG5.png'
import { ButtonSquare } from '../../components/ui/buttonSquare'
import HairstylistCard from '../../components/HairstylistCard'

const Home = () => {
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
        </div>
    )
}

export default Home