import React from 'react'
import heroBg from '../../assets/HeroBG.png'
import { FiChevronDown, FiMapPin, FiSearch } from 'react-icons/fi'
import { Button } from '../ui/button'

const Hero = () => {
    return (
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
    )
}

export default Hero