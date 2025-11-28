import React from 'react'
import { useState } from 'react';
import gallery1 from '../../assets/HG1.webp'
import gallery2 from '../../assets/HG2.webp'
import gallery3 from '../../assets/HG3.webp'
import gallery4 from '../../assets/HG4.webp'

import ClientBookingCards from '../../components/ClientBookingCards'

const ClientBookingPage = () => {
    const [activeTab, setActiveTab] = useState(1);

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };




    const bookings = [
        {
            id: 1,
            image: gallery1,
            name: "Crown by Amara",
            location: "Brookpark Ext, 27085, North Olmsted, 44070",
            rating: "4.5",
            bookingId: "323323",
            status: "Pending"
        },
        {
            id: 2,
            image: gallery2,
            name: "The Loc Lounge",
            location: "2267 Main st, Fort Myers, 33901",
            rating: "4.5",
            bookingId: "323323",
            status: "Completed"
        },

        {
            id: 3,
            image: gallery3,
            name: "Royal Strands Studio",
            location: "2267 Main st, Fort Myers, 33901,",
            rating: "4.5",
            bookingId: "323323",
            status: "Completed"
        },

        {
            id: 4,
            image: gallery4,
            name: "Royal Strands Studio",
            location: "2267 Main st, Fort Myers, 33901,",
            rating: "4.5",
            bookingId: "323323",
            status: "Pending"
        }
    ]

    // Sample data for demonstration



    return (
        <div className='bg-background'>
            <div className='container'>
                <div className='pt-[100px] pb-[200px]'>
                    {/* Tab Navigation */}
                    <div className='flex justify-between bg-brown-A43-o2 rounded-[50px] mb-8'>
                        <button
                            onClick={() => handleTabClick(1)}
                            className={`${activeTab === 1 ? 'text-background' : 'text-black'} font-bold md:text-[18px] text-[12px] font-manrope ${activeTab === 1 ? 'bg-brown-A43' : 'bg-transparent'} rounded-[50px] flex justify-center items-center w-1/2 py-[18px] px-[20px] transition-all duration-300 cursor-pointer`}
                        >
                            Active Booking
                        </button>
                        <button
                            onClick={() => handleTabClick(2)}
                            className={`${activeTab === 2 ? 'text-background' : 'text-brown-black'} font-bold md:text-[18px] text-[12px] font-manrope ${activeTab === 2 ? 'bg-brown-A43' : 'bg-transparent'} rounded-[50px] flex justify-center items-center w-1/2 py-[18px] px-[20px] transition-all duration-300 cursor-pointer`}
                        >
                            Completed Booking
                        </button>
                    </div>

                    {/* Tab Content */}
                    <div className="tab-content">
                        {activeTab === 1 && (
                            <ClientBookingCards
                                bookings={bookings.filter(booking => booking.status === 'Pending')}
                            />
                        )}

                        {activeTab === 2 && (
                            <ClientBookingCards
                                bookings={bookings.filter(booking => booking.status === 'Completed')}

                            />
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ClientBookingPage