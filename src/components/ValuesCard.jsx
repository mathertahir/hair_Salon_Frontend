import React from 'react'

const ValuesCard = ({ values }) => {
    return (

        <div className=''>
            <div className='flex  flex-col items-center md:items-start   md:flex-row  gap-4'>

                <div className='w-[100px] h-[100px]  brorder border-[1px] rounded-[5px] border-brown-31 bg-light-brown-c1-o5 flex items-center justify-center'>
                    <img src={values.image} alt="values" className='' />
                </div>

                <div className='flex flex-col gap-2 items-center md:items-start  md:max-w-[590px]'>
                    <p className='font-playfair text-[22px] font-bold text-black-14'>{values.title}</p>
                    <p className='font-manrope text-lg font-normal text-gray-55  text-center md:text-left'>{values.description}</p>
                </div>
            </div>
        </div>
    )
}

export default ValuesCard