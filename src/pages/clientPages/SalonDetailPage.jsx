import React from 'react'
import detail1 from '../../assets/detail1.png'
import detail2 from '../../assets/detail2.png'
import detail3 from '../../assets/detail3.png'


const SalonDetailPage = () => {
    return (
        <div>
            {/* Hero Section */}
            <div className=''>
                <div className='container'>
                    <div className='py-[40px]'>

                        <div className='grid grid-cols-12 gap-[20px] '>
                            <div className='col-span-12 md:col-span-8 rounded-3xl'>
                                <img src={detail1} alt="detail1" className='w-full h-full object-cover rounded-3xl' />
                            </div>

                            <div className='col-span-12 md:col-span-4 grid grid-cols-1 gap-[20px]'>
                                <div className='rounded-3xl'>
                                    <img src={detail2} alt="detail2" className='w-full h-full object-cover rounded-3xl' />
                                </div>
                                <div className='rounded-3xl'>
                                    <img src={detail3} alt="detail3" className='w-full h-full object-cover rounded-3xl' />
                                </div>
                            </div>
                        </div>

                        <div className=''></div>
                    </div>



                </div>
            </div>
        </div>
    )
}

export default SalonDetailPage