import React from 'react'
import confirm from '../../assets/confirm.png'
import { useParams, Link } from 'react-router-dom'
import { ButtonSquare } from '../../components/ui/buttonSquare'

const BookingConfirmPage = () => {
  const { id } = useParams()
  return (
    <div className='bg-background'>
      <div className='container'>
        <div className='py-20 flex flex-col gap-4 justify-center items-center  px-0 md:px-[100px]  lg:px-[200px]  xl:px[368px] '>
          <div className=' '>
            <img src={confirm} alt="confirm" className='object-fit' />
          </div>
          <div className="   md:text-[30px] text-[15px]  md:text-[35px]  text-center font-poppins font-extrabold text-brown-A43"> Booking ID </div>
          <div className="   md:text-[30px] text-[15px]  md:text-[35px]  text-center font-poppins font-extrabold text-black-14"> {id}</div>
          <div className='   md:text-[30px] text-[15px] font-poppins font-normal text-gray-55 text-center'>Thank you so much for choosing crownity. Your booking is successfully completed and and you are ready to go</div>
          <div className='w-full'>
            <Link to="/">
              <ButtonSquare className='w-full bg-brown-A43 text-background  p-[32px]  font-extrabold text-[14px] font-manrope' variant='secondary' >Home</ButtonSquare>
            </Link>
          </div>
        </div>

      </div>
    </div>
  )
}

export default BookingConfirmPage