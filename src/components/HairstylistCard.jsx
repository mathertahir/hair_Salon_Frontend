import React from 'react'
import { FiMapPin } from 'react-icons/fi'
import { ButtonSquare } from './ui/buttonSquare'
import { Link } from 'react-router-dom'
import { FaStar } from "react-icons/fa6";

const HairstylistCard = ({
    image,
    name,
    businessName,
    location,
    rating,
    reviewCount,
    id,
    onBookNow,
    price,

}) => {


    console.log(rating, reviewCount)
    return (
        <div className='flex-1 flex flex-col'>
            <div className='lg:h-[275px] h-[200px] rounded-t-3xl'>
                <img src={image} alt="hairstylist" className='w-full h-full object-cover rounded-t-3xl' />
            </div>

            <div className='flex-1 flex flex-col'>
                <div className='p-6 border border-gray-55 rounded-b-3xl flex-1 flex flex-col gap-2'>
                    <div className='flex justify-between items-center'>
                        <p className='text-lg font-manrope font-bold text-black-14'>Service Price</p>
                        <p className='text-lg font-manrope font-bold text-black-14'>{price}$</p>
                    </div>
                    <div className='flex justify-between items-center'>
                        <div className='text-brown-A43 flex items-center gap-1'>

                            <div><FaStar size={20} fill='#FFBF00' /></div>
                            {rating === 0 ? (
                                <span className="text-gray-400 font-manrope text-base">No rating</span>
                            ) : (
                                <span className="text-base font-manrope font-normal text-brown-A43">{rating}</span>
                            )}


                        </div>
                        {rating === 0 ? (
                            <span className="text-gray-400 font-manrope text-base">No Reviews</span>
                        ) : (
                            <span className="text-base font-manrope font-normal text-brown-A43"> Tolal {reviewCount}</span>
                        )}
                    </div>

                    <div className='flex flex-col gap-4 flex-1'>
                        <div className='flex-1 flex flex-col items-start gap-[10px]'>
                            <div className='flex flex-col gap-1'>
                                <p className='text-lg font-playfair font-bold text-black-14'>{name}</p>
                                <p className='text-sm font-playfair font-bold text-brown-A43'>{businessName}</p>
                            </div>

                            <div className='text-gray-55 flex gap-1 text-base items-center'>
                                <FiMapPin className='w-4 h-4' />
                                <span className='lg:text-base text-xs font-manrope font-normal text-gray-55 text-left'>
                                    {location}
                                </span>
                            </div>
                        </div>

                        {/* <Link to={`/salon-detail/${id}`}> */}
                        <Link to={`/serviceDetail/${id}`} onClick={onBookNow}>

                            <ButtonSquare
                                variant='outline'
                                className='w-full p-4 text-base font-playfair font-bold text-brown-A43 hover:bg-brown-A43 hover:text-background border-brown-A43 hover:border-none mt-auto'
                                onClick={onBookNow}
                            >
                                View Detail
                            </ButtonSquare>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HairstylistCard
