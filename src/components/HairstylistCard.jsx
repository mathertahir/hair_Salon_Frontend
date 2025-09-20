import React from 'react'
import { FiMapPin, FiStar } from 'react-icons/fi'
import { ButtonSquare } from './ui/buttonSquare'
import { Link } from 'react-router-dom'

const HairstylistCard = ({
    image,
    name,
    location,
    rating,
    reviewCount,
    id,
    onBookNow
}) => {
    return (
        <div className='flex-1 flex flex-col'>
            <div className='lg:h-[275px] h-[200px] rounded-t-3xl'>
                <img src={image} alt="hairstylist" className='w-full h-full object-cover rounded-t-3xl' />
            </div>

            <div className='flex-1 flex flex-col'>
                <div className='p-6 border border-gray-55 rounded-b-3xl flex-1 flex flex-col'>
                    <div className='flex justify-between items-center'>
                        <div className='text-brown-A43 flex items-center gap-1'>
                            <FiStar className='w-4 h-4' />
                            <span className='text-base font-manrope font-normal text-brown-A43'>{rating}</span>
                        </div>
                        <p className='text-lg font-playfair font-bold text-gray-55'>{reviewCount} Reviews.</p>
                    </div>

                    <div className='flex flex-col gap-4 flex-1'>
                        <div className='flex-1 flex flex-col items-start gap-[10px]'>
                            <p className='text-lg font-playfair font-bold text-black-14'>{name}</p>
                            <div className='text-gray-55 flex gap-1 text-base items-center'>
                                <FiMapPin className='w-4 h-4' />
                                <span className='lg:text-base text-xs font-manrope font-normal text-gray-55 text-left'>
                                    {location}
                                </span>
                            </div>
                        </div>

                        <Link to={`/salon-detail/${id}`}>

                            <ButtonSquare
                                variant='outline'
                                className='w-full p-4 text-base font-playfair font-bold text-brown-A43 hover:bg-brown-A43 hover:text-background border-brown-A43 hover:border-none mt-auto'
                                onClick={onBookNow}
                            >
                                Book Now
                            </ButtonSquare>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HairstylistCard
