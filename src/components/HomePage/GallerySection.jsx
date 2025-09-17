import React from 'react'
import gallery1 from '../../assets/HG1.png'
import gallery2 from '../../assets/HG2.png'
import gallery3 from '../../assets/HG3.png'
import gallery4 from '../../assets/HG4.png'
import gallery5 from '../../assets/HG5.png'



const GallerySection = () => {
    return (
        <div className='bg-gray-245'>
            <div className='container'>
                <div className='py-20 my-20 flex flex-col gap-10 '>

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
    )
}

export default GallerySection