import React from 'react'
import review from '../../assets/profileunderreview.png'
import { useParams, Link } from 'react-router-dom'
import { ButtonSquare } from '../../components/ui/buttonSquare'

const ProfileUnderReview = () => {

    return (
        <div className=' h-full'>
            <div className='container min-h-auto'>
                <div className=' flex flex-col gap-4 justify-center items-center  px-0 md:px-[100px]     '>
                    <div className='h-[250px] w-[250px] '>
                        <img src={review} alt="review" className='object-fit w-full' />
                    </div>
                    <div className="   md:text-[30px] text-[15px]  md:text-[35px]  xl:text-[50px] font-poppins font-extrabold text-black"> Profile Under Review</div>
                    <p className='   md:text-[30px] text-[15px] font-poppins font-normal text-gray-55 text-center'>Thank you choosing for Crownity. Your Profile is under Review. Once Admin will verify then you will be able to use .</p>
                    <div className='w-full'>
                        <Link to="/business/approved">
                            <ButtonSquare className='w-full bg-brown-A43 text-background  p-[32px]  font-extrabold text-[14px] font-manrope' variant='secondary' >Continue</ButtonSquare>
                        </Link>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default ProfileUnderReview       